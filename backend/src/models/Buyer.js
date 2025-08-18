const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const buyerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: String, // Made optional to match interface
  role: {
    type: String,
    enum: ["customer", "farmer", "investor", "transit"],
    default: "customer"
  },
  kycStatus: {
    type: String,
    enum: ["not_started", "pending", "approved", "rejected"],
    default: "not_started"
  },
  phone: String,
  points: {
    type: Number,
    default: 0
  },
  profileImage: {
    data: Buffer,
    contentType: String
  },
  avatar: String, // Added to match interface
  address: String, // Added to match interface
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  timestamps: true
});

// Keep all your existing middleware and methods
buyerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

buyerSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

buyerSchema.methods.createVerificationToken = function() {
  const verificationToken = require('crypto').randomBytes(32).toString('hex');
  this.verificationToken = require('crypto')
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  return verificationToken;
};

buyerSchema.methods.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  this.passwordResetToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;