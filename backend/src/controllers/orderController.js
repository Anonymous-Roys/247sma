const orderService = require('../services/orderService');

module.exports = {
  /**
   * Create a new order (no validation)
   */
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error });
    }
  },

  /**
   * Get user's orders
   */
  async getUserOrders(req, res) {
    try {
      // For demo, using email as user identifier
      const userId = req.params.userId || req.query.email;
      if (!userId) {
        return res.status(400).json({ message: 'User identifier required' });
      }
      
      const orders = await orderService.getOrdersByUser(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get orders', error });
    }
  },

  /**
   * Get order details
   */
  async getOrderDetails(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get order details', error });
    }
  },
  /**
 * Get orders by farmer ID
 */
async getOrdersByFarmer(req, res) {
  try {
    const farmerId = req.params.farmerId;
    if (!farmerId) {
      return res.status(400).json({ message: 'Farmer ID is required' });
    }
    
    const orders = await orderService.getOrdersByFarmer(farmerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get farmer orders', error });
  }
}
};