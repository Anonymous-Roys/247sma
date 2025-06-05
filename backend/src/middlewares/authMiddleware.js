// const jwt = require('jsonwebtoken');
// const { getUserById } = require('../controllers/authController');

// module.exports = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ success: false, message: 'No token, authorization denied' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Get user from token
//     const user = await getUserById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Token is not valid' });
//     }

//     // Add user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Token is not valid' });
//   }
// };

