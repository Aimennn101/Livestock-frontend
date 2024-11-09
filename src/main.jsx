import React from "react";
import ReactDOM from "react-dom/client"; // updated import
import "./index.css";
import App from "./App";

const RootApp = () => {
  return (
    <div>
      <App />
    </div>
  );
};

// Create the root with the new API
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

// Render the component tree
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
