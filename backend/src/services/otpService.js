const otpGenerator = require('otp-generator');
const OTP = require('../models/OTP');
const { sendEmailOTP, sendSMSOTP } = require('./notificationService');
const { EXPIRY_MINUTES } = require('../config');


const sendOTP = async (type, recipient) => {
  try {
    // Generate OTP
    const otp = otpGenerator.generate(6, { 
      digits: true, 
      lowerCaseAlphabets: false, 
      upperCaseAlphabets: false, 
      specialChars: false 
    });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + EXPIRY_MINUTES);

    // Save OTP to database
    const otpRecord = new OTP({
      [type]: recipient,
      otp,
      expiresAt
    });

    await otpRecord.save();

    // Send OTP to user
    if (type === 'email') {
      await sendEmailOTP(recipient, otp);
    } else {
      if (!process.env.TWILIO_ACCOUNT_SID) {
        throw new Error('SMS service not configured');
      }
      await sendSMSOTP(recipient, otp);
    }

    return { otpId: otpRecord._id, otp };
  } catch (error) {
    console.error('Error in sendOTP:', error);
    throw error;
  }
};

// ... rest of the file remains the same

const verifyOTP = async (type, recipient, otp) => {
  // Find the most recent OTP for the user
  const otpRecord = await OTP.findOne({
    [type]: recipient,
    otp,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    return false;
  }

  return true;
};

module.exports = { sendOTP, verifyOTP };