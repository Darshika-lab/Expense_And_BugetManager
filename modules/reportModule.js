const pool = require("../config/db");

const getMonthlyTotalExpense = async (userId, month, year) => {
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

const getTotalIncomeByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_income
     FROM incomes
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

const getTotalExpenseByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_expense
     FROM expenses
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

module.exports = {
  getMonthlyTotalExpense,
  getTotalIncomeByUserId,
  getTotalExpenseByUserId
};