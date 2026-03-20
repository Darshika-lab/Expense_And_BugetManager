const { body, param } = require("express-validator");

const addExpenseValidation = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Expense category is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Expense category must be between 2 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("expense_date")
    .notEmpty()
    .withMessage("Expense date is required")
    .isDate()
    .withMessage("Expense date must be a valid date"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be maximum 500 characters")
];

const updateExpenseValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Expense id must be a valid positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Expense category is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Expense category must be between 2 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("expense_date")
    .notEmpty()
    .withMessage("Expense date is required")
    .isDate()
    .withMessage("Expense date must be a valid date"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be maximum 500 characters")
];

const expenseIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Expense id must be a valid positive number")
];

module.exports = {
  addExpenseValidation,
  updateExpenseValidation,
  expenseIdValidation
};