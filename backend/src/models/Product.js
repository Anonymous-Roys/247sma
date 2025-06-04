const mongoose = require('mongoose');

const ProductImageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String, default: '' },
  isPrimary: { type: Boolean, default: false },
}, { _id: false });

const ProductVariantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  comparedAtPrice: { type: Number },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  weightUnit: {
    type: String,
    enum: ['kg', 'g', 'lb', 'oz'],
    required: true
  },
  stock: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  categories: {
    type: [String],
    enum: [
      'fruits', 'vegetables', 'grains', 'dairy', 'meat',
      'poultry', 'herbs', 'spices', 'seeds', 'roots',
      'greens', 'other'
    ],
    default: []
  },
  images: [ProductImageSchema],
  variants: [ProductVariantSchema],
  harvestDate: { type: Date },
  bestBefore: { type: Date },
  certifications: { type: [String], default: [] },
  isOrganic: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['draft', 'active', 'out_of_stock', 'deleted', 'inactive'],
    default: 'draft'
  },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  metaTitle: { type: String },
  metaDescription: { type: String },
  tags: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
