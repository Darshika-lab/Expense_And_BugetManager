const pool = require("../config/db");

const getAllUsersBasic = async () => {
  const [rows] = await pool.execute(
    `SELECT id, name, email, role, created_at
     FROM users
     ORDER BY id DESC`
  );

  return rows;
};

const getUserBasicById = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT id, name, email, role, created_at
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );

  return rows[0];
};

const getUserTotalIncome = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_income
     FROM incomes
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

const getUserTotalExpense = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_expense
     FROM expenses
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

const getUserMonthlyExpense = async (userId, month, year) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_spending
     FROM expenses
     WHERE user_id = ?
       AND MONTH(expense_date) = ?
       AND YEAR(expense_date) = ?`,
    [userId, month, year]
  );

  return rows[0];
};

const getUserBudgetByMonthYear = async (userId, month, year) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, month, year, amount
     FROM budgets
     WHERE user_id = ? AND month = ? AND year = ?
     LIMIT 1`,
    [userId, month, year]
  );

  return rows[0];
};

module.exports = {
  getAllUsersBasic,
  getUserBasicById,
  getUserTotalIncome,
  getUserTotalExpense,
  getUserMonthlyExpense,
  getUserBudgetByMonthYear
};