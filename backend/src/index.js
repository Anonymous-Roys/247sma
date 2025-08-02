require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const buyerAuthRoutes = require('./routes/buyerAuthRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { globalErrorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Middleware
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(globalErrorHandler);

// Routes
app.use('/api', authRoutes);
app.use('/api/buyer', buyerAuthRoutes);
app.use('/api/products', require('./routes/product'));
app.use('/api/orders', orderRoutes);
// console.log(process.env.MONGODB_URI)
// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});