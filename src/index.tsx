import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/valueStyles.css";
import "./styles/widgetStyles.css"; // Import the widget styles for consistent widget appearance
import GlobalWidgetStyler from "./components/common/GlobalWidgetStyler";

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
    <GlobalWidgetStyler />
    <App />
  </React.StrictMode>
);

// Add this line to signal React hydration
window.__REACT_HYDRATED__ = true;
