import React from "react";
import AuthWrapper from "../../wrappers/Auth";
import { Link } from "react-router-dom";
const Index = () => {
	return (
		<AuthWrapper>
			<h1>
				Members{" "}
				<Link
					to="/members/add"
					className="bg-blue-500 rounded-full px-3 py-1 text-white hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
					Add
				</Link>
			</h1>
		</AuthWrapper>
	);
};

export default Index;
