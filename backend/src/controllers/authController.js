const User = require('../models/User');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');

const createUser = async (emailOrPhone, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] 
  });
  
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user based on input type
  const userData = emailOrPhone.includes('@') 
    ? { email: emailOrPhone, password: hashedPassword }
    : { phone: emailOrPhone, password: hashedPassword };

  const user = new User(userData);
  await user.save();

  // Clean up OTP after successful verification
  await OTP.deleteMany({ 
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] 
  });

  return user;
};

module.exports = { createUser };