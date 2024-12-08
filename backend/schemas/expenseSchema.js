const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userEmail: String,
    amount: String,
    title: String,
    description: String,
    budgetid: String,
    category: String,
    date: Date,
  },
  { timestamps: true }
);

const Expenses = mongoose.model("expenses", expenseSchema);
module.exports = Expenses;
