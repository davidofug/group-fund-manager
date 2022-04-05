import React from "react";
import Logo from "./shared/Logo";
const Login = () => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");
    return (<div>
        <Logo width = "32"
        height = "32"
        title = "Group Fund Manager" /> { " " } <
        input className = { `p-2 border ${error ? "border-red-500" : "border-gray-200"}` }
        type="text"
        placeholder="Email/Phone"
        onChange={(event) => setEmail(event.target.value) }
        onBlur={(event) => event.target.value === "" ? setError("Email required!") : null}
        onFocus={() => setError("")}
        />{" "}
        {error && <div className="text-red-500">{error}</div>}
        The email is { email } { " " }
        
        </div>
    );
};

export default Login;