import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation CREATE_USER($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`;

export const CREATE_BUDGET = gql`
  mutation ($userEmail: String!, $budget: String!, $date: String!) {
    createBudget(userEmail: $userEmail, budget: $budget, date: $date) {
      budget
      date
      userEmail
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation (
    $userEmail: String
    $budgetid: String
    $amount: Int
    $title: String
    $description: String
    $category: String
    $date:String
  ) {
    createExpense(
      userEmail: $userEmail
      budgetid: $budgetid
      amount: $amount
      title: $title
      description: $description
      category: $category
      date: $date
    ) {
      userEmail
      budgetid
      amount
      title
      description
      category
      date
    }
  }
`;
