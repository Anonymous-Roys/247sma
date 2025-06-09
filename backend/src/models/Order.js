const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String},
  productName: { type: String, required: true },
  variantId: { type: String},
  variantName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  weight: { type: Number, required: true },
  weightUnit: {
    type: String,
    enum: ['kg', 'g', 'lb', 'oz'],
    required: true
  },
  farmerId: { type:  String }
}, { _id: false });

const CustomerInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  isGuest: { type: Boolean, default: true }
}, { _id: false });

const ShippingInfoSchema = new mongoose.Schema({
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  method: { type: String, required: true },
  cost: { type: Number, required: true },
  estimatedDelivery: { type: Date },
  trackingNumber: { type: String },
  transitPartnerId: { type: String }
}, { _id: false });

const PaymentInfoSchema = new mongoose.Schema({
  method: { type: String, required: true },
  transactionId: { type: String },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    required: true
  },
  paidAt: { type: Date },
  total: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  customer: { type: CustomerInfoSchema, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional for logged-in users
  orderNumber: { type: String, required: true, unique: true },
  items: { type: [OrderItemSchema], required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  shipping: { type: ShippingInfoSchema, required: true },
  payment: { type: PaymentInfoSchema, required: true },
  discount: {
    code: { type: String },
    amount: { type: Number }
  },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  notes: { type: String },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);