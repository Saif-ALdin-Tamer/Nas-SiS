const rateLimit = require("express-rate-limit");

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many authentication requests from this IP, please try again in 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
