const Order = require('../models/Order');
const Product = require('../models/Product');
const { generateOrderNumber } = require('../utils/helpers');

class OrderService {
  // Create a new order
  async createOrder(orderData) {
    try {
      // Validate products and calculate totals
      let subtotal = 0;
      const items = await Promise.all(orderData.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const variant = product.variants.id(item.variantId);
        if (!variant) {
          throw new Error(`Variant not found: ${item.variantId}`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for variant: ${variant.name}`);
        }

        const itemTotal = variant.price * item.quantity;
        subtotal += itemTotal;

        return {
          productId: product._id,
          productName: product.name,
          variantId: variant._id,
          variantName: variant.name,
          quantity: item.quantity,
          price: variant.price,
          total: itemTotal,
          weight: variant.weight,
          weightUnit: variant.weightUnit,
          farmerId: product.farmerId
        };
      }));

      const orderNumber = generateOrderNumber();
      const tax = subtotal * 0.03; // Example 3% tax
      const total = subtotal + tax + orderData.shipping.cost;

      const order = new Order({
        ...orderData,
        orderNumber,
        items,
        subtotal,
        tax,
        total,
        status: 'pending',
        payment: {
          ...orderData.payment,
          status: 'pending',
          total
        }
      });

      // Update product stock
      await Promise.all(items.map(async (item) => {
        await Product.updateOne(
          { _id: item.productId, 'variants._id': item.variantId },
          { $inc: { 'variants.$.stock': -item.quantity } }
        );
      }));

      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }

  // Get orders for a customer
  async getCustomerOrders(customerId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const orders = await Order.find({ customerId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('customerId', 'name email');
      
      const total = await Order.countDocuments({ customerId });
      
      return {
        orders,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      };
    } catch (error) {
      throw error;
    }
  }

  // Get orders for a farmer
  async getFarmerOrders(farmerId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const orders = await Order.find({ 'items.farmerId': farmerId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('customerId', 'name email');
      
      const total = await Order.countDocuments({ 'items.farmerId': farmerId });
      
      return {
        orders,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      };
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId, userId) {
    try {
      const order = await Order.findOne({
        _id: orderId,
        $or: [
          { customerId: userId },
          { 'items.farmerId': userId }
        ]
      }).populate('customerId', 'name email');

      if (!order) {
        throw new Error('Order not found or unauthorized access');
      }

      return order;
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, userId, newStatus) {
    try {
      const order = await Order.findOne({
        _id: orderId,
        'items.farmerId': userId
      });

      if (!order) {
        throw new Error('Order not found or unauthorized access');
      }

      // Validate status transition
      const validTransitions = {
        pending: ['processing', 'cancelled'],
        processing: ['shipped', 'cancelled'],
        shipped: ['delivered'],
        delivered: ['refunded'],
        cancelled: [],
        refunded: []
      };

      if (!validTransitions[order.status].includes(newStatus)) {
        throw new Error(`Invalid status transition from ${order.status} to ${newStatus}`);
      }

      order.status = newStatus;
      
      if (newStatus === 'delivered') {
        order.completedAt = new Date();
      }

      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  async updatePaymentStatus(orderId, paymentData) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      order.payment = {
        ...order.payment,
        ...paymentData
      };

      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderService();