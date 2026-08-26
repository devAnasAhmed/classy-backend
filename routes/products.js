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

// دالة مساعدة: تلف middleware رفع الصورة عشان تمسك أي خطأ (multer أو Cloudinary)
// وتطبعه بوضوح في الـ logs بدل ما يضيع كـ "undefined"
function handleUpload(req, res, next) {
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error('خطأ في رفع الصورة (multer/cloudinary):', err);
      return res.status(500).json({
        success: false,
        message: 'فشل رفع الصورة: ' + (err.message || JSON.stringify(err) || 'خطأ غير معروف من Cloudinary')
      });
    }
    next();
  });
}

// Get all products
router.get('/', getAll);

// Get one product
router.get('/:id', getOne);

// Create product
router.post(
  '/',
  protect,
  adminOnly,
  handleUpload,
  create
);

// Update product
router.put(
  '/:id',
  protect,
  adminOnly,
  handleUpload,
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
