import { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const CustomerProtectedRoute = ({ path, element, children }) => {
  const isAuthenticated = localStorage.getItem("customer")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("customer")
   
  });


  return isAuthenticated ? <Outlet /> : <Navigate to="/customer" />;
   
};

export default CustomerProtectedRoute;
