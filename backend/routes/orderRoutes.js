const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/checkout', OrderController.checkout);    // Place order
router.get('/', OrderController.orderHistory);         // View past orders

module.exports = router;
