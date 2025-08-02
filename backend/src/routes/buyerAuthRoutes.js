const express = require('express');
// const multer = require('multer');
// // Configure storage (optional customization)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/profiles'); // Ensure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// // Create the upload middleware
// const upload = multer({ storage });
const buyerAuthController = require('../controllers/buyerAuthController');
const upload = require('../utils/multer'); // Make sure this exists
const router = express.Router();

router.post('/signup', buyerAuthController.signup);
router.post('/login', buyerAuthController.login);
router.get('/verify-email/:token', buyerAuthController.verifyEmail);
router.post('/forgot-password', buyerAuthController.forgotPassword);
router.patch('/reset-password/:token', buyerAuthController.resetPassword);

// Protected routes (require authentication)
router.use(buyerAuthController.protect);

// Profile routes
router.get('/profile', buyerAuthController.getProfile);
router.patch('/profile', buyerAuthController.updateProfile);
router.post(
  '/profile/image',
  upload.single('profileImage'), // Using multer middleware for file upload
  buyerAuthController.uploadProfileImage
);

// Wishlist routes
router.get('/wishlist', buyerAuthController.getWishlist);
// router.post('/wishlist/:productId', buyerAuthController.addToWishlist);
// router.delete('/wishlist/:productId', buyerAuthController.removeFromWishlist);

// Order history routes
// router.get('/orders', buyerAuthController.getOrders);
// router.get('/orders/:orderId', buyerAuthController.getOrderDetails);

// // Points/rewards routes
// router.get('/points', buyerAuthController.getPoints);
// router.get('/points/history', buyerAuthController.getPointsHistory);

module.exports = router;