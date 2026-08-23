const express = require('express');
const router = express.Router();
const { getAll, create, update, delete: deleteGallery } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', protect, adminOnly, create);
router.put('/:id', protect, adminOnly, update);
router.delete('/:id', protect, adminOnly, deleteGallery);

module.exports = router;
