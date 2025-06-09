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

// Updated controller with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    
    // Build query
    const query = {};
    
    // Add filters
    if (filters.category) {
      query.categories = filters.category;
    }
    
    if (filters.featured) {
      query.featured = filters.featured === 'true';
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      query['variants.price'] = {};
      if (filters.minPrice) {
        query['variants.price'].$gte = Number(filters.minPrice);
      }
      if (filters.maxPrice) {
        query['variants.price'].$lte = Number(filters.maxPrice);
      }
    }
    
    // Execute query with pagination
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(filters.sort || '-createdAt');
    
    // Get total count for pagination info
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


exports.getProductBySlug = async (slug) => {
  return Product.findOne({ slug });
};

// In your product controller file
exports.getProductsByFarmer = async (farmerId) => {
  return Product.find({ farmerId });
};