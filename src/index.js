import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // MUST have a slash in the closing tag below
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter> 
  </React.StrictMode>
);
