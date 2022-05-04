import React from 'react'
import { Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PrivateNav from "./PrivateNav";
import supabase from "../helpers/supabase";

const Layout = () => {
	const { user, setUser } = useAuth();
	React.useEffect(() => {
		const user = supabase.auth.user();
		setUser(user);
	  }, []);

	if (user)
		return (
			<section className="grid grid-cols-12">
				<PrivateNav />
				<main className="col-span-10 bg-gray-100">
					<Outlet />
				</main>
			</section>
		);

	return (
		<section className="bg-gray-50 light:text-gray-300 dark:bg-black dark:text-gray-300">
			<Outlet />
		</section>
	);
};
export default Layout;
