import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import "./styles/valueStyles.css";
import { useCIAOptions } from "./hooks/useCIAOptions";
import SecurityLevelSelector from "./components/SecurityLevelSelector";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import RadarChart from "./components/RadarChart";
import { WIDGET_ICONS } from "./constants/appConstants";

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
          <SecurityLevelSelector
            availability={availability}
            integrity={integrity}
            confidentiality={confidentiality}
            setAvailability={setAvailability}
            setIntegrity={setIntegrity}
            setConfidentiality={setConfidentiality}
          />

          {/* Fix: Add a properly styled widget box for RadarChart */}
          <div
            className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            data-testid="radar-widget-container"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-md font-semibold flex items-center">
                <span className="mr-2">
                  {WIDGET_ICONS.SECURITY_VISUALIZATION}
                </span>
                Security Visualization
              </h3>
            </div>
            <div className="p-4">
              <RadarChart
                availability={availability}
                integrity={integrity}
                confidentiality={confidentiality}
                className="max-h-[250px]"
              />
            </div>
          </div>
        </div>

        <Dashboard
          availability={availability}
          integrity={integrity}
          confidentiality={confidentiality}
        >
          <SecuritySummaryWidget
            securityLevel={securityLevel}
            availabilityLevel={availability}
            integrityLevel={integrity}
            confidentialityLevel={confidentiality}
          />
          <ComplianceStatusWidget
            securityLevels={{
              availability,
              integrity,
              confidentiality,
            }}
          />
          <ValueCreationWidget securityLevel={securityLevel} />
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
        </Dashboard>
      </main>
    </div>
  );
};

export default App;
