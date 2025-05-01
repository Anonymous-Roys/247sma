const express = require('express');
const { sendOTP, verifyOTP } = require('../services/otpService');
const { createUser } = require('../controllers/authController');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    const type = emailOrPhone.includes('@') ? 'email' : 'phone';
    
    const otpInfo = await sendOTP(type, emailOrPhone);
    res.json({ 
      success: true, 
      message: `OTP sent to ${emailOrPhone}`,
      otpId: otpInfo.otpId
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { emailOrPhone, password, otp } = req.body;
    const type = emailOrPhone.includes('@') ? 'email' : 'phone';
    
    const isValid = await verifyOTP(type, emailOrPhone, otp);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    const user = await createUser(emailOrPhone, password);
    res.json({ success: true, message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;