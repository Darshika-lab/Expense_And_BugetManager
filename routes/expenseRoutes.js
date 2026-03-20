const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateMiddleware");
const {
  addExpenseValidation,
  updateExpenseValidation,
  expenseIdValidation
} = require("../validators/expenseValidator");

router.post("/", verifyToken, addExpenseValidation, validateRequest, expenseController.addExpense);
router.get("/", verifyToken, expenseController.getAllExpenses);
router.get("/:id", verifyToken, expenseIdValidation, validateRequest, expenseController.getExpenseById);
router.put("/:id", verifyToken, updateExpenseValidation, validateRequest, expenseController.updateExpense);
router.delete("/:id", verifyToken, expenseIdValidation, validateRequest, expenseController.deleteExpense);

module.exports = router;