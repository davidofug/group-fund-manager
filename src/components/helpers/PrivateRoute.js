import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user?.user_metadata?.roles?.find((role) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unathorized"  />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
    )
  )
}

export default PrivateRoute;
