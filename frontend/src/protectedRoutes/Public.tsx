import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const Public: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  if (loading) return "Loading...";
  if (!user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default Public;
