const { body, check } = require('express-validator');

exports.orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
  body('items.*.variantId').notEmpty().withMessage('Variant ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shipping.address.street').notEmpty().withMessage('Street address is required'),
  body('shipping.address.city').notEmpty().withMessage('City is required'),
  body('shipping.address.state').notEmpty().withMessage('State is required'),
  body('shipping.address.country').notEmpty().withMessage('Country is required'),
  body('shipping.address.postalCode').notEmpty().withMessage('Postal code is required'),
  body('shipping.method').notEmpty().withMessage('Shipping method is required'),
  body('shipping.cost').isFloat({ min: 0 }).withMessage('Shipping cost must be a positive number'),
  body('payment.method').notEmpty().withMessage('Payment method is required'),
];