const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const product = await productService.createProduct(req.body, req.user); // now contains _id
  res.status(201).json(product);
});

// router.get('/:id', async (req, res) => {
//   const product = await productService.getProduct(req.params.id);
//   if (!product) return res.status(404).json({ error: 'Not found' });
//   res.json(product);
// });


router.get('/:slug', async (req, res) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/related?slug=air-jordan-1&categories=sneakers,basketball
router.get('/related', async (req, res) => {
  const { slug, categories } = req.query;

  if (!slug || !categories) {
    return res.status(400).json({ error: 'Missing slug or categories' });
  }

  try {
    const categoryArray = categories.split(',');
    
    const relatedProducts = await Product.find({
      slug: { $ne: slug }, // Exclude current product
      categories: { $in: categoryArray },
    }).limit(4);

    res.json(relatedProducts);
  } catch (err) {
    console.error('Error fetching related products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.route('/')
  .get(productService.getAllProducts);

router.put('/:id', authMiddleware, async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.user);
  res.json(product);
});
// Add this to your product routes
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id, req.user);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// In your product routes file
router.get('/farmer/:farmerId', authMiddleware, async (req, res) => {
  console.log('Fetching products for farmer:', req.params.farmerId);
console.log('User making request:', req.user._id);
  try {
    console.log("first")
    const products = await productService.getProductsByFarmer(req.params.farmerId);
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
