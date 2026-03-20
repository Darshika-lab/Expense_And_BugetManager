const { body, param } = require("express-validator");

const addIncomeValidation = [
  body("source")
    .trim()
    .notEmpty()
    .withMessage("Income source is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Income source must be between 2 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("income_date")
    .notEmpty()
    .withMessage("Income date is required")
    .isDate()
    .withMessage("Income date must be a valid date"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be maximum 500 characters")
];

const updateIncomeValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Income id must be a valid positive number"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Income source is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Income source must be between 2 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("income_date")
    .notEmpty()
    .withMessage("Income date is required")
    .isDate()
    .withMessage("Income date must be a valid date"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be maximum 500 characters")
];

const incomeIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Income id must be a valid positive number")
];

module.exports = {
  addIncomeValidation,
  updateIncomeValidation,
  incomeIdValidation
};