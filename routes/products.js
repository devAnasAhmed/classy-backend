const express = require('express');
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteProduct
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all products
router.get('/', getAll);

// Get one product
router.get('/:id', getOne);

// Create product
router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  create
);

// Update product
router.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('image'),
  update
);

// Delete product
router.delete(
  '/:id',
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;
