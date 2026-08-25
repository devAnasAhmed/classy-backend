const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);           // ✅ Update profile
router.put('/password', protect, updatePassword); // ✅ Change password

module.exports = router;
