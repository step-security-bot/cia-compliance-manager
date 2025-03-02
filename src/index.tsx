import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Change to PascalCase to match component naming standards
import "./styles/valueStyles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
