const mongoose = require('mongoose');

// Generate unique order number
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  
  return `ORD-${year}${month}${day}-${random}`;
}

// Validate MongoDB ID
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  generateOrderNumber,
  isValidId
};