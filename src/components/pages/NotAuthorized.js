import React from "react";
import AuthWrapper from "../wrappers/Auth";

const NotAuthorized = () => {
	return (
		<AuthWrapper>
			<h1>Unauthorized</h1>
		</AuthWrapper>
	);
};

export default NotAuthorized;
