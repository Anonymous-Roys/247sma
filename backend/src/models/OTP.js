const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, sparse: true },
  phone: { type: String, sparse: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

// Index for faster queries
otpSchema.index({ email: 1 });
otpSchema.index({ phone: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OTP', otpSchema);