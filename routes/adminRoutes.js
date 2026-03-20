const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.get(
  "/reports/users",
  verifyToken,
  authorizeRoles("admin"),
  adminController.getAllUsersFinancialReports,
);

router.get(
  "/reports/users/:userId",
  verifyToken,
  authorizeRoles("admin"),
  adminController.getParticularUserFinancialReport,
);

module.exports = router;
