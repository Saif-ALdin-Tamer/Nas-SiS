const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ApiError(400, "Validation failed.", { errors: errors.array() }),
    );
  }
  next();
};
