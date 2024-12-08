export interface USER {
  name: string;
  email: string;
  token: string;
}

export interface ExpensesType {
  _id: string;
  userEmail: string;
  budgetid: string;
  amount: number;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  date: string;
}

export interface BudgetType {
  _id: string;
  userEmail: string;
  budget: number;
  date: string;
  createdAt: string;
}
