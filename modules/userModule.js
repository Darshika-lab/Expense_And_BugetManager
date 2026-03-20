const pool = require("../config/db");

const getUserById = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT id, name, email, role
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );

  return rows[0];
};

module.exports = {
  getUserById
};