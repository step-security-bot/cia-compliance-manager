import React, { useState, useMemo, useEffect } from "react";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "./hooks/useCIAOptions";
import Dashboard, { DashboardWidget } from "./components/Dashboard";
import RadarChart from "./components/RadarChart";
import SecurityLevelWidget from "./components/widgets/SecurityLevelWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import { WIDGET_ICONS } from "./constants/appConstants";

const CIAClassificationApp: React.FC = () => {
  const [availability, setAvailability] = useState<string>("None");
  const [integrity, setIntegrity] = useState<string>("None");
  const [confidentiality, setConfidentiality] = useState<string>("None");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const testEventHandler = (e: Event) => {
      if (
        e instanceof CustomEvent &&
        e.type === "test:set-values" &&
        e.detail
      ) {
        const { availability: a, integrity: i, confidentiality: c } = e.detail;
        if (a) setAvailability(a);
        if (i) setIntegrity(i);
        if (c) setConfidentiality(c);
      }
    };

    document.addEventListener(
      "test:set-values",
      testEventHandler as EventListener
    );

    return () => {
      document.removeEventListener(
        "test:set-values",
        testEventHandler as EventListener
      );
    };
  }, []);

  useEffect(() => {
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
        if (process.env.NODE_ENV !== "test") {
          console.error("Error detecting color scheme preference:", error);
        }
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
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

  const overallSecurityLevel = useMemo(() => {
    const levels = ["None", "Basic", "Moderate", "High", "Very High"];
    const availabilityIndex = levels.indexOf(availability);
    const integrityIndex = levels.indexOf(integrity);
    const confidentialityIndex = levels.indexOf(confidentiality);

    const avgIndex = Math.round(
      (availabilityIndex + integrityIndex + confidentialityIndex) / 3
    );
    return levels[avgIndex] || "None";
  }, [availability, integrity, confidentiality]);

  const availabilityDetail =
    availabilityOptions[availability] || availabilityOptions["None"];
  const integrityDetail =
    integrityOptions[integrity] || integrityOptions["None"];
  const confidentialityDetail =
    confidentialityOptions[confidentiality] || confidentialityOptions["None"];

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

  const isSmallSolution = totalCapex <= 60;
  const capexEstimate = isSmallSolution ? "$10,000" : "$1,000,000";
  const opexEstimate = isSmallSolution ? "$500" : "$50,000";

  return (
    <div
      className={`app-container ${darkMode ? "dark" : ""}`}
      data-testid="app-container"
    >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h1
                data-testid="app-title"
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300"
              >
                CIA Compliance Manager Dashboard
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

            <Dashboard
              availability={availability}
              integrity={integrity}
              confidentiality={confidentiality}
            >
              {/* Security Level Selection - Important control panel */}
              <DashboardWidget
                title="Security Level Selection"
                size="medium"
                icon={WIDGET_ICONS.SECURITY_LEVEL}
              >
                <SecurityLevelWidget
                  availability={availability}
                  integrity={integrity}
                  confidentiality={confidentiality}
                  setAvailability={setAvailability}
                  setIntegrity={setIntegrity}
                  setConfidentiality={setConfidentiality}
                  availabilityOptions={availabilityOptions}
                  integrityOptions={integrityOptions}
                  confidentialityOptions={confidentialityOptions}
                />
              </DashboardWidget>

              {/* Business Impact Analysis */}
              <DashboardWidget
                title="Business Impact Analysis"
                size="medium"
                icon={WIDGET_ICONS.BUSINESS_IMPACT}
              >
                <div className="p-2 space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The Business Impact Analysis (BIA) helps identify critical
                    business functions and their dependencies, quantify
                    financial and operational impacts of security incidents.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li className="text-sm">
                          Clear visibility into security requirements
                        </li>
                        <li className="text-sm">
                          Quantifiable metrics for security investments
                        </li>
                        <li className="text-sm">
                          Documentation for compliance requirements
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">
                        Business Considerations
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li className="text-sm">
                          Revenue impact:{" "}
                          {availability === "Very High"
                            ? "Minimal"
                            : availability === "High"
                            ? "Low"
                            : availability === "Moderate"
                            ? "Moderate"
                            : "High"}
                        </li>
                        <li className="text-sm">
                          Regulatory risk:{" "}
                          {confidentiality === "Very High" ||
                          confidentiality === "High"
                            ? "Minimal"
                            : "Significant"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DashboardWidget>

              {/* Security Summary widget */}
              <DashboardWidget
                title="Security Summary"
                size="medium"
                icon={WIDGET_ICONS.SECURITY_SUMMARY}
              >
                <SecuritySummaryWidget
                  securityLevel={overallSecurityLevel}
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Cost Estimation - moved up */}
              <DashboardWidget
                title="Cost Estimation"
                size="medium"
                icon={WIDGET_ICONS.COST_ESTIMATION}
              >
                <CostEstimationWidget
                  totalCapex={totalCapex}
                  totalOpex={totalOpex}
                  capexEstimate={capexEstimate}
                  opexEstimate={opexEstimate}
                  isSmallSolution={isSmallSolution}
                />
              </DashboardWidget>

              {/* Value Creation - moved up */}
              <DashboardWidget
                title="Value Creation"
                size="medium"
                icon={WIDGET_ICONS.VALUE_CREATION}
              >
                <ValueCreationWidget securityLevel={overallSecurityLevel} />
              </DashboardWidget>

              {/* Security visualization - moved up */}
              <DashboardWidget
                title="Security Profile Visualization"
                size="medium"
                icon={WIDGET_ICONS.SECURITY_VISUALIZATION}
              >
                <RadarChart
                  availability={availability}
                  integrity={integrity}
                  confidentiality={confidentiality}
                />
              </DashboardWidget>

              {/* Compliance Status */}
              <DashboardWidget
                title="Compliance Status"
                size="medium"
                icon={WIDGET_ICONS.COMPLIANCE_STATUS}
              >
                <ComplianceStatusWidget
                  securityLevels={{
                    availability,
                    integrity,
                    confidentiality,
                  }}
                />
              </DashboardWidget>

              {/* Technical Implementation - remains last */}
              <DashboardWidget
                title="Technical Implementation"
                size="full"
                icon={WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
              >
                <div className="p-2 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Key technical implementation details for your selected
                    security levels:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">
                        Availability: {availability}
                      </h4>
                      <p className="text-sm">{availabilityDetail.technical}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">
                        Integrity: {integrity}
                      </h4>
                      <p className="text-sm">{integrityDetail.technical}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">
                        Confidentiality: {confidentiality}
                      </h4>
                      <p className="text-sm">
                        {confidentialityDetail.technical}
                      </p>
                    </div>
                  </div>
                </div>
              </DashboardWidget>
            </Dashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
