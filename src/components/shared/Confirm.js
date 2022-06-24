import React from "react";

const Confirm = ({
	title,
	message,
	setStatus,
	status,
	executeProcess,
	id,
	...rest
}) => {
	const handleCancel = () => {
		setStatus(false);
	};

	const handleOk = () => {
		setStatus(false);
		executeProcess(id);
	};

	return (
		<section
			className={`w-1/3 block rounded-sm bg-white text-gray-800 absolute z-50 top-5 inset-x-1/3 shadow-lg animate-bounce-short`}
			{...rest}>
			<header className="bg-red-500 text-white p-2">
				<h1 className="font-black text-lg">
					{title || "Please confirm"}
				</h1>
			</header>

			<article className="bg-white p-3">{message}</article>
			<footer className="pb-2 px-2 flex gap-2 justify-end">
				<button
					onClick={handleCancel}
					className="border border-gray-400 text-gray-700 hover:text-gray-800 hover:border-gray-500 font-bold py-1 px-4 rounded-full">
					Cancel
				</button>
				<button
					onClick={handleOk}
					className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-4 rounded-full">
					Ok
				</button>
			</footer>
		</section>
	);
};

export default Confirm;
