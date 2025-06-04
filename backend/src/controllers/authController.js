const User = require('../models/User');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');

const createUser = async (name, emailOrPhone, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] 
  });
  
  if (existingUser) {
    throw new Error('User already exists, try loggging in');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user based on input type
  const userData = emailOrPhone.includes('@') 
    ? { fullname: name, email: emailOrPhone, password: hashedPassword }
    : { fullname: name, phone: emailOrPhone, password: hashedPassword };

  const user = new User(userData);
  await user.save();

  // Clean up OTP after successful verification
  await OTP.deleteMany({ 
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] 
  });

  return user;
};


const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
};


module.exports = { createUser, getUserByEmail, getUserById };