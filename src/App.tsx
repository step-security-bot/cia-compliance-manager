import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import StyleGuide from "./components/examples/StyleGuide";
import "./styles/valueStyles.css";
import { useCIAOptions } from "./hooks/useCIAOptions";
import SecurityLevelSelector from "./components/SecurityLevelSelector";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";

const App: React.FC = () => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();
  const [availability, setAvailability] = React.useState("Moderate");
  const [integrity, setIntegrity] = React.useState("Moderate");
  const [confidentiality, setConfidentiality] = React.useState("Moderate");
  const [currentPage, setCurrentPage] = useState<"dashboard" | "styleguide">(
    "dashboard"
  );

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            CIA Compliance Manager
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                    currentPage === "dashboard"
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : ""
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("styleguide")}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                    currentPage === "styleguide"
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : ""
                  }`}
                >
                  Style Guide
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {currentPage === "dashboard" ? (
          <>
            <SecurityLevelSelector
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
              setAvailability={setAvailability}
              setIntegrity={setIntegrity}
              setConfidentiality={setConfidentiality}
            />
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
          </>
        ) : (
          <StyleGuide />
        )}
      </main>
    </div>
  );
};

export default App;
