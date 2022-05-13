import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Layout from "./shared/Layout";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import NotAuthorized from "./pages/NotAuthorized";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups/Index";
import AddGroup from "./pages/Groups/Add";
import Transactions from "./pages/Transactions/Index";
import AddTransaction from "./pages/Transactions/Add";
import Members from "./pages/Members/Index";
import AddMember from "./pages/Members/Add";
import Settings from "./pages/Settings";

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
					<Route path="/transactions" element={<PrivateRoute />}>
						<Route index element={<Transactions />} />
						<Route path="add" element={<AddTransaction />} />
					</Route>
					<Route path="/groups" element={<PrivateRoute />}>
						<Route index element={<Groups />} />
						<Route path="add" element={<AddGroup />} />
					</Route>
					<Route path="/members" element={<PrivateRoute />}>
						<Route index element={<Members />} />
						<Route path="add" element={<AddMember />} />
					</Route>
					<Route path="/settings" element={<Settings />} />
					<Route path="*" element={<Missing />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MyRouter;
