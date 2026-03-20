const expenseModule = require("../modules/expenseModule");
const budgetController = require("./budgetController");

const addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    let { category, amount, expense_date, description } = req.body;

    category = category.trim();
    amount = Number(amount);
    description = description ? description.trim() : null;

    const result = await expenseModule.createExpense(
      userId,
      category,
      amount,
      expense_date,
      description
    );

    const expense = await expenseModule.getExpenseByIdAndUserId(result.insertId, userId);

    const expenseDate = new Date(expense_date);
    const month = expenseDate.getMonth() + 1;
    const year = expenseDate.getFullYear();

    await budgetController.checkAndTriggerBudgetAlert(userId, month, year);

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense
    });
  } catch (error) {
    console.error("Add Expense Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding expense"
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await expenseModule.getAllExpensesByUserId(userId);
    const summary = await expenseModule.getExpenseSummaryByUserId(userId);

    return res.status(200).json({
      success: true,
      totalRecords: expenses.length,
      totalExpense: Number(summary.total_expense),
      data: expenses
    });
  } catch (error) {
    console.error("Get All Expenses Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching expenses"
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);

    const expense = await expenseModule.getExpenseByIdAndUserId(expenseId, userId);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error("Get Expense By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching expense"
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);
    let { category, amount, expense_date, description } = req.body;

    category = category.trim();
    amount = Number(amount);
    description = description ? description.trim() : null;

    const existingExpense = await expenseModule.getExpenseByIdAndUserId(expenseId, userId);

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found"
      });
    }

    await expenseModule.updateExpenseByIdAndUserId(
      expenseId,
      userId,
      category,
      amount,
      expense_date,
      description
    );

    const updatedExpense = await expenseModule.getExpenseByIdAndUserId(expenseId, userId);

    const expenseDate = new Date(expense_date);
    const month = expenseDate.getMonth() + 1;
    const year = expenseDate.getFullYear();

    await budgetController.checkAndTriggerBudgetAlert(userId, month, year);

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense
    });
  } catch (error) {
    console.error("Update Expense Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating expense"
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);

    const existingExpense = await expenseModule.getExpenseByIdAndUserId(expenseId, userId);

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found"
      });
    }

    await expenseModule.deleteExpenseByIdAndUserId(expenseId, userId);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting expense"
    });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};