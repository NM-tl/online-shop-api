const sendResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    message,
  });
};

module.exports = { sendResponse };
