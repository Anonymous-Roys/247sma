const Order = require('../models/Order');
const { generateOrderNumber } = require('../utils/helpers');
const mongoose = require('mongoose');

class OrderService {
  /**
   * Create a new order without validation
   */
  async createOrder(orderData) {
    try {
      // Generate order number
      const orderNumber = generateOrderNumber();
      
      // Create order with provided data
      const order = new Order({
        ...orderData,
        orderNumber,
        status: 'pending' // Default status
      });

      const savedOrder = await order.save();
      return savedOrder;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get orders by user ID
   */
  async getOrdersByUser(userId) {
    try {
      const orders = await Order.find({
        $or: [
          { userId: new mongoose.Types.ObjectId(userId) },
          { 'customer.email': userId }
        ]
      }).sort({ createdAt: -1 });
      
      return orders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      return order;
    } catch (error) {
      throw error;
    }
  }


  /**
 * Get orders by farmer ID
 */
async getOrdersByFarmer(farmerId) {
  try {
    const orders = await Order.find({
      'items.farmerId': new mongoose.Types.ObjectId(farmerId)
    }).sort({ createdAt: -1 });
    
    return orders;
  } catch (error) {
    throw error;
  }
}
}

module.exports = new OrderService();