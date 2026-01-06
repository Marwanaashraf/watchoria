import React from "react";
import { Navigate } from "react-router-dom";

export default function GuardRouting({ children }) {
  if (localStorage.getItem("user_token") !== null) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
