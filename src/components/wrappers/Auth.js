import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiChevronDown } from "react-icons/fi";
import PrivateNav from "../shared/PrivateNav";
import profilephoto from "../../assets/images/member.jpg";
import { supabase } from "../../helpers/supabaseClient";

const Auth = ({ children }) => {
	const { user, setUser } = useAuth();
	const [menu, setMenu] = React.useState(false);
	const {
		user_metadata: { first_name, last_name, avatar_url },
	} = user;
	const switchMenu = () => {
		setMenu(!menu);
	};
	const navigate = useNavigate();
	return (
		<section className="grid grid-cols-12">
			<PrivateNav />
			<main className="col-span-10 bg-gray-100 p-3">
				<section className="grid justify-end mb-4">
					<button
						className="flex justify-end items-center cursor-pointer"
						data-dropdown-toggle="dropdown"
						aria-labelledby="dropdownInformationButton"
						onClick={switchMenu}>
						<img
							className="block rounded-full h-8 w-8"
							// id="dropdown-toggle"
							src={avatar_url || profilephoto}
							alt="profile"
						/>
						<FiChevronDown className="text-gray-500 ml-2" />
					</button>
					<div
						id="dropdown"
						className={`${
							menu ? null : "hidden"
						} my-4 text-base absolute md:right-1 md:top-10 list-none z-50 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
						data-popper-reference-hidden=""
						data-popper-escaped=""
						data-popper-placement="top">
						<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
							<div></div>
							<div className="font-medium truncate">
								{first_name || "Your"} {last_name || "Name"}
							</div>
						</div>
						<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
							<li>
								<Link
									to="/profile"
									className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
									Profile
								</Link>
							</li>
						</ul>
						<div className="py-1">
							<Link
								onClick={async () => {
									const { error } =
										await supabase.auth.signOut();
									if (!error) {
										setUser(null);
										navigate("/", { replace: true });
									} else {
										console.log(error);
									}
								}}
								to="#"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
								Sign out
							</Link>
						</div>
					</div>
				</section>
				{children}
			</main>
		</section>
	);
};

export default Auth;
