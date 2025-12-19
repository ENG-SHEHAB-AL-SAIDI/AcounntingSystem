// app.js or middleware/errorHandler.js
function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);

  // Default response structure
  const response = {
    error: {
      model: err.model || null,
      action: err.action || null,
      message: err.message || 'Internal Server Error',
      meta: err.meta || null
    }
  };

  // Use statusCode if provided
  const status = err.statusCode || 500;

  res.status(status).json(response);
}

module.exports = globalErrorHandler;
