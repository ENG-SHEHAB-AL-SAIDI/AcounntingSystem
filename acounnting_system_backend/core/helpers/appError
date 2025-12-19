// utils/appError.js
class AppError extends Error {
  /**
   * @param {Object} options
   * @param {string} options.model - Model name (e.g., "Contact")
   * @param {string} options.action - Action type (e.g., "create", "update")
   * @param {number} options.statusCode - HTTP status code (e.g., 400, 404, 500)
   * @param {string} options.message - Optional custom message
   * @param {any} options.meta - Optional extra metadata (e.g., validation errors)
   */
  constructor({ model, action, statusCode = 500, message = null, meta = null }) {
    super(message || `${model} ${action} failed`);
    this.name = 'AppError';
    this.model = model;
    this.action = action;
    this.statusCode = statusCode;
    this.meta = meta;

    // Capture stack trace (optional)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
