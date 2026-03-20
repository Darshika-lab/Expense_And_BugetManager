const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgetController");
const { verifyToken } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateMiddleware");
const { setBudgetValidation } = require("../validators/budgetValidator");

router.post("/", verifyToken, setBudgetValidation, validateRequest, budgetController.setMonthlyBudget);
router.get("/", verifyToken, budgetController.getMonthlyBudgetStatus);

module.exports = router;