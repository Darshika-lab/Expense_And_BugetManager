const pool = require("../config/db");

const getBudgetByUserMonthYear = async (userId, month, year) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, month, year, amount, created_at, updated_at
     FROM budgets
     WHERE user_id = ? AND month = ? AND year = ?
     LIMIT 1`,
    [userId, month, year]
  );

  return rows[0];
};

const createBudget = async (userId, month, year, amount) => {
  const [result] = await pool.execute(
    `INSERT INTO budgets (user_id, month, year, amount)
     VALUES (?, ?, ?, ?)`,
    [userId, month, year, amount]
  );

  return result;
};

const updateBudgetById = async (budgetId, amount) => {
  const [result] = await pool.execute(
    `UPDATE budgets
     SET amount = ?
     WHERE id = ?`,
    [amount, budgetId]
  );

  return result;
};

module.exports = {
  getBudgetByUserMonthYear,
  createBudget,
  updateBudgetById
};