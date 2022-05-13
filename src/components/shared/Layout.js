import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
	/* 	const { user, setUser } = useAuth();
	React.useEffect(() => {
		const user = supabase.auth.user();
		setUser(user);
	}); */
	return <Outlet />;
};
export default Layout;
