const orderService = require('../services/orderService');
const { validationResult } = require('express-validator');

class OrderController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await orderService.createOrder({
        ...req.body,
        customerId: req.user._id
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get customer's orders
  async getCustomerOrders(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await orderService.getCustomerOrders(req.user._id, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get farmer's orders
  async getFarmerOrders(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await orderService.getFarmerOrders(req.user._id, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get order details
  async getOrderDetails(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user._id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update order status (for farmers)
  async updateOrderStatus(req, res) {
    try {
      const order = await orderService.updateOrderStatus(
        req.params.id,
        req.user._id,
        req.body.status
      );
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Admin or payment webhook can update payment status
  async updatePaymentStatus(req, res) {
    try {
      const order = await orderService.updatePaymentStatus(
        req.params.id,
        req.body
      );
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();