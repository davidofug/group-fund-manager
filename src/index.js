import React from "react";
import *
as ReactDOMClient from 'react-dom/client';

import "./index.css";
import App from "./App";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render( <
    React.StrictMode >
    <
    Login / >
    <
    /React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
reportWebVitals();
reportWebVitals();