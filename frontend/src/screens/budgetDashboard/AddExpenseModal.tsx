import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_EXPENSE } from "../../graphql/mutation/mutations";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BudgetType } from "../../types";

interface Props {
  setnewExpenseModalOpen: (value: boolean) => void;
  budget: BudgetType;
}

const AddExpenseModal: React.FC<Props> = (props) => {
  // State management
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [createExpense] = useMutation(CREATE_EXPENSE);
  const param = useParams();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Collect data and handle form submission
    const expenseData = {
      title,
      description,
      amount,
      category,
      date,
      budgetid: param.budgetid,
      userEmail: user?.email,
    };

    createExpense({ variables: expenseData });

    props.setnewExpenseModalOpen(false);
  };

  const getMaximunDate = () => {
    const year = new Date(Number(props?.budget?.date)).getFullYear();
    const month = new Date(Number(props?.budget?.date)).getMonth();

    const maxDate = `${new Date(
      Number(props?.budget?.date)
    ).getFullYear()}-${String(
      new Date(Number(props?.budget?.date)).getMonth() + 1
    ).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;
    console.log(maxDate);
    return maxDate;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 transform transition-transform duration-300 ease-in-out scale-95">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Expense
        </h2>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Amount Field */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
          </div>
          {/* Date Field */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              min={`${new Date(
                Number(props?.budget?.date)
              ).getFullYear()}-${String(
                new Date(Number(props?.budget?.date)).getMonth() + 1
              ).padStart(2, "0")}-01`}
              max={getMaximunDate()}
              id="date"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Category Field */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategory(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="">Select a category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => props.setnewExpenseModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:ring focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:ring focus:ring-blue-500"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
