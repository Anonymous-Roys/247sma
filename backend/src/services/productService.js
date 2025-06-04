const Product = require('../models/Product');
const { sendProductNotification } = require('../services/emailService');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

exports.createProduct = async (productData, user) => {
  const sku = `PROD-${Date.now()}`;
  
  // Prepare variants with additional required fields
  const variants = productData.variants.map(variant => ({
    ...variant,
    id: uuidv4(),
    sku: sku,
    comparedAtPrice: variant.price * 1.2, 
    isAvailable: productData.status === 'active'
  }));

  // Prepare images with IDs
  const images = productData.images.map(img => ({
    ...img,
    id: uuidv4()
  }));

  // Create slug from product name
  const slug = slugify(productData.name, { lower: true, strict: true });

  const product = new Product({
    ...productData,
    farmerId: user._id, 
    slug: slug,
    description: productData.description || productData.name,
    shortDescription: productData.shortDescription || productData.name,
    variants: variants,
    images: images,
    status: productData.status || 'active'
  });

  await product.save();

  await sendProductNotification(user.email, 'created', product);
  return product;
};

exports.updateProduct = async (productId, updates, user) => {
  const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
  await sendProductNotification(user.email, 'updated', product);
  return product;
};

exports.deleteProduct = async (productId, user) => {
  const product = await Product.findByIdAndDelete(productId);
  await sendProductNotification(user.email, 'deleted', product);
  return product;
};

exports.getProduct = async (productId) => {
  return Product.findById(productId);
};

exports.getAllProducts = async () => {
  return Product.find({});
};

// In your product controller file
exports.getProductsByFarmer = async (farmerId) => {
  return Product.find({ farmerId });
};