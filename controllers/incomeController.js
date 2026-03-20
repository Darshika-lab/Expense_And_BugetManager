const incomeModule = require("../modules/incomeModule");

const addIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    let { source, amount, income_date, description } = req.body;

    source = source.trim();
    amount = Number(amount);
    description = description ? description.trim() : null;

    const result = await incomeModule.createIncome(
      userId,
      source,
      amount,
      income_date,
      description
    );

    const income = await incomeModule.getIncomeByIdAndUserId(result.insertId, userId);

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: income
    });
  } catch (error) {
    console.error("Add Income Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding income"
    });
  }
};

const getAllIncomes = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await incomeModule.getAllIncomesByUserId(userId);
    const summary = await incomeModule.getIncomeSummaryByUserId(userId);

    return res.status(200).json({
      success: true,
      totalRecords: incomes.length,
      totalIncome: Number(summary.total_income),
      data: incomes
    });
  } catch (error) {
    console.error("Get All Incomes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching incomes"
    });
  }
};

const getIncomeById = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeId = Number(req.params.id);

    const income = await incomeModule.getIncomeByIdAndUserId(incomeId, userId);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: income
    });
  } catch (error) {
    console.error("Get Income By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching income"
    });
  }
};

const updateIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeId = Number(req.params.id);
    let { source, amount, income_date, description } = req.body;

    source = source.trim();
    amount = Number(amount);
    description = description ? description.trim() : null;

    const existingIncome = await incomeModule.getIncomeByIdAndUserId(incomeId, userId);

    if (!existingIncome) {
      return res.status(404).json({
        success: false,
        message: "Income record not found"
      });
    }

    await incomeModule.updateIncomeByIdAndUserId(
      incomeId,
      userId,
      source,
      amount,
      income_date,
      description
    );

    const updatedIncome = await incomeModule.getIncomeByIdAndUserId(incomeId, userId);

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: updatedIncome
    });
  } catch (error) {
    console.error("Update Income Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating income"
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeId = Number(req.params.id);

    const existingIncome = await incomeModule.getIncomeByIdAndUserId(incomeId, userId);

    if (!existingIncome) {
      return res.status(404).json({
        success: false,
        message: "Income record not found"
      });
    }

    await incomeModule.deleteIncomeByIdAndUserId(incomeId, userId);

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully"
    });
  } catch (error) {
    console.error("Delete Income Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting income"
    });
  }
};

module.exports = {
  addIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
};