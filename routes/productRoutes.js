const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);

module.exports = router;
