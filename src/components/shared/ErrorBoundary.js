import React from "react";
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error.toString() };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo);
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<section className="flex justify-center items-center my-5 min-h-screen">
					<section className="flex flex-col space-y-2 items-center bg-red-500 max-w-2xl p-5 rounded-sm text-white">
						<h1 className="text-xl font-bold my-2">
							Something went wrong.
						</h1>
						<article className="text-md">
							{JSON.stringify(this.state.error, null, 2)}
						</article>
					</section>
				</section>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
