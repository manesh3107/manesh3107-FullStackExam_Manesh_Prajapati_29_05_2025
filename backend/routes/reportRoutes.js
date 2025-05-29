const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');

router.get('/top-spenders', ReportController.topSpenders);         // SQL
router.get('/sales-by-category', ReportController.salesByCategory); // MongoDB

module.exports = router;
