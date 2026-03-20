const pool = require("../config/db");

const createIncome = async (userId, source, amount, incomeDate, description) => {
  const [result] = await pool.execute(
    `INSERT INTO incomes (user_id, source, amount, income_date, description)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, source, amount, incomeDate, description]
  );

  return result;
};

const getAllIncomesByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, source, amount, income_date, description, created_at
     FROM incomes
     WHERE user_id = ?
     ORDER BY income_date DESC, id DESC`,
    [userId]
  );

  return rows;
};

const getIncomeByIdAndUserId = async (incomeId, userId) => {
  const [rows] = await pool.execute(
    `SELECT id, user_id, source, amount, income_date, description, created_at
     FROM incomes
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [incomeId, userId]
  );

  return rows[0];
};

const updateIncomeByIdAndUserId = async (
  incomeId,
  userId,
  source,
  amount,
  incomeDate,
  description
) => {
  const [result] = await pool.execute(
    `UPDATE incomes
     SET source = ?, amount = ?, income_date = ?, description = ?
     WHERE id = ? AND user_id = ?`,
    [source, amount, incomeDate, description, incomeId, userId]
  );

  return result;
};

const deleteIncomeByIdAndUserId = async (incomeId, userId) => {
  const [result] = await pool.execute(
    `DELETE FROM incomes
     WHERE id = ? AND user_id = ?`,
    [incomeId, userId]
  );

  return result;
};

const getIncomeSummaryByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT IFNULL(SUM(amount), 0) AS total_income
     FROM incomes
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};

module.exports = {
  createIncome,
  getAllIncomesByUserId,
  getIncomeByIdAndUserId,
  updateIncomeByIdAndUserId,
  deleteIncomeByIdAndUserId,
  getIncomeSummaryByUserId
};