import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
function PublicNav() {
	return (
		<nav className="flex items-center justify-between flex-wrap py-6 xs:mx-5 ">
			<Link to="/" className="flex items-center flex-shrink-0 mr-4">
				<Logo className="w-8 h-8 mr-1" />
				<span className="font-bold text-xl tracking-tight text-black dark:text-gray-100">
					Group Fund Manager
				</span>
			</Link>
			<div className="md:hidden">
				<button className="flex items-center px-3 py-2 bg-black text-white hover:text-white hover:bg-blue">
					<svg
						className="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div className="hidden w-full flex-grow md:flex md:items-center md:w-auto">
				<div className="text-xl flex md:flex-grow space-x-8 justify-center">
					<Link
						to="/"
						className="dark:text-gray-100 text-black hover:text-blue">
						Home
					</Link>
					<Link
						to="/"
						className="dark:text-gray-100 text-black hover:text-blue">
						About
					</Link>
					<Link
						to="/"
						className="dark:text-gray-100 text-black hover:text-blue">
						FAQs
					</Link>
				</div>
				<Link
					to="/login"
					className="hidden md:block px-6 py-2 text-xl bg-blue rounded-full text-white transition duration-300 dark:bg-black dark:border-white dark:text-light-gray hover:-translate-y-1 hover:bg-blue dark:hover:text-white dark:hover:bg-black dark:hover:border-blue">
					Login
				</Link>
			</div>
		</nav>
	);
}

export default PublicNav;
