const { users } = require('../models/storage');
const { sendResponse } = require('../utils/responseHandler');
const { validateRegistration } = require('../middlewares/authMiddleware');
const { randomUUID } = require('crypto');

exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  const validationError = validateRegistration(email, password);
  
  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return sendResponse(res, 409, 'User with this email already exists');
  }

  const newUser = {
    id: randomUUID(),
    email,
    password,
  };
  
  users.push(newUser);
  
  return sendResponse(res, 201, { id: newUser.id, email: newUser.email });
};
