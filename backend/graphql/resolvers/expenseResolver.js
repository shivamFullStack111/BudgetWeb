const Expenses = require("../../schemas/expenseSchema");

const expenseResolver = {
  Query: {
    getAllExpensesOfUser: async (_, { budgetid }) => {
      const expenses = await Expenses.find({ budgetid });
      return expenses;
    },
  },
  Mutation: {
    createExpense: async (_, data) => {
      console.log(data);
      const { userEmail, budgetid, amount, title, description, category,date } =
        data;
      const expense = new Expenses({
        userEmail,
        budgetid,
        amount,
        title,
        description,
        category,
        date
      });

      await expense.save();

      return expense;
    },
  },
};

module.exports = expenseResolver;
