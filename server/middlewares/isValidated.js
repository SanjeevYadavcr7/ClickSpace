const { validationResult } = require("express-validator");
const httpstatusCodes = require("../util/status-codes");

exports.isValidated = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("User validation failed");
    error.statusCode = httpstatusCodes.UNPROCESSABLE_ENTITY;
    error.data = validationErrors.array();
    throw error;
  }
  next();
};
