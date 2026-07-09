const Class = require('../models/Class');
const Exam = require('../models/exam');
const ApiError = require('../utils/apiError');


exports.createClass = async (req, res, next) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().populate('classTeacher', 'name email');
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.getClass = async (req, res, next) => {
  try {
    const singleClass = await Class.findById(req.params.id).populate('classTeacher', 'name email');
    if (!singleClass) return next(new ApiError(404, 'Class not found'));
    res.status(200).json({ success: true, data: singleClass });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedClass) return next(new ApiError(404, 'Class not found'));
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return next(new ApiError(404, 'Class not found'));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};


exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.getExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return next(new ApiError(404, 'Exam not found'));
    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!exam) return next(new ApiError(404, 'Exam not found'));
    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return next(new ApiError(404, 'Exam not found'));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};
