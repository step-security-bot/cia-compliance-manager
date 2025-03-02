import React, { useState, useEffect } from "react";
import {
  WIDGET_ICONS,
  IMPLEMENTATION_COSTS,
  SECURITY_LEVELS,
} from "../../constants/appConstants";
import { CIADetails } from "../../types/cia";
import ValueDisplay from "../common/ValueDisplay";
import StatusBadge from "../common/StatusBadge";

interface TechnicalDetailsWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  availabilityOptions: Record<string, CIADetails>;
  integrityOptions: Record<string, CIADetails>;
  confidentialityOptions: Record<string, CIADetails>;
}

const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
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
  } => {
    let options: Record<string, CIADetails>;
    let level: string;

    switch (component) {
      case "availability":
        options = availabilityOptions;
        level = availability;
        break;
      case "integrity":
        options = integrityOptions;
        level = integrity;
        break;
      case "confidentiality":
        options = confidentialityOptions;
        level = confidentiality;
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
    <div className="space-y-4" data-testid="technical-details-widget">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`py-2 px-4 ${
            activeTab === "availability"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("availability")}
          data-testid="availability-tab"
        >
          ⏱️ Availability
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "integrity"
              ? "border-b-2 border-green-500 text-green-600 dark:text-green-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("integrity")}
          data-testid="integrity-tab"
        >
          🔐 Integrity
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "confidentiality"
              ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("confidentiality")}
          data-testid="confidentiality-tab"
        >
          🔏 Confidentiality
        </button>
      </div>

      {/* Technical Details Section */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-3">
          <h3
            className="font-medium flex items-center"
            data-testid="technical-header"
          >
            <span className="mr-2">⚙️</span>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Technical
            Details
          </h3>
          <ValueDisplay
            value={
              activeTab === "availability"
                ? availability
                : activeTab === "integrity"
                ? integrity
                : confidentiality
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
          className="text-sm text-gray-600 dark:text-gray-300 mb-3 p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
          data-testid="technical-description"
        >
          {activeDetails.technical}
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Implementation Complexity</h4>
            <StatusBadge
              status={getComplexityStatus(activeDetails.complexity)}
              size="sm"
              testId={`${activeTab}-complexity`}
            >
              {activeDetails.complexity} Complexity
            </StatusBadge>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3
          className="font-medium flex items-center mb-3"
          data-testid="implementation-header"
        >
          <span className="mr-2">📋</span>
          Implementation Steps
        </h3>

        <ol className="list-decimal pl-5 space-y-2">
          {activeDetails.implementation.map((step, index) => (
            <li
              key={index}
              className="text-sm text-gray-600 dark:text-gray-300 pl-1"
              data-testid={`implementation-step-${index}`}
            >
              {step}
            </li>
          ))}
        </ol>

        {/* Technology Stack Recommendations */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2">Recommended Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {getTechnologyStack(
              activeTab,
              activeTab === "availability"
                ? availability
                : activeTab === "integrity"
                ? integrity
                : confidentiality
            ).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                data-testid={`tech-stack-${index}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Requirements */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3
          className="font-medium flex items-center mb-3"
          data-testid="resources-header"
        >
          <span className="mr-2">🛠️</span>
          Resource Requirements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
            <h5 className="text-xs text-gray-500 dark:text-gray-400">
              Development Effort
            </h5>
            <p
              className="mt-1 text-md font-semibold"
              data-testid="development-effort"
            >
              {activeTab === "availability"
                ? IMPLEMENTATION_COSTS?.[availability]?.developmentEffort ||
                  `${availability} Level`
                : activeTab === "integrity"
                ? IMPLEMENTATION_COSTS?.[integrity]?.developmentEffort ||
                  `${integrity} Level`
                : IMPLEMENTATION_COSTS?.[confidentiality]?.developmentEffort ||
                  `${confidentiality} Level`}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
            <h5 className="text-xs text-gray-500 dark:text-gray-400">
              Maintenance
            </h5>
            <p
              className="mt-1 text-md font-semibold"
              data-testid="maintenance-level"
            >
              {activeTab === "availability"
                ? IMPLEMENTATION_COSTS?.[availability]?.maintenance ||
                  `${availability} Complexity`
                : activeTab === "integrity"
                ? IMPLEMENTATION_COSTS?.[integrity]?.maintenance ||
                  `${integrity} Complexity`
                : IMPLEMENTATION_COSTS?.[confidentiality]?.maintenance ||
                  `${confidentiality} Complexity`}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
            <h5 className="text-xs text-gray-500 dark:text-gray-400">
              Required Expertise
            </h5>
            <p
              className="mt-1 text-md font-semibold"
              data-testid="required-expertise"
            >
              {activeTab === "availability" && availability === "None"
                ? "Basic IT"
                : activeTab === "availability" && availability === "Low"
                ? "System Administration"
                : activeTab === "availability" && availability === "Moderate"
                ? "Network Engineering"
                : activeTab === "availability" && availability === "High"
                ? "Cloud Architecture"
                : activeTab === "availability"
                ? "Enterprise Architecture"
                : activeTab === "integrity" && integrity === "None"
                ? "Basic IT"
                : activeTab === "integrity" && integrity === "Low"
                ? "Software Development"
                : activeTab === "integrity" && integrity === "Moderate"
                ? "Security Engineering"
                : activeTab === "integrity" && integrity === "High"
                ? "Cryptography"
                : activeTab === "integrity"
                ? "Formal Verification"
                : confidentiality === "None"
                ? "Basic IT"
                : confidentiality === "Low"
                ? "IT Security"
                : confidentiality === "Moderate"
                ? "Information Security"
                : confidentiality === "High"
                ? "Encryption Specialist"
                : "Security Architect"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsWidget;
