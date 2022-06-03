import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ allowedRoles }) {
	const { user } = useAuth();
	const location = useLocation();

	return allowedRoles?.includes(Number(user?.user_metadata?.role)) ? (
		<Outlet />
	) : user ? (
		<Navigate to="/not-authorized" replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

export default PrivateRoute;
