const express = require('express');
const { addProductToCart, removeProductFromCart, checkoutCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/cart/:productId', authMiddleware, addProductToCart);
router.delete('/cart/:productId', authMiddleware, removeProductFromCart);
router.post('/cart/checkout', authMiddleware, checkoutCart);

module.exports = router;
