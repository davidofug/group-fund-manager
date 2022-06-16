import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

const Alert = ({ type, title, message, float, setStatus, status, ...rest }) => {
	if (type === "success") {
		return (
			<section
				className={`w-1/3 block px-2 py-1 rounded-sm border-t-4 bg-white border-green-500 text-gray-800 ${
					float &&
					"absolute z-50 top-5 inset-x-1/3 shadow-lg animate-bounce-short"
				}`}
				{...rest}>
				<h1 className="font-black text-md flex items-center justify-between">
					<span className="flex items-center">
						<BsCheckSquareFill
							size="20"
							className="text-green-800 mr-3"
						/>{" "}
						{title}
					</span>
					<IoCloseOutline
						size="40"
						className="cursor-pointer"
						onClick={() => setStatus(!status)}
					/>
				</h1>
				<article className="bg-white py-3">{message}</article>
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
