const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    records: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
        status: { type: String, enum: ['present', 'absent', 'late', 'excused'], required: true },
        remarks: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Attendance', attendanceSchema);
