const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/', CartController.getCart);              // Get cart
router.post('/', CartController.addToCart);           // Add to cart
router.delete('/', CartController.clearCart);         // Clear cart

module.exports = router;
