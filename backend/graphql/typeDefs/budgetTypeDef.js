const budgetTypeDef = `

  type User {
     _id:ID
     name:String!
     email:String!
     password:String!
     token:String
  }
  type Budget {
      _id:ID
      userEmail: String!
      budget: String!
      date: String!
      user:User
  }

  type Mutation {
    createBudget(userEmail:String!,budget:String!,date:String!):Budget
  }
  
  type Query {
    getAllBudgetOfUser(userEmail:String!):[Budget]
    getBudgetById(budgetid:String):Budget
  }
`;

module.exports = { budgetTypeDef };
