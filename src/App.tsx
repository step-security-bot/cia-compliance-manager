import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import "./styles/valueStyles.css";
import { useCIAOptions } from "./hooks/useCIAOptions";
import SecurityLevelSelector from "./components/SecurityLevelSelector";
import { WidgetContainer } from "./components/common";
import RadarChart from "./components/RadarChart";
import { WIDGET_ICONS } from "./constants/appConstants";
// Import missing widget components
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import { DashboardWidget } from "./components/Dashboard";
import BusinessImpactAnalysisWidget from "./components/widgets/BusinessImpactAnalysisWidget";
import TechnicalDetailsWidget from "./components/widgets/TechnicalDetailsWidget";
import CombinedBusinessImpactWidget from "./components/widgets/CombinedBusinessImpactWidget";

// Fix function with proper null checks for the header elements
const applyWidgetStyling = () => {
  // Target elements that should be widgets but might not have the class
  const potentialWidgets = document.querySelectorAll(
    '[data-testid^="widget-"], [data-testid="radar-widget-container"]'
  );

  potentialWidgets.forEach((widget) => {
    // Add the widget class if it doesn't exist
    if (!widget.classList.contains("widget")) {
      widget.classList.add("widget");
    }

    // Look for header and body elements
    let header = widget.querySelector('[class*="header"]');
    let body = widget.querySelector('[class*="body"]');

    // If no header is found, look for the first heading
    if (!header) {
      header = widget.querySelector("h3, h4");
      // Add null check for header and its parentElement
      if (
        header &&
        header.parentElement &&
        !header.parentElement.classList.contains("widget-header")
      ) {
        // Wrap the header in a proper widget-header div
        const headerWrapper = document.createElement("div");
        headerWrapper.className =
          "widget-header p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-t-lg";
        // Add null check for parentNode
        if (header.parentNode) {
          header.parentNode.insertBefore(headerWrapper, header);
          headerWrapper.appendChild(header);
        }
      }
    }

    // If header exists but doesn't have the widget-header class
    if (header && !header.classList.contains("widget-header")) {
      header.classList.add("widget-header");
    }

    // If no body is found, wrap all content after the header
    if (!body) {
      // Find all content after the header
      const headerElement = widget.querySelector(".widget-header");
      if (headerElement) {
        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "widget-body p-3 overflow-hidden";

        // Move all elements after the header into the body wrapper
        let nextSibling = headerElement.nextSibling;
        while (nextSibling) {
          const current = nextSibling;
          nextSibling = nextSibling.nextSibling;
          bodyWrapper.appendChild(current);
        }

        widget.appendChild(bodyWrapper);
      }
    }

    // If body exists but doesn't have the widget-body class
    if (body && !body.classList.contains("widget-body")) {
      body.classList.add("widget-body");
    }
  });
};

const App: React.FC = () => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();
  const [availability, setAvailability] = React.useState("Moderate");
  const [integrity, setIntegrity] = React.useState("Moderate");
  const [confidentiality, setConfidentiality] = React.useState("Moderate");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from user preference
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    // Apply initial theme
    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Calculate total CAPEX based on selected security levels
  const calculateTotalCapex = () => {
    const availabilityCapex = availabilityOptions[availability]?.capex || 0;
    const integrityCapex = integrityOptions[integrity]?.capex || 0;
    const confidentialityCapex =
      confidentialityOptions[confidentiality]?.capex || 0;
    return availabilityCapex + integrityCapex + confidentialityCapex;
  };

  // Calculate total OPEX based on selected security levels
  const calculateTotalOpex = () => {
    const availabilityOpex = availabilityOptions[availability]?.opex || 0;
    const integrityOpex = integrityOptions[integrity]?.opex || 0;
    const confidentialityOpex =
      confidentialityOptions[confidentiality]?.opex || 0;
    return availabilityOpex + integrityOpex + confidentialityOpex;
  };

  // Derive the overall security level based on selected component levels
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

  // Apply widget styling after component mounts
  useEffect(() => {
    // Use a timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      applyWidgetStyling();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
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
          {/* Theme toggle button with gaming-inspired icons */}
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
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
          {/* Wrap security level controls in a widget container */}
          <DashboardWidget
            title="Security Profile Configuration"
            icon={WIDGET_ICONS.SECURITY_LEVEL}
            testId="widget-security-profile"
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

          {/* Fix: Use WidgetContainer for consistent styling */}
          <WidgetContainer
            title="Security Visualization"
            icon={WIDGET_ICONS.SECURITY_VISUALIZATION}
            testId="radar-widget-container"
          >
            <RadarChart
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
              className="max-h-[250px]"
            />
          </WidgetContainer>
        </div>

        <Dashboard
          availability={availability}
          integrity={integrity}
          confidentiality={confidentiality}
        >
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
            title="Compliance Status"
            icon={WIDGET_ICONS.COMPLIANCE_STATUS}
            testId="widget-compliance-status"
          >
            <ComplianceStatusWidget
              {...{ availability, integrity, confidentiality }}
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
            title="Cost Estimation"
            icon={WIDGET_ICONS.COST_ESTIMATION}
            testId="widget-cost-estimation"
          >
            <CostEstimationWidget
              totalCapex={totalCapex}
              totalOpex={totalOpex}
              capexEstimate={`${Math.round(totalCapex * 5000)}`}
              opexEstimate={`${Math.round(totalOpex * 2000)}`}
              isSmallSolution={true}
              roi={`${Math.round(
                120 +
                  (securityLevel === "None"
                    ? 0
                    : securityLevel === "Low"
                    ? 40
                    : securityLevel === "Moderate"
                    ? 80
                    : securityLevel === "High"
                    ? 120
                    : 160)
              )}%`}
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

          {/* Replace the single BusinessImpactAnalysisWidget with the Combined version */}
          <DashboardWidget
            title="Business Impact Analysis"
            icon={WIDGET_ICONS.BUSINESS_IMPACT}
            testId="widget-business-impact-analysis"
            size="large" // Make this widget larger to fit all content
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

          {/* Add the new Technical Implementation Details widget */}
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
