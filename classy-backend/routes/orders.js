const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, updateStatus, delete: deleteOrder } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getAll);
router.get('/:id', protect, adminOnly, getOne);
router.post('/', create); // Public: customers can create orders
router.put('/:id', protect, adminOnly, update);
router.patch('/:id/status', protect, adminOnly, updateStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;
