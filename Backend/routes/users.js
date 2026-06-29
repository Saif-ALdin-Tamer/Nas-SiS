const express = require("express");
const { param } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(authMiddleware.protect);

router.get(
  "/",
  roleMiddleware.authorizeRoles("superAdmin", "admin"),
  userController.getUsers,
);

router.get("/me", userController.getCurrentUser);

router.get(
  "/:id",
  roleMiddleware.authorizeRoles("superAdmin", "admin"),
  [param("id").isMongoId().withMessage("Valid user ID is required.")],
  validationMiddleware,
  userController.getUserById,
);

module.exports = router;
