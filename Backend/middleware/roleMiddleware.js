const ApiError = require("../utils/apiError");

exports.authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "User is not authenticated."));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You do not have permission to perform this action."),
      );
    }

    next();
  };
