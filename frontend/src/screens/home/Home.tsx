import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import ChooseDate from "./ChooseDate";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GETALL_BUDGET_OF_USER } from "../../graphql/query/query";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);

  const [getUserBudets, { data }] = useLazyQuery(GETALL_BUDGET_OF_USER);

  useEffect(() => {
    if (user) {
      getUserBudets({
        variables: {
          userEmail: user?.email,
        },
      });
    }
  }, [user,getUserBudets]);

  return (
    <div className="flex flex-col px-[121px]">
      {modalOpen && <ChooseDate setmodalOpen={setmodalOpen} />}
      <div className="flex justify-between  px-[121px] fixed w-full left-0  top-0 backdrop-blur-md py-4 ">
        <img src={logo} className="h-10 w-10 " />
        <div
          onClick={() => setmodalOpen(true)}
          className="px-4 py-[6px]  cursor-pointer  rounded-lg bg-violet-100  border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:border-white hover:text-white "
        >
          Create budget
        </div>
      </div>
      <div className="mt-20">
        <Table data={data?.getAllBudgetOfUser} />
      </div>
    </div>
  );
};

export default Home;

interface Budget {
  _id: string;
  userEmail: string;
  budget: string;
  date: string;
}

interface TableProps {
  data: Budget[];
}
const Table: React.FC<TableProps> = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="border border-gray-400 bg-violet-500 text-white">
            BUDGET ID
          </th>
          <th className="border border-gray-400 bg-violet-500 text-white">
            MONTH
          </th>
          <th className="border border-gray-400 bg-violet-500 text-white">
            YEAR
          </th>
          <th className="border border-gray-400 bg-violet-500 text-white">
            BUDGET
          </th>
          <th className="border border-gray-400 bg-violet-500 text-white">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((budget: Budget) => {
          return (
            <tr>
              <td className="text-center border border-violet-500 py-1">
                #{budget?._id}
              </td>
              <td className="text-center border border-violet-500 py-1">
                {new Date(Number(budget.date)).getMonth() + 1}
              </td>
              <td className="text-center border border-violet-500 py-1">
                {new Date(Number(budget.date)).getFullYear() + 1}
              </td>
              <td className="text-center border border-violet-500 py-1">
                ₹{budget?.budget}
              </td>
              <td className="border border-l-0 border-violet-500 py-1">
                <div className="flex justify-center items-center gap-2 w-full h-full">
                  <Button size="small" variant="contained" color={"error"}>
                    Delete
                  </Button>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  <Link to={`budget/${budget._id}`}>
                    <Button size="small" variant="text" color="secondary">
                      {"View"}
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
