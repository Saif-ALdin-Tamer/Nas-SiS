const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: String, required: true, unique: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrollmentDate: { type: Date, default: Date.now },
    currentClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    gradeLevel: String,
    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
