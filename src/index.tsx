import React from "react";
import ReactDOM from "react-dom/client";
import CIAClassificationApp from "./CIAClassificationApp";
import "./index.css"; // Optional: your global styles

// Get the root element from the public/index.html file
const container = document.getElementById("root");

// Ensure the container exists
if (!container) {
  throw new Error("Root element not found");
}

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <CIAClassificationApp />
  </React.StrictMode>
);
