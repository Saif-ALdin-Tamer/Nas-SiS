const express = require('express');
const {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam
} = require('../controllers/acadimicController');

const router = express.Router();

// Classes
router.route('/classes')
  .get(getClasses)
  .post(createClass);

router.route('/classes/:id')
  .get(getClass)
  .put(updateClass)
  .delete(deleteClass);

// Exams
router.route('/exams')
  .get(getExams)
  .post(createExam);

router.route('/exams/:id')
  .get(getExam)
  .put(updateExam)
  .delete(deleteExam);

module.exports = router;
