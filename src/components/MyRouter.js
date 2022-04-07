import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    )
}

export default MyRouter;