const Buyer = require('../models/Buyer');
const { createSendToken } = require('../config/jwt');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');


// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;
  
  // 1) Check if email is already registered but not verified
  const existingBuyer = await Buyer.findOne({ email });
  
  if (existingBuyer && existingBuyer.isVerified) {
    return next(new AppError('Email already in use', 400));
  }
  if (existingBuyer && !existingBuyer.isVerified) {
    // Resend verification email if not verified
    const verificationToken = existingBuyer.createVerificationToken();
    await existingBuyer.save({ validateBeforeSave: false });
    
    await sendVerificationEmail(existingBuyer, verificationToken);
    
    return res.status(200).json({
      status: 'success',
      message: 'Verification email resent. Please check your email.'
    });
  }
  
  
  
  // 2) Create new buyer
  const newBuyer = await Buyer.create({
    email,
    password,
    passwordConfirm
  });
  
  // 3) Generate verification token and send email
  const verificationToken = newBuyer.createVerificationToken();
  await newBuyer.save({ validateBeforeSave: false });
  
  await sendVerificationEmail(newBuyer, verificationToken);
  
  res.status(201).json({
    status: 'success',
    message: 'Verification email sent. Please check your email.'
  });
});

// Verify Email
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const crypto = require('crypto');

  // 1) Hash the token from the URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
  // 2) Lookup buyer using hashed token and check expiration
  const buyer = await Buyer.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() }
  });

  if (!buyer) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 3) Verify and clean up
  buyer.isVerified = true;
  buyer.verificationToken = undefined;
  buyer.verificationTokenExpires = undefined;

  await buyer.save({ validateBeforeSave: false });

  // 4) Login and respond
  createSendToken(buyer, 200, res); // Add message if needed
});


// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  
  // 2) Check if buyer exists and password is correct
  const buyer = await Buyer.findOne({ email }).select('+password');
  
  if (!buyer || !(await buyer.correctPassword(password, buyer.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  
  // 3) Check if email is verified
  if (!buyer.isVerified) {
    return next(new AppError('Please verify your email first', 401));
  }
  
  // 4) If everything ok, send token to client
  createSendToken(buyer, 200, res);
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get buyer based on POSTed email
  const buyer = await Buyer.findOne({ email: req.body.email });
  
  if (!buyer) {
    return next(new AppError('There is no buyer with that email address', 404));
  }
  
  // 2) Generate the random reset token
  const resetToken = buyer.createPasswordResetToken();
  await buyer.save({ validateBeforeSave: false });
  
  // 3) Send it to buyer's email
  try {
    await sendPasswordResetEmail(buyer, resetToken);
    
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    buyer.passwordResetToken = undefined;
    buyer.passwordResetExpires = undefined;
    await buyer.save({ validateBeforeSave: false });
    
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get buyer based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
  const buyer = await Buyer.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  
  // 2) If token has not expired, and there is buyer, set the new password
  if (!buyer) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  
  buyer.password = req.body.password;
  buyer.passwordConfirm = req.body.passwordConfirm;
  buyer.passwordResetToken = undefined;
  buyer.passwordResetExpires = undefined;
  await buyer.save();
  
  // 3) Update changedPasswordAt property for the buyer
  // 4) Log the buyer in, send JWT
  createSendToken(buyer, 200, res);
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
  }
  
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }
  
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  // 3) Check if buyer still exists
  const currentBuyer = await Buyer.findById(decoded.id);
  if (!currentBuyer) {
    return next(new AppError('The buyer belonging to this token does no longer exist.', 401));
  }
  
  // 4) Check if buyer changed password after the token was issued
  if (currentBuyer.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Buyer recently changed password! Please log in again.', 401));
  }
  
  // GRANT ACCESS TO PROTECTED ROUTE
  req.buyer = currentBuyer;
  next();
});

// Profile controllers
exports.getProfile = catchAsync(async (req, res, next) => {
  const buyer = await Buyer.findById(req.user.id)
    .select('-password -__v -verificationToken -passwordResetToken');
  
  res.status(200).json({
    status: 'success',
    data: {
      buyer
    }
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email', 'phone');
  
  const updatedBuyer = await Buyer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    { new: true, runValidators: true }
  ).select('-password -__v');

  res.status(200).json({
    status: 'success',
    data: {
      buyer: updatedBuyer
    }
  });
});

exports.uploadProfileImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  // Process image (resize, optimize, etc.)
  // Save to cloud storage or server
  const imageUrl = `/uploads/profiles/${req.file.filename}`;

  await Buyer.findByIdAndUpdate(req.user.id, { profileImage: imageUrl });

  res.status(200).json({
    status: 'success',
    data: {
      imageUrl
    }
  });
});

// Wishlist controllers
exports.getWishlist = catchAsync(async (req, res, next) => {
  const buyer = await Buyer.findById(req.user.id)
    .populate('wishlist')
    .select('wishlist');

  res.status(200).json({
    status: 'success',
    results: buyer.wishlist.length,
    data: {
      wishlist: buyer.wishlist
    }
  });
});

// ... other controller methods