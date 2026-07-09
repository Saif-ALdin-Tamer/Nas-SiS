const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const studentRoutes = require("./students");

const attendanceRouter = require('./attendanceRoutes.js')
const academicRoutes = require('./academicRoutes');
const financeRoutes = require('./financeRoutes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);

router.use('/attendance', attendanceRouter ) ;
router.use('/academic', academicRoutes);
router.use('/finance', financeRoutes);

module.exports = router;
