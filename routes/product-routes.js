const express = require('express');
const { addProducts, getProductStats, getProductAnalysis } = require('../controllers/product-controller');
const router = express.Router();

router.post('/add', addProducts)
router.get('/stats', getProductStats)
router.get('/analysis', getProductAnalysis)
module.exports = router;