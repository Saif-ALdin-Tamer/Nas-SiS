const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/login',
  rateLimiter.authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password is required.'),
  ],
  validationMiddleware,
  authController.login,
);

router.post(
  '/register',
  authMiddleware.protect,
  roleMiddleware.authorizeRoles('superAdmin', 'admin'),
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('role').isIn(['superAdmin', 'admin', 'teacher', 'student', 'parent', 'accountant', 'hr']).withMessage('Invalid role.'),
  ],
  validationMiddleware,
  authController.register,
);

router.get('/me', authMiddleware.protect, authController.getCurrentUser);

module.exports = router;
