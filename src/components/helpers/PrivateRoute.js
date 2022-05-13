import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
function PrivateRoute({ allowedRoles }) {
	const { user } = useAuth();
	const location = useLocation();

	if (user) {
		if (
			allowedRoles &&
			!user?.user_metadata?.roles?.find((role) =>
				allowedRoles?.includes(role)
			)
		) {
			return <Navigate to="/not-authorized" />;
		} else if (!allowedRoles) {
			return <Outlet />;
		}
	}

	return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
