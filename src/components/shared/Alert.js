import React from "react";

const Alert = ({ type, message, ...rest }) => {
	if (type === "success") {
		return (
			<section
				className="p-2 min-w-1/2 mx-auto my-3 rounded-md bg-green-500 text-white font-bold"
				{...rest}>
				{message}
			</section>
		);
	}
	if (type === "error") {
		return (
			<section
				className="p-2 min-w-1/2 mx-auto my-3 rounded-md bg-red-500 text-white font-bold"
				{...rest}>
				{message}
			</section>
		);
	}

	return (
		<section className="p-2 min-w-1/2 mx-auto my-3 rounded-md" {...rest}>
			{message}
		</section>
	);
};

export default Alert;
