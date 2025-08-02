const multer = require('multer');
const AppError = require('./appError');

const storage = multer.memoryStorage(); // Using memory storage for MongoDB

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB max file size
  }
});

module.exports = upload;