class AppError extends Error {
  constructor(message, statusCode, details = null, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational; // Distinguish operational errors from programming errors
    this.details = details; // Additional error details
    this.timestamp = new Date().toISOString();

    // Capture stack trace (excluding constructor call from the stack trace)
    Error.captureStackTrace(this, this.constructor);
  }

  // Static method to create validation errors from Mongoose validation errors
  static fromValidationError(err) {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(message, 400, { fields: err.errors });
  }

  // Static method to create duplicate field errors
  static fromDuplicateFieldError(err) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists. Please use a different value.`;
    return new AppError(message, 409, { field });
  }

  // Static method to create JWT errors
  static fromJWTError(err) {
    return new AppError('Invalid token. Please log in again!', 401);
  }

  // Static method to create token expired errors
  static fromTokenExpiredError(err) {
    return new AppError('Your token has expired! Please log in again.', 401);
  }
}

module.exports = AppError;