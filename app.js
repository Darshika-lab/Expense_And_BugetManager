const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Expense Manager Auth API is running"
  });
});
//Routes--------------------------
app.use("/api/auth", authRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.get("/api/test-db", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();

    return res.status(200).json({
      success: true,
      message: "Database connected successfully"
    });
  } catch (error) {
    console.error("DB Test Error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  return res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});