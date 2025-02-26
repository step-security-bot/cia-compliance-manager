import React, { useState, useMemo } from "react";
import Selection from "./components/Selection";
import DetailCard from "./components/DetailCard";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  CIADetails,
} from "./hooks/useCIAOptions";

const CIAClassificationApp: React.FC = () => {
  const [availability, setAvailability] = useState<string>("None");
  const [integrity, setIntegrity] = useState<string>("None");
  const [confidentiality, setConfidentiality] = useState<string>("None");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Apply dark mode class to root div
      const rootDiv = document.getElementById("root");
      if (rootDiv) {
        if (newMode) {
          rootDiv.classList.add("dark");
        } else {
          rootDiv.classList.remove("dark");
        }
      }
      return newMode;
    });
  };

  const availabilityDetail =
    availabilityOptions[availability] || availabilityOptions["None"];
  const integrityDetail =
    integrityOptions[integrity] || integrityOptions["None"];
  const confidentialityDetail =
    confidentialityOptions[confidentiality] || confidentialityOptions["None"];

  // Memoize cost calculations to improve performance
  const { totalCapex, totalOpex } = useMemo(() => {
    const totalCapex =
      availabilityDetail.capex +
      integrityDetail.capex +
      confidentialityDetail.capex;
    const totalOpex =
      availabilityDetail.opex +
      integrityDetail.opex +
      confidentialityDetail.opex;
    return { totalCapex, totalOpex };
  }, [availabilityDetail, integrityDetail, confidentialityDetail]);

  // Determine solution size based on total CAPEX percentage
  const isSmallSolution = totalCapex <= 60;
  const capexEstimate = isSmallSolution ? "$10,000" : "$1,000,000";
  const opexEstimate = isSmallSolution ? "$500" : "$50,000";

  return (
    <div
      className={`app-container ${darkMode ? "dark" : ""}`}
      data-testid="app-container"
    >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1
              data-testid="app-title"
              className="text-2xl font-bold text-gray-800 dark:text-gray-100"
            >
              CIA Classification App for PartyRock AWS
            </h1>
            <button
              data-testid="theme-toggle"
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div
            data-testid="classification-form"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Selection
              label="Availability Level"
              options={availabilityOptions}
              value={availability}
              onChange={setAvailability}
              id="availability"
              data-testid="availability-select"
            />
            <Selection
              label="Integrity Level"
              options={integrityOptions}
              value={integrity}
              onChange={setIntegrity}
              id="integrity"
              data-testid="integrity-select"
            />
            <Selection
              label="Confidentiality Level"
              options={confidentialityOptions}
              value={confidentiality}
              onChange={setConfidentiality}
              id="confidentiality"
              data-testid="confidentiality-select"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Real-Time Cost Estimates
            </h2>
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-md">
              <p className="text-gray-700 dark:text-gray-200">
                Total CAPEX Percentage: {totalCapex}%
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Total OPEX Percentage: {totalOpex}%
              </p>
              <p
                data-testid="capex-estimate"
                className="mt-2 font-medium text-gray-800 dark:text-gray-100"
              >
                Estimated CAPEX: {capexEstimate}
              </p>
              <p
                data-testid="opex-estimate"
                className="font-medium text-gray-800 dark:text-gray-100"
              >
                Estimated OPEX: {opexEstimate}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isSmallSolution
                  ? "Small solution estimation based on lower risk configuration."
                  : "Large solution estimation for high-criticality deployment."}
              </p>
            </div>
          </div>
          <div data-testid="analysis-section">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Detailed Analysis
            </h2>
            <div data-testid="recommendations" className="space-y-6">
              <DetailCard
                category="Availability"
                level={availability}
                details={availabilityDetail}
              />
              <DetailCard
                category="Integrity"
                level={integrity}
                details={integrityDetail}
              />
              <DetailCard
                category="Confidentiality"
                level={confidentiality}
                details={confidentialityDetail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
