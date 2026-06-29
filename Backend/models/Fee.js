const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    amountDue: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["paid", "unpaid", "partial", "overdue"],
      default: "unpaid",
    },
    payments: [
      {
        amount: Number,
        date: Date,
        method: String,
        reference: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Fee", feeSchema);
