const adminModule = require("../modules/adminModule");

const getParticularUserFinancialReport = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!userId || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid user id is required"
      });
    }

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Valid month is required"
      });
    }

    if (!year || year < 2000 || year > 2100) {
      return res.status(400).json({
        success: false,
        message: "Valid year is required"
      });
    }

    const user = await adminModule.getUserBasicById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const incomeData = await adminModule.getUserTotalIncome(userId);
    const expenseData = await adminModule.getUserTotalExpense(userId);
    const monthlyExpenseData = await adminModule.getUserMonthlyExpense(userId, month, year);
    const budgetData = await adminModule.getUserBudgetByMonthYear(userId, month, year);

    const totalIncome = Number(incomeData.total_income);
    const totalExpense = Number(expenseData.total_expense);
    const totalSpending = Number(monthlyExpenseData.total_spending);
    const remainingBalance = totalIncome - totalExpense;

    const monthlyBudget = budgetData ? Number(budgetData.amount) : 0;
    const monthlyBudgetRemaining = monthlyBudget - totalSpending;
    const exceeded = monthlyBudget > 0 ? totalSpending > monthlyBudget : false;
    const exceededAmount = exceeded ? totalSpending - monthlyBudget : 0;

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        },
        report: {
          month,
          year,
          totalIncome,
          totalExpense,
          remainingBalance,
          monthlyBudget,
          totalSpending,
          monthlyBudgetRemaining,
          exceeded,
          exceededAmount
        }
      }
    });
  } catch (error) {
    console.error("Admin Particular User Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user financial report"
    });
  }
};

const getAllUsersFinancialReports = async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Valid month is required"
      });
    }

    if (!year || year < 2000 || year > 2100) {
      return res.status(400).json({
        success: false,
        message: "Valid year is required"
      });
    }

    const users = await adminModule.getAllUsersBasic();

    const reports = [];

    for (const user of users) {
      const incomeData = await adminModule.getUserTotalIncome(user.id);
      const expenseData = await adminModule.getUserTotalExpense(user.id);
      const monthlyExpenseData = await adminModule.getUserMonthlyExpense(user.id, month, year);
      const budgetData = await adminModule.getUserBudgetByMonthYear(user.id, month, year);

      const totalIncome = Number(incomeData.total_income);
      const totalExpense = Number(expenseData.total_expense);
      const totalSpending = Number(monthlyExpenseData.total_spending);
      const remainingBalance = totalIncome - totalExpense;

      const monthlyBudget = budgetData ? Number(budgetData.amount) : 0;
      const monthlyBudgetRemaining = monthlyBudget - totalSpending;
      const exceeded = monthlyBudget > 0 ? totalSpending > monthlyBudget : false;
      const exceededAmount = exceeded ? totalSpending - monthlyBudget : 0;

      reports.push({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        },
        report: {
          month,
          year,
          totalIncome,
          totalExpense,
          remainingBalance,
          monthlyBudget,
          totalSpending,
          monthlyBudgetRemaining,
          exceeded,
          exceededAmount
        }
      });
    }

    return res.status(200).json({
      success: true,
      totalUsers: reports.length,
      data: reports
    });
  } catch (error) {
    console.error("Admin All Users Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching all users financial reports"
    });
  }
};

module.exports = {
  getParticularUserFinancialReport,
  getAllUsersFinancialReports
};