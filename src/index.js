import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Added this
import "./index.css";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrapping App in HashRouter allows all your navigation links to work */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
