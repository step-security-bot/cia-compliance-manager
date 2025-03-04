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
  const [showApp, setShowApp] = useState<boolean>(false);

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

  React.useEffect(() => {
    if (window.location.hash === "#app") {
      setShowApp(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === "#app") {
        setShowApp(true);
      } else if (window.location.hash === "" || window.location.hash === "#") {
        setShowApp(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleGetStarted = () => {
    window.location.hash = "app";
    setShowApp(true);
  };

  return showApp ? (
    <div data-testid="cia-classification-app">
      <CIAClassificationApp />
    </div>
  ) : (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            CIA Compliance Manager
          </h1>
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className="px-4 py-2 border rounded-md transition-all duration-300 flex items-center"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <>
                <span className="mr-2" role="img" aria-hidden="true">
                  ☀️
                </span>
                <span className="text-green-400 font-mono tracking-wide">
                  LIGHT MODE
                </span>
              </>
            ) : (
              <>
                <span className="mr-2" role="img" aria-hidden="true">
                  🌙
                </span>
                <span className="text-blue-600">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Dashboard
          availability={availability}
          integrity={integrity}
          confidentiality={confidentiality}
        >
          <DashboardWidget
            title="Security Profile Configuration"
            icon={WIDGET_ICONS.SECURITY_LEVEL}
            testId="widget-security-level-selection"
          >
            <SecurityLevelSelector
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
              setAvailability={setAvailability}
              setIntegrity={setIntegrity}
              setConfidentiality={setConfidentiality}
            />
          </DashboardWidget>

          <DashboardWidget
            title="Cost Estimation"
            icon={WIDGET_ICONS.COST_ESTIMATION}
            testId="widget-cost-estimation"
          >
            <CostEstimationWidget
              totalCapex={calculateTotalCapex()}
              totalOpex={calculateTotalOpex()}
              capexEstimate={`${Math.round(totalCapex * 5000)}`}
              opexEstimate={`${Math.round(totalOpex * 2000)}`}
              isSmallSolution={true}
              roi={`${Math.round(200 + totalCapex / 2)}%`}
              implementationTime={
                securityLevel === "None"
                  ? "N/A"
                  : securityLevel === "Low"
                  ? "1-2 weeks"
                  : securityLevel === "Moderate"
                  ? "2-4 weeks"
                  : securityLevel === "High"
                  ? "1-3 months"
                  : "3-6 months"
              }
            />
          </DashboardWidget>

          <DashboardWidget
            title="Value Creation"
            icon={WIDGET_ICONS.VALUE_CREATION}
            testId="widget-value-creation"
          >
            <ValueCreationWidget securityLevel={securityLevel} />
          </DashboardWidget>

          <DashboardWidget
            title="Security Summary"
            icon={WIDGET_ICONS.SECURITY_SUMMARY}
            testId="widget-security-summary"
          >
            <SecuritySummaryWidget
              securityLevel={securityLevel}
              availabilityLevel={availability}
              integrityLevel={integrity}
              confidentialityLevel={confidentiality}
            />
          </DashboardWidget>

          <DashboardWidget
            title="Business Impact Analysis"
            icon={WIDGET_ICONS.BUSINESS_IMPACT}
            testId="widget-business-impact"
          >
            <CombinedBusinessImpactWidget
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
              availabilityOptions={availabilityOptions}
              integrityOptions={integrityOptions}
              confidentialityOptions={confidentialityOptions}
            />
          </DashboardWidget>

          <DashboardWidget
            title="Security Visualization"
            icon={WIDGET_ICONS.SECURITY_VISUALIZATION}
            testId="widget-radar-chart"
          >
            <div className="p-2 flex items-center justify-center h-full">
              <RadarChart
                availability={availability}
                integrity={integrity}
                confidentiality={confidentiality}
                className="max-h-[250px] w-full"
                testId="radar-chart-visualization"
              />
            </div>
          </DashboardWidget>

          <DashboardWidget
            title="Compliance Status"
            icon={WIDGET_ICONS.COMPLIANCE_STATUS}
            testId="widget-compliance-status"
          >
            <ComplianceStatusWidget
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
            />
          </DashboardWidget>

          <DashboardWidget
            title="Technical Implementation"
            icon={WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
            testId="widget-technical-implementation"
          >
            <TechnicalDetailsWidget
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
              availabilityOptions={availabilityOptions}
              integrityOptions={integrityOptions}
              confidentialityOptions={confidentialityOptions}
            />
          </DashboardWidget>
        </Dashboard>
      </main>
    </div>
  );
};

export default App;
