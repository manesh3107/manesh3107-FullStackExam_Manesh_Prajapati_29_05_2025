const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', auth, AuthController.profile);

module.exports = router;
