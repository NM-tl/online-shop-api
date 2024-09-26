const { products } = require('../models/storage');
const { sendResponse } = require('../utils/responseHandler');

const getAllProducts = (req, res) => {
  sendResponse(res, 200, products);
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.productId);
  if (!product) {
    return sendResponse(res, 404, 'Product not found');
  }
  sendResponse(res, 200, product);
};

module.exports = { getAllProducts, getProductById };
