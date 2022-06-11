import React from "react";
import AuthWrapper from "../wrappers/Auth";
import { Helmet } from "react-helmet";
const NotAuthorized = () => {
	return (
		<AuthWrapper>
			<Helmet>
				<title>Not Authorized</title>
			</Helmet>
			<h1>Unauthorized</h1>
		</AuthWrapper>
	);
};

export default NotAuthorized;
