const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, delete: deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, adminOnly, upload.single('image'), create);
router.put('/:id', protect, adminOnly, upload.single('image'), update);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
