import MyRouter from "./components/MyRouter";
import { AuthProvider } from "./components/helpers/AuthProvider";
import ErrorBoundary from "./components/shared/ErrorBoundary";
function App() {
	return (
		<AuthProvider>
			<ErrorBoundary>
				<MyRouter />
			</ErrorBoundary>
		</AuthProvider>
	);
}

export default App;
