const reportModule = require("../modules/reportModule");
const budgetModule = require("../modules/budgetModule");

const getFinancialSummary = async (req, res) => {
  try {
    const userId = req.user.id;
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

    const totalIncomeData = await reportModule.getTotalIncomeByUserId(userId);
    const totalExpenseData = await reportModule.getTotalExpenseByUserId(userId);
    const monthlySpendingData = await reportModule.getMonthlyTotalExpense(userId, month, year);
    const budget = await budgetModule.getBudgetByUserMonthYear(userId, month, year);

    const totalIncome = Number(totalIncomeData.total_income);
    const totalExpense = Number(totalExpenseData.total_expense);
    const totalSpending = Number(monthlySpendingData.total_spending);
    const remainingBalance = totalIncome - totalExpense;

    let monthlyBudget = 0;
    let monthlyBudgetRemaining = 0;
    let exceeded = false;
    let exceededAmount = 0;

    if (budget) {
      monthlyBudget = Number(budget.amount);
      monthlyBudgetRemaining = monthlyBudget - totalSpending;
      exceeded = totalSpending > monthlyBudget;
      exceededAmount = exceeded ? totalSpending - monthlyBudget : 0;
    }

    return res.status(200).json({
      success: true,
      data: {
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
  } catch (error) {
    console.error("Get Financial Summary Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching financial summary"
    });
  }
};

module.exports = {
  getFinancialSummary
};