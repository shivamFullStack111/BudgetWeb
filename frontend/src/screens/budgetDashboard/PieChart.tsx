import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ExpensesType } from "../../types";
import React, { useEffect, useState } from "react";
import { Categories } from "../../utils";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CharProps {
  expenses: ExpensesType[];
}

const PieChart: React.FC<CharProps> = (props) => {
  const [allKeys, setallKeys] = useState<string[]>([]);
  const [allValues, setallValues] = useState<number[]>([]);

  useEffect(() => {
    if (props?.expenses?.length) {
      // const sortedArray = [...(props?.expenses ?? [])] // Create a copy of the array
      //   .sort((a, b) => a?.category?.localeCompare(b?.category));

      const groupedArry: {
        [key: string]: number;
      } = {};

      props?.expenses?.forEach((item) => {
        if (groupedArry[item?.category]) {
          groupedArry[item?.category] += item?.amount;
        } else {
          groupedArry[item?.category] = item?.amount;
        }
      });

      console.log(groupedArry);
      const keys = Object.keys(groupedArry);
      const values = Object.values(groupedArry);
      console.log(keys, values);

      setallKeys(keys);
      setallValues(values);

      // const groupedArray = sortedArray.
    }
  }, [props.expenses]);

  const data = {
    // labels: ["Series A", "Series B", "Series C"],
    labels: allKeys,
    datasets: [
      {
        label: "Expense",
        data: allValues, // Data values
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(83, 200, 86, 0.6)", // Yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(83, 200, 86, 1)", // Yellow
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Pie className="w-full " data={data} options={{ ...options }} />
    </div>
  );
};

export default PieChart;
