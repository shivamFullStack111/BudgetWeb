import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GET_ALL_EXPENSES_OF_USER,
  GET_BUDGET_BY_ID,
} from "../../graphql/query/query";
import { IoHome } from "react-icons/io5";
import logo from "../../images/logo.png";
import BudgetHome from "./BudgetHome";

// import {IoHome} from 'react-icons'
const BudgetDashboard: React.FC = () => {
  const [getExpenses, { data }] = useLazyQuery(GET_ALL_EXPENSES_OF_USER);
  const [getBudget, { data: budget }] = useLazyQuery(GET_BUDGET_BY_ID);

  const param = useParams<{ budgetid: string }>();

  useEffect(() => {
    if (param.budgetid) {
      getBudget({
        variables: {
          budgetid: param.budgetid,
        },
      });
    }
  }, [param.budgetid, getBudget]);

  useEffect(() => {
    if (param.budgetid)
      getExpenses({
        variables: {
          budgetid: param.budgetid,
        },
      });
  }, [param.budgetid, getExpenses]);

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="h-full w-[60px]  flex py-6 bg-violet-100 flex-col items-center gap-4 ">
        <div className="w-full flex justify-center py-2 border-l-4 border-violet-500">
          <IoHome className="text-violet-500 text-2xl" />
        </div>
      </div>
      <div className=" w-full  bg-gray-100 h-screen  overflow-y-scroll ">
        <div className="w-full h-16 bg-[#ffffff43] items-center px-[50px] flex justify-between shadow-md fixed top-0   backdrop-blur-xl">
          <img src={logo} className="h-10 w-10" alt="" />
        </div>
        <div className="mt-20 w-full px-[50px] ">
          <BudgetHome
            budget={budget?.getBudgetById}
            expenses={data?.getAllExpensesOfUser}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
