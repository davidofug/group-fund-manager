import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiChevronDown } from "react-icons/fi";
import PrivateNav from "../shared/PrivateNav";
import supabase from "../helpers/supabase";
import { toggleDropdown } from "../helpers/functions";
import profilephoto from "../../assets/images/member.jpg";

const Auth = ({ children }) => {
	return (
		<section className="grid grid-cols-12" onClick={toggleDropdown}>
			<PrivateNav />
			<main className="col-span-10 bg-gray-100 p-3">
				<section className="grid justify-end">
					<section className="relative">
						<div className="flex items-center space-between cursor-pointer">
							<img
								className="block rounded-full h-8 w-8"
								id="dropdown-toggle"
								src={profilephoto}
								alt="profile"
							/>
							<FiChevronDown className="text-gray-500" />
						</div>
						<div
							id="dropdown"
							className={`hidden absolute mt-2 right-1 z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
							data-popper-reference-hidden=""
							data-popper-escaped=""
							data-popper-placement="top">
							<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
								<div></div>
								<div className="font-medium truncate">
									name@flowbite.com
								</div>
							</div>
							<ul
								className="py-1 text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownInformationButton">
								<li>
									<a
										href="#"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Profile
									</a>
								</li>
							</ul>
							<div className="py-1">
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
									Sign out
								</a>
							</div>
						</div>
					</section>
				</section>
				{children}
			</main>
		</section>
	);
};

export default Auth;
