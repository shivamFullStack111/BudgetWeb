const mongoose = require("mongoose");

const bugetSchema = new mongoose.Schema({
  userEmail: String,
  budget: String,
  date: Date,
});

const Budgets = mongoose.model("budgets", bugetSchema);
module.exports = Budgets;
