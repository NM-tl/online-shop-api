const { carts, products, orders } = require('../models/storage');
const { randomUUID } = require('crypto');
const { sendResponse } = require('../utils/responseHandler');

const addProductToCart = (req, res) => {
  const userId = req.user.id;
  const product = products.find(p => p.id === req.params.productId);

  if (!product) {
    return sendResponse(res, 404, 'Product not found');
  }

  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = { id: randomUUID(), userId, products: [] };
    carts.push(cart);
  }

  cart.products.push(product);
  sendResponse(res, 200, cart);
};

const removeProductFromCart = (req, res) => {
  const userId = req.user.id;
  const cart = carts.find(c => c.userId === userId);
  if (!cart) {
    return sendResponse(res, 404, 'Cart not found');
  }

  cart.products = cart.products.filter(p => p.id !== req.params.productId);
  sendResponse(res, 200, cart);
};

const checkoutCart = (req, res) => {
  const userId = req.user.id;
  const cart = carts.find(c => c.userId === userId);
  
  if (!cart || cart.products.length === 0) {
    return sendResponse(res, 400, 'Cart is empty');
  }

  const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);
  const newOrder = { id: randomUUID(), userId, products: cart.products, totalPrice };
  orders.push(newOrder);

  cart.products = [];
  sendResponse(res, 200, newOrder);
};

module.exports = { addProductToCart, removeProductFromCart, checkoutCart };
