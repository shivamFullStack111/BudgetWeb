import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ExpensesType } from "../../types";
import React, { useEffect, useState } from "react";

interface TableProps {
  expenses: ExpensesType[];
}
const TableExpenses: React.FC<TableProps> = (props) => {
  const [rows, setrows] = useState<ExpensesType[]>([]);

  useEffect(() => {
    const updateExpenses: ExpensesType[] = props?.expenses?.map((exp) => ({
      ...exp,
      date: new Date(Number(exp.date)).toISOString().split("T")[0],
    }));
    setrows(updateExpenses);
  }, [props.expenses]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 240 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "category",
      headerName: "Category",
      width: 90,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "string",
      width: 90,
    },
  ];

  const paginationModel = { page: 0, pageSize: 4 };

  return (
    <>
      <div className="w-full h-full">
        <DataGrid
          
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[2, 3, 4]}
          checkboxSelection
          onRowSelectionModelChange={(e)=>{
            console.log(e)
          }}
          sx={{ border: 0 }}
          getRowId={({ _id }) => _id}
        />
      </div>
    </>
  );
};

export default TableExpenses;
