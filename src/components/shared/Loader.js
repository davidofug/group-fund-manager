import React from "react";
import { Ellipsis } from "./Preloaders/Loaders";
const Loader = ({ type, title, body }) => {
	return (
		<div
			className={`${
				type === "overlay" &&
				"absolute top-0 left-0 z-10 w-full min-h-screen"
			} flex flex-col items-center justify-center h-screen bg-myblue/80 text-white`}>
			<div className="text-center">
				<div className="text-3xl font-bold">{title}</div>
				<div className="text-2xl">{body}</div>
				<Ellipsis />
			</div>
		</div>
	);
};

export default Loader;
