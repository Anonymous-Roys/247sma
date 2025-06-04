const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP, verifyOTP } = require('../services/otpService');
const { createUser, getUserByEmail } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Existing OTP routes
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
    const {name, emailOrPhone, password, otp } = req.body;
    const type = emailOrPhone.includes('@') ? 'email' : 'phone';
    
    const isValid = await verifyOTP(type, emailOrPhone, otp);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    const user = await createUser(name, emailOrPhone, password);
    res.json({ success: true, message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// New authentication routes
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7h' }
    );

    // Remove password from response
    user.password = undefined;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // In a real app, you would send an email with a reset link
    // For now, we'll just return the token (for testing purposes)
    res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    // The auth middleware adds the user to the request
    const user = req.user;
    user.password = undefined;
    console.log('user' , user)
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // In a real app, you might want to implement token blacklisting here
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;