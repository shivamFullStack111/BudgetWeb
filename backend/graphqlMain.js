const { budgetResolver } = require("./graphql/resolvers/budgetResolver");
const expenseResolver = require("./graphql/resolvers/expenseResolver");
const { userResolver } = require("./graphql/resolvers/userResolver");
const { budgetTypeDef } = require("./graphql/typeDefs/budgetTypeDef");
const expenseTypeDef = require("./graphql/typeDefs/expenseTypeDef");

const userTypeDef = require("./graphql/typeDefs/userTypeDef");

const resolver = {
  Query: {
    ...userResolver.Query,
    ...budgetResolver?.Query,
    ...expenseResolver?.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...budgetResolver.Mutation,
    ...expenseResolver?.Mutation,
  },
};
const typedef = `
  ${userTypeDef}
  ${budgetTypeDef}
  ${expenseTypeDef}
`;
module.exports = {
  resolver,
  typedef,
};
