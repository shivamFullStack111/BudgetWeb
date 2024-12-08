const expenseTypeDef = `
    type Expense {
      _id: ID
      userEmail:String
      budgetid:String!
      amount:Int!
      title:String!
      description:String!
      category:String!
      date:String!
      createdAt:String!
    }


    
    type Mutation {
      createExpense(userEmail:String,budgetid:String,amount:Int,title:String,description:String,category:String,date:String):Expense
    }

    type Query {
      getAllExpensesOfUser(budgetid:String):[Expense]
    }
    
`;
module.exports = expenseTypeDef;
