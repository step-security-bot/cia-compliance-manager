import React, { useState, useMemo, useEffect } from "react";
import Selection from "./components/Selection";
import DetailCard from "./components/DetailCard";
import RadarChart from "./components/RadarChart";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "./hooks/useCIAOptions";
import { CIADetails } from "./types/cia";

const CIAClassificationApp: React.FC = () => {
  const [availability, setAvailability] = useState<string>("None");
  const [integrity, setIntegrity] = useState<string>("None");
  const [confidentiality, setConfidentiality] = useState<string>("None");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Check system preference on initial load
  useEffect(() => {
    // Check if we're in a browser environment and that matchMedia exists and is a function
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      typeof window.matchMedia === "function"
    ) {
      try {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(prefersDark);

        if (prefersDark) {
          document.getElementById("root")?.classList.add("dark");
        }
      } catch (error) {
        // Don't log in test environment
        if (process.env.NODE_ENV !== "test") {
          console.error("Error detecting color scheme preference:", error);
        }
      }
    }
  }, []);

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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h1
                data-testid="app-title"
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300"
              >
                CIA Classification App for PartyRock AWS
              </h1>
              <button
                data-testid="theme-toggle"
                onClick={toggleDarkMode}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center transition-all duration-300"
              >
                {darkMode ? (
                  <>
                    <span className="mr-2">☀️</span> Light Mode
                  </>
                ) : (
                  <>
                    <span className="mr-2">🌙</span> Dark Mode
                  </>
                )}
              </button>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
                Security Classification Settings
              </h2>
              <div
                data-testid="classification-form"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Radar Chart Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
                Security Profile Visualization
              </h2>
              <RadarChart
                availability={availability}
                integrity={integrity}
                confidentiality={confidentiality}
              />
            </div>

            {/* Cost Estimates Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
                Cost Estimates
              </h2>
              <div className="space-y-4">
                {/* Risk Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md transition-colors duration-300">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Total CAPEX Risk
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                      {totalCapex}%
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md transition-colors duration-300">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Total OPEX Risk
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                      {totalOpex}%
                    </p>
                  </div>
                </div>

                {/* Cost Estimates */}
                <div
                  data-testid="capex-estimate"
                  className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md transition-colors duration-300"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    Estimated CAPEX:
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                    {capexEstimate}
                  </span>
                </div>

                <div
                  data-testid="opex-estimate"
                  className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md transition-colors duration-300"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    Estimated OPEX:
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                    {opexEstimate}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md transition-colors duration-300">
                  <span className="font-medium">Note:</span>{" "}
                  {isSmallSolution
                    ? "Small solution estimation based on lower risk classification."
                    : "Enterprise-grade solution required for high security requirements."}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300"
            data-testid="analysis-section"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
              Detailed Security Analysis & Recommendations
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
