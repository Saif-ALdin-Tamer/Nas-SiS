const express = require('express');
const { body, param } = require('express-validator');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get(
  '/',
  roleMiddleware.authorizeRoles('superAdmin', 'admin', 'teacher'),
  studentController.getStudents,
);

router.post(
  '/',
  roleMiddleware.authorizeRoles('superAdmin', 'admin'),
  [
    body('userId').isMongoId().withMessage('Valid userId is required.'),
    body('studentId').notEmpty().withMessage('Student ID is required.'),
    body('dateOfBirth').isISO8601().toDate().withMessage('Valid date of birth is required.'),
  ],
  validationMiddleware,
  studentController.createStudent,
);

router.get(
  '/:id',
  roleMiddleware.authorizeRoles('superAdmin', 'admin', 'teacher', 'parent'),
  [param('id').isMongoId().withMessage('Valid student ID is required.')],
  validationMiddleware,
  studentController.getStudentById,
);

router.put(
  '/:id',
  roleMiddleware.authorizeRoles('superAdmin', 'admin'),
  [param('id').isMongoId().withMessage('Valid student ID is required.')],
  validationMiddleware,
  studentController.updateStudent,
);

module.exports = router;
