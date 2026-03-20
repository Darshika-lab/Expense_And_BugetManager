const pool = require("../config/db");

const createNotification = async (userId, title, message) => {
  const [result] = await pool.execute(
    `INSERT INTO notifications (user_id, title, message, type)
     VALUES (?, ?, ?, 'budget_alert')`,
    [userId, title, message]
  );

  return result;
};

module.exports = {
  createNotification
};