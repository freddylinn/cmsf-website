import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* No Router here! It's already in App.js */}
  </React.StrictMode>
);

// Register the service worker so the tool keeps working without a connection.
// Wrapped in a load listener so it never competes with the first paint, and in
// a capability check so unsupported browsers simply carry on online-only.
// Service workers require a secure context: HTTPS in production, with
// localhost exempted so the offline behaviour can be tested during development.
const swAllowed =
  window.location.protocol === "https:" ||
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

if ("serviceWorker" in navigator && swAllowed) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/sw.js`)
      .catch((err) => console.warn("Service worker registration failed:", err));
  });
}
