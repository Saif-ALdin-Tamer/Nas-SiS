const ApiError = require("../utils/apiError");

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(500, err.message || "Internal server error.");
  }

  const response = {
    success: false,
    message: err.message,
  };

  if (process.env.NODE_ENV !== "production" && err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(err.statusCode || 500).json(response);
};

module.exports = errorHandler;
