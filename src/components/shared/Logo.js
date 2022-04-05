import React from "react";
const Logo = ({ title, ...rest }) => {
	return (
		<div className="flex justify-center items-center">
			<img
				src={process.env.PUBLIC_URL + "/logo512.png"}
				alt="Logo"
				{...rest}
			/>{" "}
			{title}
		</div>
	);
};

export default Logo;
