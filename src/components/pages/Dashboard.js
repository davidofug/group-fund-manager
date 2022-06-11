import React from "react";
import AuthWrapper from "../wrappers/Auth";
import { Helmet } from "react-helmet";
const Dashboard = () => {
	return (
		<AuthWrapper>
			<Helmet>
				<title>GFM - Dashboard</title>
			</Helmet>
			<h1>Dashboard</h1>
		</AuthWrapper>
	);
};

export default Dashboard;
