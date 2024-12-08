const Budgets = require("../../schemas/budgetSchema");

const budgetResolver = {
  Mutation: {
    createBudget: async (_, { userEmail, budget, date }) => {
      console.log(userEmail, budget, date);

      const isBudgetExist = await Budgets.findOne({
        userEmail: userEmail,
        date: new Date(date),
      });

      if (isBudgetExist) {
        throw new Error("budget already set for this month ");
      }

      const newBudget = new Budgets({
        userEmail,
        budget,
        date: new Date(date),
      });

      await newBudget.save();

      return newBudget;
    },
  },
  Query: {
    getAllBudgetOfUser: async (_, { userEmail }) => {
      const budgets = await Budgets.find({ userEmail });
      return budgets;
    },
    getBudgetById: async (_, { budgetid }) => {
      console.log(budgetid, "[[[[[[[[[");
      return await Budgets.findOne({ _id: budgetid });
    },
  },
};

module.exports = { budgetResolver };
