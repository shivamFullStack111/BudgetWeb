import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query ($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      name
      email
      token
    }
  }
`;

export const CHECK_AUTHENTICATION = gql`
  query {
    cheackAuthentication {
      name
      email
    }
  }
`;

export const GETALL_BUDGET_OF_USER = gql`
  query ($userEmail: String!) {
    getAllBudgetOfUser(userEmail: $userEmail) {
      _id
      budget
      date
    }
  }
`;

export const GET_ALL_EXPENSES_OF_USER = gql`
  query ($budgetid: String) {
    getAllExpensesOfUser(budgetid: $budgetid) {
      _id
      amount
      budgetid
      userEmail
      title
      description
      category
      date
      createdAt
    }
  }
`;

export const GET_BUDGET_BY_ID = gql`
  query ($budgetid: String) {
    getBudgetById(budgetid: $budgetid) {
      _id
      userEmail
      budget
      date
    }
  }
`;
