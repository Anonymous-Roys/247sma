const Buyer = require('../models/Buyer');
const { createSendToken } = require('../config/jwt');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// Utility function to filter object properties
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;
  
  // Validate required fields
  if (!email || !password || !passwordConfirm) {
    return next(new AppError('Please provide email, password, and password confirmation', 400));
  }

  // Check if passwords match
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // Check if email is already registered
  const existingBuyer = await Buyer.findOne({ email });
  
  if (existingBuyer && existingBuyer.isVerified) {
    return next(new AppError('This email is already registered. Please use a different email or login.', 409));
  }

  if (existingBuyer && !existingBuyer.isVerified) {
    // Resend verification email if not verified
    const verificationToken = existingBuyer.createVerificationToken();
    await existingBuyer.save({ validateBeforeSave: false });
    
    try {
      await sendVerificationEmail(existingBuyer, verificationToken);
      return res.status(200).json({
        status: 'success',
        message: 'Verification email resent. Please check your email to complete registration.'
      });
    } catch (err) {
      existingBuyer.verificationToken = undefined;
      existingBuyer.verificationTokenExpires = undefined;
      await existingBuyer.save({ validateBeforeSave: false });
      return next(new AppError('There was an error sending the verification email. Please try again later.', 500));
    }
  }
  
  // Create new buyer
  try {
    const newBuyer = await Buyer.create({
      email,
      password,
      passwordConfirm
    });
    
    // Generate verification token and send email
    const verificationToken = newBuyer.createVerificationToken();
    await newBuyer.save({ validateBeforeSave: false });
    
    try {
      await sendVerificationEmail(newBuyer, verificationToken);
      return res.status(201).json({
        status: 'success',
        message: 'Registration successful! Please check your email for verification instructions.'
      });
    } catch (err) {
      newBuyer.verificationToken = undefined;
      newBuyer.verificationTokenExpires = undefined;
      await newBuyer.save({ validateBeforeSave: false });
      return next(new AppError('Account created but verification email failed to send. Please contact support.', 500));
    }
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Invalid input data: ${messages.join('. ')}`, 400));
    }
    return next(new AppError('An unexpected error occurred during registration. Please try again.', 500));
  }
});

// Verify Email
exports.verifyEmail = catchAsync(async (req, res, next) => {
  // Validate token presence
  if (!req.params.token) {
    return next(new AppError('Verification token is missing', 400));
  }

  // Hash the token from the URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
  // Lookup buyer using hashed token and check expiration
  const buyer = await Buyer.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() }
  });

  if (!buyer) {
    return next(new AppError('The verification link is invalid or has expired. Please request a new verification email.', 400));
  }

  // Verify and clean up
  buyer.isVerified = true;
  buyer.verificationToken = undefined;
  buyer.verificationTokenExpires = undefined;

  try {
    await buyer.save({ validateBeforeSave: false });
    createSendToken(buyer, 200, res, 'Email verified successfully!');
  } catch (err) {
    return next(new AppError('An error occurred during email verification. Please try again.', 500));
  }
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return next(new AppError('Please provide both email and password', 400));
  }
  
  // Check if buyer exists and password is correct
  const buyer = await Buyer.findOne({ email }).select('+password');
  
  if (!buyer) {
    return next(new AppError('No account found with this email address. Please sign up first.', 401));
  }
  
  if (!(await buyer.correctPassword(password, buyer.password))) {
    return next(new AppError('Incorrect password. Please try again or reset your password if forgotten.', 401));
  }
  
  // Check if email is verified
  if (!buyer.isVerified) {
    return next(new AppError('Your account is not yet verified. Please check your email for verification instructions.', 403));
  }
  
  // If everything ok, send token to client
  createSendToken(buyer, 200, res, 'Login successful!');
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Validate email
  if (!req.body.email) {
    return next(new AppError('Please provide your email address', 400));
  }

  // Get buyer based on email
  const buyer = await Buyer.findOne({ email: req.body.email });
  
  if (!buyer) {
    return next(new AppError('No account found with this email address.', 404));
  }
  
  // Generate the random reset token
  const resetToken = buyer.createPasswordResetToken();
  await buyer.save({ validateBeforeSave: false });
  
  // Send it to buyer's email
  try {
    await sendPasswordResetEmail(buyer, resetToken);
    
    res.status(200).json({
      status: 'success',
      message: 'Password reset instructions have been sent to your email.'
    });
  } catch (err) {
    buyer.passwordResetToken = undefined;
    buyer.passwordResetExpires = undefined;
    await buyer.save({ validateBeforeSave: false });
    
    return next(new AppError('There was an error sending the password reset email. Please try again later.', 500));
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Validate token presence
  if (!req.params.token) {
    return next(new AppError('Password reset token is missing', 400));
  }

  // Validate password fields
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError('Please provide both password and password confirmation', 400));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // Get buyer based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
  const buyer = await Buyer.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  
  // Check token validity
  if (!buyer) {
    return next(new AppError('The password reset link is invalid or has expired. Please request a new password reset.', 400));
  }
  
  // Update password
  buyer.password = req.body.password;
  buyer.passwordConfirm = req.body.passwordConfirm;
  buyer.passwordResetToken = undefined;
  buyer.passwordResetExpires = undefined;
  
  try {
    await buyer.save();
    createSendToken(buyer, 200, res, 'Password updated successfully!');
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Password validation failed: ${messages.join('. ')}`, 400));
    }
    return next(new AppError('An error occurred while updating your password. Please try again.', 500));
  }
});

// Protect middleware (to be used in routes)
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to access this resource.', 401));
  }
  
  // 2) Verification token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Your session has expired. Please log in again.', 401));
    }
    return next(new AppError('Authentication failed. Please try again.', 401));
  }
  
  // 3) Check if buyer still exists
  const currentBuyer = await Buyer.findById(decoded.id);
  if (!currentBuyer) {
    return next(new AppError('The account associated with this token no longer exists.', 401));
  }
  
  // 4) Check if buyer changed password after the token was issued
  if (currentBuyer.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Password was recently changed. Please log in again.', 401));
  }
  
  // GRANT ACCESS TO PROTECTED ROUTE
  req.buyer = currentBuyer;
  res.locals.buyer = currentBuyer;
  next();
});

// Profile controllers
exports.getProfile = catchAsync(async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.user.id)
      .select('-password -__v -verificationToken -passwordResetToken');
    
    if (!buyer) {
      return next(new AppError('Profile not found. The account may have been deleted.', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        buyer
      }
    });
  } catch (err) {
    return next(new AppError('An error occurred while fetching your profile.', 500));
  }
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email', 'phone');
  
  if (Object.keys(filteredBody).length === 0) {
    return next(new AppError('No valid fields provided for update', 400));
  }

  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    ).select('-password -__v');

    if (!updatedBuyer) {
      return next(new AppError('Profile not found. The account may have been deleted.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        buyer: updatedBuyer
      }
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Profile update failed: ${messages.join('. ')}`, 400));
    }
    if (err.code === 11000) {
      return next(new AppError('Email already in use. Please use a different email.', 400));
    }
    return next(new AppError('An error occurred while updating your profile.', 500));
  }
});

exports.uploadProfileImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a valid image file (JPEG, PNG)', 400));
  }

  // Validate file type
  if (!req.file.mimetype.startsWith('image')) {
    return next(new AppError('Please upload an image file only (JPEG, PNG)', 400));
  }

  // Validate file size (example: max 2MB)
  if (req.file.size > 2000000) {
    return next(new AppError('Image size too large. Maximum allowed is 2MB.', 400));
  }

  try {
    // Process image (resize, optimize, etc.)
    // Save to cloud storage or server
    const imageUrl = `/uploads/profiles/${req.file.filename}`;

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.user.id, 
      { profileImage: imageUrl },
      { new: true }
    ).select('-password -__v');

    if (!updatedBuyer) {
      return next(new AppError('Profile not found. The account may have been deleted.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        imageUrl
      }
    });
  } catch (err) {
    return next(new AppError('An error occurred while updating your profile image.', 500));
  }
});

// Wishlist controllers
exports.getWishlist = catchAsync(async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.user.id)
      .populate({
        path: 'wishlist',
        select: 'name price images'
      })
      .select('wishlist');

    if (!buyer) {
      return next(new AppError('Profile not found. The account may have been deleted.', 404));
    }

    res.status(200).json({
      status: 'success',
      results: buyer.wishlist.length,
      data: {
        wishlist: buyer.wishlist
      }
    });
  } catch (err) {
    return next(new AppError('An error occurred while fetching your wishlist.', 500));
  }
});