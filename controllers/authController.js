const { randomUUID } = require('crypto');
const { users } = require('../models/storage');
const { sendResponse } = require('../utils/responseHandler');

const registerUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 400, 'Email and password are required');
  }
  const newUser = { id: randomUUID(), email, password };
  users.push(newUser);
  sendResponse(res, 200, { id: newUser.id, email: newUser.email });
};

module.exports = { registerUser };
