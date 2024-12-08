import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Home from "./screens/home/Home";
import Protected from "./protectedRoutes/Protected";
import Public from "./protectedRoutes/Public";
import { useQuery } from "@apollo/client";
import { CHECK_AUTHENTICATION } from "./graphql/query/query";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { AppDispatch } from "./store/store";
import BudgetDashboard from "./screens/budgetDashboard/BudgetDashboard";

const App: React.FC = () => {
  const { data, loading } = useQuery(CHECK_AUTHENTICATION);
  const dispatch = useDispatch<AppDispatch>();

  if (loading) return "Loading...";

  if (data) {
    dispatch(setUser(data?.cheackAuthentication));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              {" "}
              <Home />
            </Protected>
          }
        />
        <Route
          path="/budget/:budgetid"
          element={
            <Protected>
              {" "}
              <BudgetDashboard />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
