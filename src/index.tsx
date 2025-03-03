import React from "react";
import ReactDOM from "react-dom/client";
import CIAClassificationApp from "./CIAClassificationApp"; // Assuming this is your main app component
import "./index.css";
import "./styles/valueStyles.css";
import "./styles/widgetStyles.css";

// Extend the Window interface
declare global {
  interface Window {
    __REACT_HYDRATED__?: boolean;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CIAClassificationApp />
  </React.StrictMode>
);

// Add this line to signal React hydration
window.__REACT_HYDRATED__ = true;
