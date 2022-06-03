import React from "react";
import { FiActivity, FiSettings } from "react-icons/fi";
import { FaPiggyBank, FaLayerGroup, FaUserPlus } from "react-icons/fa";
// import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
// import PrivateLink from "./PrivateLink";
import Logo from "./Logo";

function PrivateNav() {
	// const navigate = useNavigate();
	// const { user, setUser } = useAuth();

	return (
		<aside
			className="flex flex-col overflow-y-auto min-h-screen shadow-md col-span-2 border-r border-gray-200"
			aria-label="Sidebar">
			<div className="py-2 flex-none border-b border-gray-100">
				<Logo width="32" height="32" title="Group Fund Manager" />
			</div>
			<ul className="list-reset flex flex-col flex-auto m-5 space-y-1.5">
				<li>
					<Link
						to="/dashboard"
						className="flex items-center p-2 hover:bg-gray-100 hover:rounded ">
						<FiActivity />
						<span className="ml-3">Dashboard</span>
					</Link>
				</li>
				<li>
					<Link
						to="/transactions"
						className="flex items-center p-2 hover:bg-gray-100 hover:rounded ">
						<FaPiggyBank />
						<span className="ml-3">Transactions</span>
					</Link>
				</li>
				<li>
					<Link
						to="/groups"
						className="flex items-center p-2 hover:bg-gray-100 hover:rounded ">
						<FaLayerGroup />
						<span className="ml-3">Groups</span>
					</Link>
				</li>
				<li>
					<Link
						to="/members"
						className="flex items-center p-2 hover:bg-gray-100 hover:rounded ">
						<FaUserPlus />
						<span className="ml-3">Members</span>
					</Link>
				</li>
			</ul>
			<ul className="list-reset m-5 pt-3 border-t border-gray-100 flex-none">
				<li>
					<Link
						to="/settings"
						className="flex items-center p-2 hover:bg-gray-100 hover:rounded ">
						<FiSettings />
						<span className="ml-3">Settings</span>
					</Link>
				</li>
			</ul>
		</aside>
	);
}

export default PrivateNav;
