const { users } = require('../models/storage');
const { sendResponse } = require('../utils/responseHandler');

const authMiddleware = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return sendResponse(res, 400, 'x-user-id header is required');
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return sendResponse(res, 404, 'User not found');
  }

  req.user = user;
  next();
};

module.exports = { authMiddleware };
