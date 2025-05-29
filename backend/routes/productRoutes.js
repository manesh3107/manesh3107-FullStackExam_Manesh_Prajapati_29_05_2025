const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.list);             // List + filter + pagination
router.get('/:id', ProductController.get);           // Get product by ID

module.exports = router;
