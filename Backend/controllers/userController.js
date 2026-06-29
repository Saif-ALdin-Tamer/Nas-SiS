const User = require('../models/User');
const ApiError = require('../utils/apiError');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, 'User not authenticated.'));
    }
    res.json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(new ApiError(404, 'User not found.'));
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
