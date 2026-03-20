const budgetModule = require("../modules/budgetModule");
const reportModule = require("../modules/reportModule");
const notificationModule = require("../modules/notificationModule");
const userModule = require("../modules/userModule");
const sendEmail = require("../utils/sendEmail");

const setMonthlyBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    let { month, year, amount } = req.body;

    month = Number(month);
    year = Number(year);
    amount = Number(amount);

    const existingBudget = await budgetModule.getBudgetByUserMonthYear(userId, month, year);

    if (!existingBudget) {
      await budgetModule.createBudget(userId, month, year, amount);
    } else {
      await budgetModule.updateBudgetById(existingBudget.id, amount);
    }

    const budget = await budgetModule.getBudgetByUserMonthYear(userId, month, year);
    const spendingData = await reportModule.getMonthlyTotalExpense(userId, month, year);

    const totalSpending = Number(spendingData.total_spending);
    const remainingBudget = amount - totalSpending;
    const exceededAmount = totalSpending > amount ? totalSpending - amount : 0;

    return res.status(200).json({
      success: true,
      message: "Monthly budget saved successfully",
      data: {
        budgetId: budget.id,
        month: budget.month,
        year: budget.year,
        budgetAmount: Number(budget.amount),
        totalSpending,
        remainingBudget,
        exceeded: totalSpending > amount,
        exceededAmount
      }
    });
  } catch (error) {
    console.error("Set Monthly Budget Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving monthly budget"
    });
  }
};

const getMonthlyBudgetStatus = async (req, res) => {
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

    const budget = await budgetModule.getBudgetByUserMonthYear(userId, month, year);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Monthly budget not found"
      });
    }

    const spendingData = await reportModule.getMonthlyTotalExpense(userId, month, year);
    const totalSpending = Number(spendingData.total_spending);
    const budgetAmount = Number(budget.amount);
    const remainingBudget = budgetAmount - totalSpending;
    const exceededAmount = totalSpending > budgetAmount ? totalSpending - budgetAmount : 0;

    return res.status(200).json({
      success: true,
      data: {
        month,
        year,
        budgetAmount,
        totalSpending,
        remainingBudget,
        exceeded: totalSpending > budgetAmount,
        exceededAmount
      }
    });
  } catch (error) {
    console.error("Get Monthly Budget Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching monthly budget status"
    });
  }
};

const checkAndTriggerBudgetAlert = async (userId, month, year) => {
  const budget = await budgetModule.getBudgetByUserMonthYear(userId, month, year);

  if (!budget) {
    return;
  }

  const spendingData = await reportModule.getMonthlyTotalExpense(userId, month, year);
  const totalSpending = Number(spendingData.total_spending);
  const budgetAmount = Number(budget.amount);

  if (totalSpending <= budgetAmount) {
    return;
  }

  const exceededAmount = totalSpending - budgetAmount;
  const user = await userModule.getUserById(userId);

  if (!user) {
    return;
  }

  const title = "Budget Exceeded Warning";
  const message = `Your spending has exceeded your monthly budget by ₹${exceededAmount.toFixed(2)} for ${month}/${year}. Total spending: ₹${totalSpending.toFixed(2)}, Budget: ₹${budgetAmount.toFixed(2)}.`;

  await notificationModule.createNotification(userId, title, message);

  try {
    await sendEmail(
      user.email,
      "Budget Exceeded Warning",
      message,
      `<p>Hello ${user.name},</p>
       <p>Your monthly spending has exceeded your budget.</p>
       <p><strong>Month/Year:</strong> ${month}/${year}</p>
       <p><strong>Budget:</strong> ₹${budgetAmount.toFixed(2)}</p>
       <p><strong>Total Spending:</strong> ₹${totalSpending.toFixed(2)}</p>
       <p><strong>Exceeded By:</strong> ₹${exceededAmount.toFixed(2)}</p>
       <p>Please review your expenses.</p>`
    );
  } catch (emailError) {
    console.error("Budget Alert Email Error:", emailError);
  }
};

module.exports = {
  setMonthlyBudget,
  getMonthlyBudgetStatus,
  checkAndTriggerBudgetAlert
};