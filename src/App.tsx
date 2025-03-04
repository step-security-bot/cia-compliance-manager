import React, { useState, useEffect } from "react";
import Dashboard, { DashboardWidget } from "./components/Dashboard";
import "./styles/valueStyles.css";
import { useCIAOptions } from "./hooks/useCIAOptions";
import SecurityLevelSelector from "./components/SecurityLevelSelector";
import { WidgetContainer } from "./components/common";
import RadarChart from "./components/RadarChart";
import { WIDGET_ICONS } from "./constants/appConstants";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import BusinessImpactAnalysisWidget from "./components/widgets/BusinessImpactAnalysisWidget";
import TechnicalDetailsWidget from "./components/widgets/TechnicalDetailsWidget";
import CombinedBusinessImpactWidget from "./components/widgets/CombinedBusinessImpactWidget";
import CIAClassificationApp from "./CIAClassificationApp";

const applyWidgetStyling = () => {
  const potentialWidgets = document.querySelectorAll(
    '[data-testid^="widget-"], [data-testid="radar-widget-container"]'
  );

  potentialWidgets.forEach((widget) => {
    if (!widget.classList.contains("widget")) {
      widget.classList.add("widget");
    }

    let header = widget.querySelector('[class*="header"]');
    let body = widget.querySelector('[class*="body"]');

    if (!header) {
      header = widget.querySelector("h3, h4");
      if (
        header &&
        header.parentElement &&
        !header.parentElement.classList.contains("widget-header")
      ) {
        const headerWrapper = document.createElement("div");
        headerWrapper.className =
          "widget-header p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-t-lg";
        if (header.parentNode) {
          header.parentNode.insertBefore(headerWrapper, header);
          headerWrapper.appendChild(header);
        }
      }
    }

    if (header && !header.classList.contains("widget-header")) {
      header.classList.add("widget-header");
    }

    if (!body) {
      const headerElement = widget.querySelector(".widget-header");
      if (headerElement) {
        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "widget-body p-3 overflow-hidden";

        let nextSibling = headerElement.nextSibling;
        while (nextSibling) {
          const current = nextSibling;
          nextSibling = nextSibling.nextSibling;
          bodyWrapper.appendChild(current);
        }

        widget.appendChild(bodyWrapper);
      }
    }

    if (body && !body.classList.contains("widget-body")) {
      body.classList.add("widget-body");
    }
  });
};

export const App: React.FC = () => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();
  const [availability, setAvailability] = React.useState("Moderate");
  const [integrity, setIntegrity] = React.useState("Moderate");
  const [confidentiality, setConfidentiality] = React.useState("Moderate");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const calculateTotalCapex = () => {
    const availabilityCapex = availabilityOptions[availability]?.capex || 0;
    const integrityCapex = integrityOptions[integrity]?.capex || 0;
    const confidentialityCapex =
      confidentialityOptions[confidentiality]?.capex || 0;
    return availabilityCapex + integrityCapex + confidentialityCapex;
  };

  const calculateTotalOpex = () => {
    const availabilityOpex = availabilityOptions[availability]?.opex || 0;
    const integrityOpex = integrityOptions[integrity]?.opex || 0;
    const confidentialityOpex =
      confidentialityOptions[confidentiality]?.opex || 0;
    return availabilityOpex + integrityOpex + confidentialityOpex;
  };

  const getOverallSecurityLevel = () => {
    const levels = [availability, integrity, confidentiality];
    if (levels.every((level) => level === "Very High")) return "Very High";
    if (levels.every((level) => level === "High" || level === "Very High"))
      return "High";
    if (levels.every((level) => level !== "None" && level !== "Low"))
      return "Moderate";
    if (levels.every((level) => level !== "None")) return "Low";
    return "None";
  };

  const securityLevel = getOverallSecurityLevel();
  const totalCapex = calculateTotalCapex();
  const totalOpex = calculateTotalOpex();

  useEffect(() => {
    const timer = setTimeout(() => {
      applyWidgetStyling();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div data-testid="cia-classification-app">
      <CIAClassificationApp />
    </div>
  );
};

export default App;
