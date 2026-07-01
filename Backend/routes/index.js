const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const studentRoutes = require("./students");

const attendanceRouter = require('./attendaceRoutes.js')

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);

router.use('/attendance', attendanceRouter ) ;

module.exports = router;
