import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Layout from "./shared/Layout";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups/Index";
import AddGroup from "./pages/Groups/Add";
import Transactions from "./pages/Transactions/Index";
import AddTransaction from "./pages/Transactions/Add";
import Members from "./pages/Members/Index";
import AddMember from "./pages/Members/Add";
import Profile from "./pages/Members/Profile";
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
					<Route
						path="/dashboard"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Dashboard />} />
					</Route>
					<Route
						path="/profile"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Profile />} />
					</Route>
					<Route
						path="/transactions"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Transactions />} />
						<Route path="add" element={<AddTransaction />} />
					</Route>
					<Route
						path="/groups"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Groups />} />
						<Route path="add" element={<AddGroup />} />
					</Route>
					<Route
						path="/members"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Members />} />
						<Route path="add" element={<AddMember />} />
					</Route>
					<Route
						path="/settings"
						element={<PrivateRoute allowedRoles={[1, 2, 3, 4]} />}>
						<Route index element={<Settings />} />
					</Route>
					<Route path="*" element={<Missing />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MyRouter;
