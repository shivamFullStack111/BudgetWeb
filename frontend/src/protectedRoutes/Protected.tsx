import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const Protected: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user,loading } = useSelector((state: RootState) => state.user);
  if(loading) return "Loading...";
  if (user) {
    return children;
  } else {
    return <Navigate to="/login"/>;
  }
};
export default Protected;
