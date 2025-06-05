// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');
// const { checkAuth, checkRole } = require('../middleware/auth');
// const { orderValidation } = require('../validation/orderValidation');

// // Customer routes
// router.post('/', checkAuth, orderValidation, orderController.createOrder);
// router.get('/my-orders', checkAuth, orderController.getCustomerOrders);
// router.get('/:id', checkAuth, orderController.getOrderDetails);

// // Farmer routes
// router.get('/farmer/my-orders', checkAuth, checkRole('farmer'), orderController.getFarmerOrders);
// router.patch('/:id/status', checkAuth, checkRole('farmer'), orderController.updateOrderStatus);

// // Admin/Payment webhook routes
// router.patch('/:id/payment', orderController.updatePaymentStatus);

// module.exports = router;