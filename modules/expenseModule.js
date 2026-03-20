const pool = require("../config/db");

const createExpense = async (userId, category, amount, expenseDate, description) => {
  const [result] = await pool.execute(
    `INSERT INTO expenses (user_id, category, amount, expense_date, description)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, category, amount, expenseDate, description]
  );

  return result;
};

const getAllExpensesByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, category, amount, expense_date, description, created_at
     FROM expenses
     WHERE user_id = ?
     ORDER BY expense_date DESC, id DESC`,
    [userId]
  );

  return rows;
};

const getExpenseByIdAndUserId = async (expenseId, userId) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, category, amount, expense_date, description, created_at
     FROM expenses
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [expenseId, userId]
  );

  return rows[0];
};

const updateExpenseByIdAndUserId = async (
  expenseId,
  userId,
  category,
  amount,
  expenseDate,
  description
) => {
  const [result] = await pool.execute(
    `UPDATE expenses
     SET category = ?, amount = ?, expense_date = ?, description = ?
     WHERE id = ? AND user_id = ?`,
    [category, amount, expenseDate, description, expenseId, userId]
  );

  return result;
};

const deleteExpenseByIdAndUserId = async (expenseId, userId) => {
  const [result] = await pool.execute(
    `DELETE FROM expenses
     WHERE id = ? AND user_id = ?`,
    [expenseId, userId]
  );

  return result;
};

const getExpenseSummaryByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_expense
     FROM expenses
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

module.exports = {
  createExpense,
  getAllExpensesByUserId,
  getExpenseByIdAndUserId,
  updateExpenseByIdAndUserId,
  deleteExpenseByIdAndUserId,
  getExpenseSummaryByUserId
};