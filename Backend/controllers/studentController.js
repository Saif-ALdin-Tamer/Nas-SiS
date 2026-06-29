const StudentProfile = require('../models/StudentProfile');
const ApiError = require('../utils/apiError');

exports.getStudents = async (req, res, next) => {
  try {
    const students = await StudentProfile.find().populate('userId', 'name email role');
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const existingStudent = await StudentProfile.findOne({ studentId: req.body.studentId });
    if (existingStudent) {
      return next(new ApiError(409, 'Student ID already exists.'));
    }

    const student = await StudentProfile.create(req.body);
    res.status(201).json({ success: true, data: student, message: 'Student enrolled successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await StudentProfile.findById(req.params.id).populate('userId parentId currentClass');
    if (!student) {
      return next(new ApiError(404, 'Student not found.'));
    }

    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return next(new ApiError(404, 'Student not found.'));
    }

    res.json({ success: true, data: student, message: 'Student record updated successfully.' });
  } catch (error) {
    next(error);
  }
};
