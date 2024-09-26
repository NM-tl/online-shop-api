exports.sendResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    message,
  });
};

exports.sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

exports.sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};
