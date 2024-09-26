const { users } = require('../models/storage');
const { sendResponse } = require('../utils/responseHandler');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

exports.validateRegistration = (email, password) => {
  if (!email || !emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  if (!password || !passwordRegex.test(password)) {
    return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
  }

  return null;
};

exports.authMiddleware = (req, res, next) => {
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
