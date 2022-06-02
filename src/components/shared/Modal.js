import React from "react";
import { FiX } from "react-icons/fi";
const Modal = ({ title, children, status, setStatus, closeIcon, ...rest }) => {
	const closeOnEscKey = (e) => {
		if ((e.keyCode || e.charCode) === 27 || e.key === "Escape") {
			setStatus(false);
		}
	};
	React.useEffect(() => {
		document.addEventListener("keydown", closeOnEscKey);
		return () => {
			document.removeEventListener("keydown", closeOnEscKey);
		};
	}, []);
	if (status)
		return (
			<section
				onClick={() => setStatus(false)}
				className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center flex-col bg-[#000]/80">
				<article
					onClick={(e) => e.stopPropagation()}
					className="bg-white w-auto max-w-lg border rounded-md">
					<header className="flex justify-between items-center p-2 border-b">
						<span>{title}</span>
						<span
							className="cursor-pointer ml-3 text-red-700 hover:text-red-400"
							onClick={() => setStatus(false)}>
							<FiX />
						</span>
					</header>
					<main {...rest} className="p-4">
						{children}
					</main>
				</article>
			</section>
		);
	return null;
};

export default Modal;
