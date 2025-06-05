const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const redisService = require("../utils/redis");
const logger = require("../utils/logger");
const User = require("../models/user/user.model");

const AUTH_CONFIG = {
  COOKIE_NAMES: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
  },
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
    AUTH_MAX: 5, // 5 auth attempts per window
    SENSITIVE_MAX: 10, // 10 sensitive operations per window
  },
  CACHE_TTL: {
    USER_DATA: 5 * 60, // 5 minutes
    SESSION_DATA: 10 * 60, // 10 minutes
    REFRESH_MUTEX: 30, // 30 seconds
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 100,
  },
};

const getCachedUserData = async (userId) => {
  try {
    const cacheKey = `user:${userId}`;
    const cachedData = await redisService.get(cacheKey);

    if (cachedData) {
      logger.debug("User data retrieved from cache", { userId });
      return cachedData;
    }
  } catch (error) {
    logger.debug("Cache lookup failed, falling back to database", {
      userId,
      error: error.message,
    });
  }

  return null;
};

const createRefreshKey = (refreshToken) => {
  return `refresh_mutex:${crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex")
    .substring(0, 16)}`;
};

const clearAuthCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  res.clearCookie(AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN, cookieOptions);
  res.clearCookie(AUTH_CONFIG.COOKIE_NAMES.REFRESH_TOKEN, cookieOptions);

  // Additional security headers
  res.setHeader("Clear-Site-Data", '"cookies", "storage"');
};

const cacheUserData = async (userId, userData) => {
  try {
    const cacheKey = `user:${userId}`;
    await redisService.setex(
      cacheKey,
      AUTH_CONFIG.CACHE_TTL.USER_DATA,
      userData
    );
  } catch (error) {
    logger.debug("Failed to cache user data", { userId, error: error.message });
  }
};

const withRetry = async (fn, maxAttempts = AUTH_CONFIG.RETRY.MAX_ATTEMPTS) => {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        throw error;
      }

      const delay = AUTH_CONFIG.RETRY.DELAY_MS * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));

      logger.debug("Retrying operation", {
        attempt,
        maxAttempts,
        delay,
        error: error.message,
      });
    }
  }

  throw lastError;
};

// FIXED: Added validateRefreshToken function
const validateRefreshToken = (decoded, user) => {
  if (user.tokenVersion !== decoded.tokenVersion) {
    throw new AppError("Token version mismatch", 401);
  }

  if (!user.accountStatus.isActive) {
    throw new AppError("Account is deactivated", 403);
  }

  if (
    user.accountStatus.isLocked &&
    user.accountStatus.lockedUntil &&
    Date.now() < user.accountStatus.lockedUntil
  ) {
    const timeLeft = Math.ceil(
      (user.accountStatus.lockedUntil - Date.now()) / (1000 * 60)
    );
    throw new AppError(
      `Account locked. Try again in ${timeLeft} minutes.`,
      423
    );
  }
};

const handleTokenRefresh = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies[AUTH_CONFIG.COOKIE_NAMES.REFRESH_TOKEN];

  if (!refreshToken) {
    return next(new AppError("Session expired. Please log in again.", 401));
  }

  // Create session key for stored refresh token (same as in auth controller)
  const sessionKey = createRefreshKey(refreshToken);

  // FIXED: Simplified approach - remove mutex complexity that causes infinite loops
  try {
    // Verify refresh token first
    let refreshDecoded;
    try {
      refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      clearAuthCookies(res);

      if (error.name === "TokenExpiredError") {
        return next(new AppError("Session expired. Please log in again.", 401));
      }
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "NotBeforeError"
      ) {
        return next(new AppError("Invalid session. Please log in again.", 401));
      }

      return next(
        new AppError("Authentication failed. Please try again.", 401)
      );
    }

    // Check if refresh token type is correct
    if (refreshDecoded.type !== "refresh") {
      clearAuthCookies(res);
      return next(
        new AppError("Invalid token type. Please log in again.", 401)
      );
    }

    // Check if refresh token is blacklisted
    try {
      const isBlacklisted = await redisService.isTokenBlacklisted(refreshToken);
      if (isBlacklisted) {
        clearAuthCookies(res);
        return next(
          new AppError(
            "Session has been invalidated. Please log in again.",
            401
          )
        );
      }
    } catch (error) {
      logger.debug("Token blacklist check failed", { error: error.message });
      // Continue without blacklist check if Redis is down
    }

    // FIXED: Check if refresh token exists in Redis storage using correct key
    try {
      const storedSession = await redisService.get(sessionKey);
      if (!storedSession) {
        clearAuthCookies(res);
        return next(
          new AppError("Session not found. Please log in again.", 401)
        );
      }

      const sessionData = JSON.parse(storedSession);
      if (sessionData.refreshToken !== refreshToken) {
        clearAuthCookies(res);
        return next(
          new AppError("Session mismatch. Please log in again.", 401)
        );
      }
    } catch (error) {
      logger.debug("Session validation failed", { error: error.message });
      // Continue if Redis check fails - fallback to user validation only
    }

    // Find user with retry logic
    const user = await withRetry(async () => {
      return await User.findById(refreshDecoded.id).select("+tokenVersion");
    });

    if (!user) {
      clearAuthCookies(res);
      return next(new AppError("User not found. Please log in again.", 401));
    }

    // Validate refresh token using defined function
    try {
      validateRefreshToken(refreshDecoded, user);
    } catch (error) {
      clearAuthCookies(res);

      // Better error handling for different validation failures
      if (error.message.includes("version")) {
        return next(
          new AppError(
            "Session expired due to security update. Please log in again.",
            401
          )
        );
      }
      if (error.message.includes("deactivated")) {
        return next(new AppError("Account has been deactivated.", 403));
      }
      if (error.message.includes("locked")) {
        return next(error); // Pass through the lock message with time remaining
      }

      return next(error);
    }

    // Generate new access token
    const newAccessToken = user.generateAccessToken();

    // Set new access token cookie with proper options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: "/",
    };

    // Add domain if specified in environment
    if (process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.cookie(
      AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN,
      newAccessToken,
      cookieOptions
    );

    // Add response header to indicate token was refreshed
    res.setHeader("X-Token-Refreshed", "true");

    // Set complete user context for the request
    req.user = user;
    req.tokenType = "cookie";
    req.tokenRefreshed = true;

    // Cache updated user data
    setImmediate(() => {
      cacheUserData(user._id, {
        isActive: user.accountStatus.isActive,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        tokenVersion: user.tokenVersion,
        role: user.role,
      });
    });

    logger.info("Token successfully refreshed", {
      userId: user._id,
      tokenVersion: user.tokenVersion,
    });

    // Continue to the next middleware
    next();
  } catch (error) {
    // Better error handling for unexpected errors
    clearAuthCookies(res);
    logger.error("Token refresh failed", {
      error: error.message,
      stack: error.stack,
    });
    return next(
      new AppError("Authentication failed. Please log in again.", 401)
    );
  }
});

const protect = asyncHandler(async (req, res, next) => {
  const { hasAccessToken, hasRefreshToken } = validateTokenPresence(req);

  // FIXED: Only try refresh if we have refresh token but no access token
  if (!hasAccessToken && hasRefreshToken) {
    return await handleTokenRefresh(req, res, next);
  }

  let token, tokenType;

  // Check if token exists in authorization header or cookies
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    tokenType = "bearer";
  } else if (req.cookies[AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN]) {
    token = req.cookies[AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN];
    tokenType = "cookie";
  }

  console.log(token);

  // FIXED: If no access token at all, require login
  if (!token) {
    throw new AppError("Authentication required. Please log in.", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    console.log(error);
    // FIXED: Only try refresh if we have a refresh token AND the error is token expiration
    if (
      error.name === "TokenExpiredError" &&
      tokenType === "cookie" &&
      hasRefreshToken
    ) {
      return await handleTokenRefresh(req, res, next);
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please log in.", 401));
    }
    return next(new AppError("Authentication failed.", 401));
  }

  if (decoded.type !== "access") {
    return next(new AppError("Invalid token. Please log in.", 401));
  }

  try {
    const isBlacklisted = await redisService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new AppError("Token has been invalidated", 401);
    }
  } catch (error) {
    logger.debug("Token blacklist check failed", { error: error.message });
    // Continue without blacklist check if Redis is down
  }

  let user;
  const cachedUserData = await getCachedUserData(decoded.id);

  if (cachedUserData && cachedUserData.tokenVersion === decoded.tokenVersion) {
    // Use cached data and fetch minimal user info from database
    user = await User.findById(decoded.id);
    if (user) {
      // Merge cached data with fresh user data
      Object.assign(user, cachedUserData);
    }
  } else {
    // Fetch fresh data from database
    user = await withRetry(async () => {
      return await User.findById(decoded.id).select("+tokenVersion");
    });
  }

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check token version and global invalidation
  if (user.tokenVersion !== decoded.tokenVersion) {
    return next(new AppError("Token has been invalidated", 401));
  }

  if (!user.accountStatus.isActive) {
    throw new AppError("Account is deactivated", 403);
  }

  if (
    user.accountStatus.isLocked &&
    user.accountStatus.lockedUntil > Date.now()
  ) {
    const timeLeft = Math.ceil(
      (user.accountStatus.lockedUntil - Date.now()) / (1000 * 60)
    );
    throw new AppError(
      `Account locked. Try again in ${timeLeft} minutes.`,
      423
    );
  }

  // Cache data for future requests
  setImmediate(() => {
    cacheUserData(decoded.id, {
      isActive: user.accountStatus.isActive,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      tokenVersion: user.tokenVersion,
      role: user.role,
    });
  });

  req.user = user;
  req.tokenType = tokenType;

  logger.debug("Authentication successful", {
    userId: decoded.id,
    tokenType,
  });
  next();
});
const validateTokenPresence = (req) => {
  const hasAccessToken =
    req.headers.authorization?.startsWith("Bearer") ||
    req.cookies[AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN];

  const hasRefreshToken = req.cookies[AUTH_CONFIG.COOKIE_NAMES.REFRESH_TOKEN];

  return {
    hasAccessToken,
    hasRefreshToken,
  };
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      logger.warn("Authorization failed - insufficient role", {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles,
      });

      return next(
        new AppError(`Access denied. Required role: ${roles.join(" or ")}`, 403)
      );
    }

    next();
  };
};

/**
 * Require verified email
 */
const requireVerifiedEmail = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  if (!req.user.emailVerified) {
    return next(new AppError("Email verification required", 403));
  }

  next();
};

/**
 * Require verified phone
 */
const requireVerifiedPhone = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  if (!req.user.phoneVerified) {
    return next(new AppError("Phone verification required", 403));
  }

  next();
};

/**
 * Require fully verified account (email AND phone)
 */
const requireVerifiedAccount = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  if (!req.user.emailVerified || !req.user.phoneVerified) {
    return next(new AppError("Complete account verification required", 403));
  }

  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = {
  protect,
  requireRole,
  requireVerifiedEmail,
  requireVerifiedPhone,
  requireVerifiedAccount,
  createRefreshKey,
  clearAuthCookies,
  restrictTo,
};