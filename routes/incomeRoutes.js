const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/incomeController");
const { verifyToken } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateMiddleware");
const {
  addIncomeValidation,
  updateIncomeValidation,
  incomeIdValidation
} = require("../validators/incomeValidator");

router.post("/", verifyToken, addIncomeValidation, validateRequest, incomeController.addIncome);
router.get("/", verifyToken, incomeController.getAllIncomes);
router.get("/:id", verifyToken, incomeIdValidation, validateRequest, incomeController.getIncomeById);
router.put("/:id", verifyToken, updateIncomeValidation, validateRequest, incomeController.updateIncome);
router.delete("/:id", verifyToken, incomeIdValidation, validateRequest, incomeController.deleteIncome);

module.exports = router;