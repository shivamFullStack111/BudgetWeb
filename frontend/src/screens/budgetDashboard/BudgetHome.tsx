import React, { useEffect, useState } from "react";
import { MdOutlineTrendingUp } from "react-icons/md";
import PieChart from "./PieChart";
import TableExpenses from "./TableExpenses";
import AddExpenseModal from "./AddExpenseModal";
import { BudgetType, ExpensesType } from "../../types";

interface HomeProps {
  expenses: ExpensesType[];
  budget: BudgetType;
}

interface ObjectType {
  [key: string]: number;
}

const BudgetHome: React.FC<HomeProps> = (props) => {
  const [newExpenseModalOpen, setnewExpenseModalOpen] =
    useState<boolean>(false);
  const [sortedObjectByCategoryExpense, setsortedObjectByCategoryExpense] =
    useState<[string, number][]>();
  const totalExpenses = props?.expenses?.reduce(
    (total: number, exp: ExpensesType) => (total += exp.amount),
    0
  );

  useEffect(() => {
    const newObject: ObjectType = {};

    props?.expenses?.forEach((exp: ExpensesType) => {
      if (!newObject[exp?.category]) {
        newObject[exp?.category] = exp?.amount;
      } else {
        newObject[exp?.category] += exp?.amount;
      }
    });
    const sortedArray = Object.entries(newObject).sort((a, b) => b[1] - a[1]);
    console.log(sortedArray);
    setsortedObjectByCategoryExpense(sortedArray);
  }, [props.expenses]);

  return (
    <div className="w-full">
      {newExpenseModalOpen && (
        <AddExpenseModal budget={props.budget} setnewExpenseModalOpen={setnewExpenseModalOpen} />
      )}
      <div className=" items- grid grid-rows-3  grid-cols-3 gap-4">
        {/* box 1  */}
        <div className="w-full  rounded-lg shadow-xl bg-white py-4 h-40 shadow-blue-200 px-4 ">
          <h5 className="text-lg font-semibold text-gray-600">Summary</h5>
          <div className="flex justify-between items-center ">
            <h5 className="font-semibold text-gray-500">Budget</h5>
            <h5 className="text-green-500">
              ${props?.budget?.budget}{" "}
              <MdOutlineTrendingUp className="bg-green-200 p-1 inline rounded-md text-3xl" />
            </h5>
          </div>
          <div className="flex justify-between items-center  mt-2">
            <h5 className="font-semibold text-gray-500">Expenses</h5>
            <h5 className="text-red-500">
              -${totalExpenses}{" "}
              <MdOutlineTrendingUp className="bg-red-200 p-1 inline rounded-md text-3xl" />
            </h5>
          </div>
          <p className="w-full h-[2px] bg-slate-400 my-1"></p>
          <div className="flex justify-end items-center  mt-2">
            <h5
              className={` ${
                props?.budget?.budget - totalExpenses > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ${props?.budget?.budget - totalExpenses}{" "}
            </h5>
          </div>
        </div>
        {/* box 2  */}
        <div className="w-full flex flex-col gap-1  rounded-lg shadow-xl bg-white py-4 h-40 shadow-blue-200 px-4 ">
          <h5 className="text-lg font-semibold text-gray-600">
            Top 3 Expenses Category
          </h5>

          {sortedObjectByCategoryExpense
            ?.slice(0, 3)
            .map((ex: [string, number], i: number) => (
              <div
                key={i}
                className="flex justify-between items-center mt-[1px] "
              >
                <h5 className="font-semibold text-gray-500">{ex[0]}</h5>
                <h5 className="text-red-500">-${ex[1]} </h5>
              </div>
            ))}

         
        </div>
        {/* box 3  */}
        <div className="w-full  rounded-lg shadow-xl bg-white py-4 row-span-3 shadow-blue-200 px-4 ">
          <h5 className="text-lg font-semibold text-gray-600">Expenses</h5>
          <div className="p-7">
            {" "}
            <PieChart expenses={props?.expenses} />
          </div>
        </div>
        {/* box 4  */}
        <div className="w-full col-span-2 row-span-2  overflow-y-scroll h-full rounded-lg shadow-xl bg-white  shadow-blue-200 px-4 ">
          <div className="flex justify-between p-3 items-center">
            <h5 className="text-lg  font-semibold text-gray-600">
              Top 3 Expenses Category
            </h5>
            <div
              onClick={() => setnewExpenseModalOpen(true)}
              className="px-4 cursor-pointer h-min py-[6px] rounded-md bg-violet-500 text-white hover:bg-violet-400 flex justify-center items-center"
            >
              Add new expense
            </div>
          </div>
          <TableExpenses expenses={props.expenses}></TableExpenses>
        </div>
      </div>
    </div>
  );
};

export default BudgetHome;
