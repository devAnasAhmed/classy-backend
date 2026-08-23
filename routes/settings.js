const express = require('express');
const router = express.Router();
const { getAll, getOne, update, updateMany } = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/auth');

// Public
router.get('/', getAll);
router.get('/:key', getOne);

// Admin only
router.put('/', protect, adminOnly, update);
router.put('/bulk', protect, adminOnly, updateMany);

module.exports = router;
