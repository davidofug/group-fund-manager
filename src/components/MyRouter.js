import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import NotAuthorized from "./NotAuthorized";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions/Index";
import AddMember from "./AddMember";
import AddGroup from "./AddGroup";
import AddTransaction from "./AddTransaction";
import Settings from "./Settings";
import Missing from "./Missing";
import Layout from "./shared/Layout";

const MyRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route path="/not-authorized" element={<PrivateRoute />}>
						<Route element={<NotAuthorized />} />
					</Route>
					<Route path="/dashboard" element={<PrivateRoute />}>
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="/add-member" element={<AddMember />} />
					<Route path="/add-group" element={<AddGroup />} />
					<Route path="/transactions" element={<PrivateRoute />}>
						<Route index element={<Transactions />} />
					</Route>
					<Route path="/settings" element={<Settings />} />
					<Route path="*" element={<Missing />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MyRouter;
