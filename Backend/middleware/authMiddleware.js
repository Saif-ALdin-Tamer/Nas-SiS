const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/apiError");

exports.protect = async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return next(new ApiError(401, "Authorization token is required."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ApiError(401, "User no longer exists."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token."));
  }
};
