class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;  // Mark as operational error (trusted)
    this.details = details;     // Additional error context (e.g., validation errors)
    
    // Capture stack trace (excluding constructor call)
    Error.captureStackTrace(this, this.constructor);
  }

  // Static constructor for Mongoose validation errors
  static fromValidationError(err) {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Validation failed: ${errors.join('. ')}`;
    return new AppError(message, 400, { fields: err.errors });
  }

  // Static constructor for duplicate key errors
  static fromDuplicateKeyError(err) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists. Please use another value.`;
    return new AppError(message, 409, { field });
  }
}

// Wraps async functions to catch errors and pass to Express
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Handles development vs. production error responses
const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err.message, err.stack);

  // Defaults for unhandled errors
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Development: Send full error details
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } 
  // Production: Send minimal sensitive info
  else {
    // Operational errors (trusted)
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(err.details && { details: err.details }),
      });
    } 
    // Programming errors (hide details)
    else {
      console.error('UNEXPECTED ERROR:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  }
};

// Global error handler (simplified alternative)
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Set default values if not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send JSON response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};



module.exports = {
  AppError,
  catchAsync,
  errorHandler,      // Detailed handler (dev + prod)
  globalErrorHandler // Simplified alternative
};