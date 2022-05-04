import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import AddMember from "./AddMember";
import AddGroup from "./AddGroup";
import AddTransaction from "./AddTransaction";
import Missing from "./Missing";
import Layout from "./shared/Layout";

const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="/" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/add-member" element={<AddMember />} />
                    <Route path="/add-group" element={<AddGroup />} />
                    <Route path="/add-transaction" element={<AddTransaction />} />
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default MyRouter;