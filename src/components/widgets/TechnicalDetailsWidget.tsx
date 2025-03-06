import React, { useState, useEffect } from "react";
import {
  WIDGET_ICONS,
  IMPLEMENTATION_COSTS,
  SECURITY_LEVELS,
} from "../../constants/appConstants";
import { CIADetails } from "../../types/cia";
import ValueDisplay from "../common/ValueDisplay";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import { WIDGET_TEST_IDS, createDynamicTestId } from "../../constants/testIds";

interface TechnicalDetailsWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  // Add these for backward compatibility
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  testId?: string;
}

const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  // Support both naming conventions
  availability,
  integrity,
  confidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
  // Use either naming convention
  const actualAvailLevel = availabilityLevel || availability;
  const actualIntLevel = integrityLevel || integrity;
  const actualConfLevel = confidentialityLevel || confidentiality;

  const [activeTab, setActiveTab] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Helper function to get technical details for each component
  const getTechnicalDetails = (
    component: "availability" | "integrity" | "confidentiality"
  ): {
    technical: string;
    implementation: string[];
    complexity: string;
    uptime?: string; // Add this optional property
  } => {
    let options: Record<string, CIADetails> = {};
    let level: string = "None";

    switch (component) {
      case "availability":
        options = availabilityOptions || {};
        level = actualAvailLevel || "None";
        break;
      case "integrity":
        options = integrityOptions || {};
        level = actualIntLevel || "None";
        break;
      case "confidentiality":
        options = confidentialityOptions || {};
        level = actualConfLevel || "None";
        break;
    }

    const technicalDescription =
      options[level]?.technical || "No technical details available.";

    // Extract implementation steps or generate generic ones
    const implementationSteps = options[level]?.implementationSteps || [
      `Define ${level.toLowerCase()} ${component} requirements`,
      `Design ${level.toLowerCase()} ${component} controls`,
      `Implement ${level.toLowerCase()} ${component} measures`,
      `Test ${level.toLowerCase()} ${component} effectiveness`,
      `Monitor ${level.toLowerCase()} ${component} performance`,
    ];

    // Determine complexity based on level
    const complexity =
      level === "None"
        ? "None"
        : level === "Low"
        ? "Low"
        : level === "Moderate"
        ? "Medium"
        : level === "High"
        ? "High"
        : "Very High";

    // Add uptime to return object for availability
    if (component === "availability") {
      return {
        technical: technicalDescription,
        implementation: implementationSteps,
        complexity,
        uptime: options[level]?.uptime || "Unknown",
      };
    }

    return {
      technical: technicalDescription,
      implementation: implementationSteps,
      complexity,
    };
  };

  // Get implementation complexity status
  const getComplexityStatus = (
    complexity: string
  ): "success" | "warning" | "error" | "info" | "neutral" => {
    switch (complexity) {
      case "None":
        return "neutral";
      case "Low":
        return "success";
      case "Medium":
        return "info";
      case "High":
        return "warning";
      case "Very High":
        return "error";
      default:
        return "neutral";
    }
  };

  // Get technology stack suggestions based on security level
  const getTechnologyStack = (
    component: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    const baseStacks = {
      availability: {
        None: ["Manual processes", "Basic hosting"],
        Low: ["Single server setup", "Scheduled backups"],
        Moderate: ["Load balancing", "Automated backups", "Basic monitoring"],
        High: ["Multi-region failover", "Real-time monitoring", "Clustering"],
        "Very High": [
          "Active-active architecture",
          "Geographic redundancy",
          "Auto-scaling",
          "Self-healing systems",
        ],
      },
      integrity: {
        None: ["Manual verifications"],
        Low: ["Checksums", "Basic validation"],
        Moderate: ["Digital signatures", "Audit logs", "Input validation"],
        High: [
          "Blockchain ledgers",
          "Advanced cryptographic validation",
          "Tamper detection",
        ],
        "Very High": [
          "Zero-trust architecture",
          "Multi-party validation",
          "Formal verification",
        ],
      },
      confidentiality: {
        None: ["No encryption"],
        Low: ["Basic encryption at rest"],
        Moderate: [
          "TLS/SSL",
          "Role-based access control",
          "Perimeter security",
        ],
        High: [
          "End-to-end encryption",
          "Fine-grained access control",
          "Data masking",
        ],
        "Very High": [
          "Multi-factor encryption",
          "Hardware security modules",
          "Homomorphic encryption",
          "Zero-knowledge proofs",
        ],
      },
    };

    return (
      baseStacks[component][
        level as keyof (typeof baseStacks)[typeof component]
      ] || []
    );
  };

  const activeDetails = getTechnicalDetails(activeTab);

  return (
    <div
      className="space-y-4"
      data-testid={WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET}
    >
      {/* Tabs for switching between CIA components */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("availability")}
          className={`px-4 py-2 ${
            activeTab === "availability"
              ? "border-b-2 border-blue-500 font-medium text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
          data-testid={WIDGET_TEST_IDS.AVAILABILITY_TAB}
        >
          Availability
        </button>
        <button
          onClick={() => setActiveTab("integrity")}
          className={`px-4 py-2 ${
            activeTab === "integrity"
              ? "border-b-2 border-blue-500 font-medium text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
          data-testid={WIDGET_TEST_IDS.INTEGRITY_TAB}
        >
          Integrity
        </button>
        <button
          onClick={() => setActiveTab("confidentiality")}
          className={`px-4 py-2 ${
            activeTab === "confidentiality"
              ? "border-b-2 border-blue-500 font-medium text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
          data-testid={WIDGET_TEST_IDS.CONFIDENTIALITY_TAB}
        >
          Confidentiality
        </button>
      </div>

      {/* Technical details */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3
          className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
          data-testid={WIDGET_TEST_IDS.TECHNICAL_HEADER}
        >
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Technical
          Details
        </h3>

        <div className="mb-4">
          <div className="flex items-center mb-1">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: getComplexityStatus(activeDetails.complexity),
              }}
            ></div>
            <ValueDisplay
              value={
                activeTab === "availability"
                  ? actualAvailLevel || "None"
                  : activeTab === "integrity"
                  ? actualIntLevel || "None"
                  : actualConfLevel || "None"
              }
              variant={
                activeTab === "availability"
                  ? "primary"
                  : activeTab === "integrity"
                  ? "success"
                  : "info"
              }
              size="sm"
              testId={`${activeTab}-level-indicator`} // This ensures we have a proper test ID for each tab
            />
          </div>
          <p
            className="text-gray-600 dark:text-gray-400 text-sm mt-2"
            data-testid={WIDGET_TEST_IDS.TECHNICAL_DESCRIPTION}
          >
            {activeDetails.technical}
          </p>

          {activeTab === "availability" && activeDetails.uptime && (
            <div className="mt-2">
              <KeyValuePair
                label="Uptime"
                value={activeDetails.uptime}
                testId={`${activeTab}-complexity`}
              />
            </div>
          )}
        </div>

        {/* Implementation steps */}
        <div className="mt-4">
          <h4
            className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300"
            data-testid={WIDGET_TEST_IDS.IMPLEMENTATION_HEADER}
          >
            Implementation Steps
          </h4>

          <ol className="list-decimal pl-5 space-y-2">
            {activeDetails.implementation.map((step, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-400"
                data-testid={createDynamicTestId.implementationStep(index)}
              >
                {step}
              </li>
            ))}
            {(!activeDetails.implementation ||
              activeDetails.implementation.length === 0) && (
              <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                No specific implementation steps provided.
              </li>
            )}
          </ol>

          {/* Tech stack */}
          {getTechnologyStack(
            activeTab,
            activeTab === "availability"
              ? actualAvailLevel || "None" // Add || "None" for each value
              : activeTab === "integrity"
              ? actualIntLevel || "None" // Add || "None" for each value
              : actualConfLevel || "None" // Add || "None" for each value
          ).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
              data-testid={createDynamicTestId.techStack(index)}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Resources needed */}
        <div className="mt-4">
          <h4
            className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300"
            data-testid={WIDGET_TEST_IDS.RESOURCES_HEADER}
          >
            Resources Required
          </h4>

          <div className="space-y-2">
            <KeyValuePair
              label="Development Effort"
              value={
                IMPLEMENTATION_COSTS[activeDetails.complexity]
                  ?.developmentEffort || "Unknown"
              }
              testId={WIDGET_TEST_IDS.DEVELOPMENT_EFFORT}
            />
            <KeyValuePair
              label="Maintenance Level"
              value={
                IMPLEMENTATION_COSTS[activeDetails.complexity]?.maintenance ||
                "Unknown"
              }
              testId={WIDGET_TEST_IDS.MAINTENANCE_LEVEL}
            />
            <KeyValuePair
              label="Required Expertise"
              value={
                IMPLEMENTATION_COSTS[activeDetails.complexity]?.expertise ||
                "Unknown"
              }
              testId={WIDGET_TEST_IDS.REQUIRED_EXPERTISE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsWidget;
