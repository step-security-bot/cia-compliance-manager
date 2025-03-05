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
import BusinessImpactWidget from "./components/widgets/CombinedBusinessImpactWidget";
import { WIDGET_ICONS } from "./constants/appConstants";
import { APP_TEST_IDS, WIDGET_REGISTRY_TEST_IDS } from "./constants/testIds";
import { safeAccess } from "./utils/typeGuards";
import { SECURITY_LEVELS, UI_TEXT } from "./constants/appConstants";

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
          document.documentElement.classList.add("dark");
          document.getElementById("root")?.classList.add("dark");
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "test") {
          console.error("Error detecting color scheme preference:", error);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Update the document with the new theme
      document.documentElement.classList.toggle("dark", newMode);
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
      safeAccess(availabilityDetail, "capex", 0) +
      safeAccess(integrityDetail, "capex", 0) +
      safeAccess(confidentialityDetail, "capex", 0);
    const totalOpex =
      safeAccess(availabilityDetail, "opex", 0) +
      safeAccess(integrityDetail, "opex", 0) +
      safeAccess(confidentialityDetail, "opex", 0);
    return { totalCapex, totalOpex };
  }, [availabilityDetail, integrityDetail, confidentialityDetail]);

  const isSmallSolution = totalCapex <= 60;
  const capexEstimate = isSmallSolution ? "$10,000" : "$1,000,000";
  const opexEstimate = isSmallSolution ? "$500" : "$50,000";

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
      data-testid={APP_TEST_IDS.APP_CONTAINER}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-xl font-bold text-gray-800 dark:text-white"
            data-testid={APP_TEST_IDS.APP_TITLE}
          >
            {UI_TEXT.WIDGET_TITLES.SECURITY_PROFILE}
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            data-testid={APP_TEST_IDS.THEME_TOGGLE}
          >
            {darkMode ? "🔆" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <Dashboard
          columnsSmall={1}
          columnsMedium={2}
          columnsLarge={3}
          className="gap-4"
        >
          {/* Security Level Widget */}
          <DashboardWidget
            title={UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL}
            colSpan={3}
            testId={
              WIDGET_REGISTRY_TEST_IDS.WIDGET_PREFIX +
              "security-level-selection"
            }
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

          {/* Cost Estimation Widget */}
          <DashboardWidget
            title={UI_TEXT.WIDGET_TITLES.COST_ESTIMATION}
            colSpan={1}
            testId={WIDGET_REGISTRY_TEST_IDS.WIDGET_PREFIX + "cost-estimation"}
          >
            <CostEstimationWidget
              availabilityLevel={availability}
              integrityLevel={integrity}
              confidentialityLevel={confidentiality}
              availabilityOptions={availabilityOptions}
              integrityOptions={integrityOptions}
              confidentialityOptions={confidentialityOptions}
              totalCapex={totalCapex}
              totalOpex={totalOpex}
              capexEstimate={capexEstimate}
              opexEstimate={opexEstimate}
              isSmallSolution={isSmallSolution}
            />
          </DashboardWidget>

          <DashboardWidget
            title="Value Creation"
            icon={WIDGET_ICONS.VALUE_CREATION}
            testId="widget-value-creation"
          >
            <ValueCreationWidget securityLevel={overallSecurityLevel} />
          </DashboardWidget>

          {/* Row 2 */}
          <DashboardWidget
            title="Security Summary"
            icon={WIDGET_ICONS.SECURITY_SUMMARY}
            testId="widget-security-summary"
          >
            <SecuritySummaryWidget
              securityLevel={overallSecurityLevel}
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
            <BusinessImpactWidget
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

          {/* Row 3 */}
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
            <div className="p-2 space-y-2 overflow-auto h-full">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Key technical implementation details for your selected security
                levels:
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">
                    Availability: {availability}
                  </h4>
                  <p className="text-sm">
                    {safeAccess(availabilityDetail, "technical", "")}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">
                    Integrity: {integrity}
                  </h4>
                  <p className="text-sm">
                    {safeAccess(integrityDetail, "technical", "")}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">
                    Confidentiality: {confidentiality}
                  </h4>
                  <p className="text-sm">
                    {safeAccess(confidentialityDetail, "technical", "")}
                  </p>
                </div>
              </div>
            </div>
          </DashboardWidget>

          {/* Security Resources widget added to balance the layout (3x3 grid) */}
          <DashboardWidget
            title="Security Resources"
            size="medium"
            icon="📚" // Use emoji directly instead of WIDGET_ICONS.SECURITY_RESOURCES
            testId="widget-security-resources"
          >
            <div
              className="p-2 space-y-4"
              data-testid="security-resources-content"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Access security implementation guides and best practices for
                your selected security levels.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-2">Documentation</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Security Implementation Guide</li>
                  <li className="text-sm">Compliance Reporting Templates</li>
                  <li className="text-sm">Risk Assessment Framework</li>
                </ul>
              </div>
            </div>
          </DashboardWidget>
        </Dashboard>
      </main>
    </div>
  );
};

export default CIAClassificationApp;
