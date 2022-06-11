import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NotAuthorized from "./NotAuthorized";
function PrivateRoute({ allowedRoles }) {
	const { user } = useAuth();
	// console.log(user);
	const location = useLocation();
	// console.log(allowedRoles);

	if (user) {
		const {
			user_metadata: { role },
		} = user;
		if (
			allowedRoles !== "undefined" &&
			allowedRoles?.includes(Number(role))
		)
			return <Outlet />;

		return <NotAuthorized />;
		/* 		if (!allowedRoles?.includes(Number(role)))
			return (
				<Navigate
					to="/not-authorized"
					state={{ from: location }}
					replace
				/>
			); */
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
}

export default PrivateRoute;
