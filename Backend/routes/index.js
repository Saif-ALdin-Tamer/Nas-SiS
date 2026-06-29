const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const studentRoutes = require("./students");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);

module.exports = router;
