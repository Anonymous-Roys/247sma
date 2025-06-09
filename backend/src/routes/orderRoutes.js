const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get user's orders (can use either userId or email)
router.get('/user/:userId', orderController.getUserOrders);
router.get('/user', orderController.getUserOrders); // For query param ?email=
router.get('/farmer/:farmerId', orderController.getOrdersByFarmer);


// Get order details
router.get('/:orderId', orderController.getOrderDetails);

module.exports = router;