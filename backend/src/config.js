require('dotenv').config();

module.exports = {
  EXPIRY_MINUTES: parseInt(process.env.OTP_EXPIRY_MINUTES || '5'),
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};