import { useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CREATE_BUDGET } from "../../graphql/mutation/mutations";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ModalProps {
  setmodalOpen: (value: boolean) => void;
}
const ChooseDate: React.FC<ModalProps> = (props) => {
  const [budget, setbudget] = useState<string>("");
  const [budgetDate, setbudgetDate] = useState<string>();
  const [createBudget, { data, error }] = useMutation(CREATE_BUDGET);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (data) {
      alert("Budget created successfully");
      props.setmodalOpen(false);
    }
    if (error) {
      alert(error.message);
    }
  }, [data, error]);

  return (
    <div
      className="h-screen   w-full flex z-50 absolute top-0 left-0 justify-center items-center backdrop-blur-lg bg-[#00000024]"
      onClick={() => props.setmodalOpen(false)}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        className="w-[400px]  flex flex-col py-8 px-4 gap-4 items-center bg-white rounded-lg"
      >
        <Typography
          textAlign={"center"}
          mt={1}
          variant="h5"
          className="text-gray-600"
        >
          Create your monthly budget
        </Typography>
        <Box boxShadow={3} borderRadius={4} padding={2}>
          <Typography textAlign={"center"} className="text-gray-600">
            Choose your budget month and year
          </Typography>
          <Box width={"full"} mt={1}>
            <input
              value={budgetDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setbudgetDate(e.target.value);
                console.log(e.target.value);
              }}
              min={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}
              className="w-full outline-none border-violet-500  hover:bg-violet-100 rounded-lg px-3 py-1 border-2 cursor-pointer"
              type="month"
            />
          </Box>
        </Box>

        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
              setbudget(e.target.value);
            }
          }}
          id="budget"
          label="Budget"
          variant="outlined"
          type="number"
          required
          value={budget}
        />

        <Button
          onClick={() => {
            createBudget({
              variables: {
                userEmail: user?.email,
                budget: budget,
                date: budgetDate,
              },
            });
          }}
          variant="outlined"
          title="Create"
          fullWidth
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default ChooseDate;
