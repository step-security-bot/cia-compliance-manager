import React, { useState } from "react";
import Selection from "../Selection";
import {
  WIDGET_ICONS,
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  SECURITY_LEVEL_COLORS,
  SecurityLevelKey,
} from "../../constants/appConstants";

interface SecurityLevelWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  availabilityOptions: Record<string, any>;
  integrityOptions: Record<string, any>;
  confidentialityOptions: Record<string, any>;
}

const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  setAvailability,
  setIntegrity,
  setConfidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
  const [hoveredTechnical, setHoveredTechnical] = useState<string | null>(null);

  // Helper function to get color based on security level
  const getLevelColor = (level: string): string => {
    const normalizedLevel = level
      .toUpperCase()
      .replace(/\s+/g, "_") as SecurityLevelKey;
    return SECURITY_LEVEL_COLORS[normalizedLevel] || "#6c757d";
  };

  // Helper function to get technical details
  const getTechnicalDetails = (
    options: Record<string, any>,
    level: string
  ): string => {
    return options[level]?.technical || "No technical details available.";
  };

  // Helper function to get context-specific details for each component
  const getSecurityContextInfo = (
    component: string,
    options: Record<string, any>,
    level: string
  ): string => {
    if (!options[level]) return "";

    switch (component) {
      case "availability":
        // For availability, display uptime information
        if (options[level].uptime) return `${options[level].uptime} uptime`;
        return options[level].impact ? `Impact: ${options[level].impact}` : "";
      case "integrity":
        // For integrity, highlight validation method
        return options[level].validationMethod || options[level].impact || "";
      case "confidentiality":
        // For confidentiality, highlight protection method
        return options[level].protectionMethod || options[level].impact || "";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4" data-testid="security-level-controls">
      {/* Widget Header */}
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-2">{WIDGET_ICONS.SECURITY_LEVEL}</div>
        <h2 className="text-xl font-bold">Security Level Selection</h2>
      </div>

      {/* Availability Selection */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <span className="text-xl mr-2" aria-hidden="true">
            {CIA_COMPONENT_ICONS.AVAILABILITY}
          </span>
          <label
            htmlFor="availability-select"
            className="text-base font-medium text-gray-800 dark:text-gray-200"
            data-testid="availability-label"
          >
            {CIA_LABELS.AVAILABILITY}
          </label>
        </div>

        <Selection
          id="availability-select"
          data-testid="availability-select"
          label=""
          value={availability}
          options={availabilityOptions}
          onChange={setAvailability}
          contextInfo={getSecurityContextInfo(
            "availability",
            availabilityOptions,
            availability
          )}
        />

        {/* Security level indicator */}
        <div className="mt-3 flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: getLevelColor(availability) }}
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="availability-description"
          >
            {availabilityOptions[availability]?.description ||
              "No description available."}
            {availabilityOptions[availability]?.uptime && (
              <span className="ml-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                {availabilityOptions[availability].uptime} uptime
              </span>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("availability")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {/* Technical details popover */}
        {hoveredTechnical === "availability" && (
          <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm">
            <strong>Technical Implementation:</strong>{" "}
            {getTechnicalDetails(availabilityOptions, availability)}
            {availabilityOptions[availability]?.businessImpact && (
              <div className="mt-1">
                <strong>Business Impact:</strong>{" "}
                {availabilityOptions[availability].businessImpact}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Integrity Selection */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <span className="text-xl mr-2" aria-hidden="true">
            {CIA_COMPONENT_ICONS.INTEGRITY}
          </span>
          <label
            htmlFor="integrity-select"
            className="text-base font-medium text-gray-800 dark:text-gray-200"
            data-testid="integrity-label"
          >
            {CIA_LABELS.INTEGRITY}
          </label>
        </div>

        <Selection
          id="integrity-select"
          data-testid="integrity-select"
          label=""
          value={integrity}
          options={integrityOptions}
          onChange={setIntegrity}
          contextInfo={getSecurityContextInfo(
            "integrity",
            integrityOptions,
            integrity
          )}
        />

        {/* Security level indicator */}
        <div className="mt-3 flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: getLevelColor(integrity) }}
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="integrity-description"
          >
            {integrityOptions[integrity]?.description ||
              "No description available."}
            {integrityOptions[integrity]?.validationMethod && (
              <span className="ml-1 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                {integrityOptions[integrity].validationMethod}
              </span>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("integrity")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {/* Technical details popover */}
        {hoveredTechnical === "integrity" && (
          <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm">
            <strong>Technical Implementation:</strong>{" "}
            {getTechnicalDetails(integrityOptions, integrity)}
            {integrityOptions[integrity]?.businessImpact && (
              <div className="mt-1">
                <strong>Business Impact:</strong>{" "}
                {integrityOptions[integrity].businessImpact}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confidentiality Selection */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <span className="text-xl mr-2" aria-hidden="true">
            {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
          </span>
          <label
            htmlFor="confidentiality-select"
            className="text-base font-medium text-gray-800 dark:text-gray-200"
            data-testid="confidentiality-label"
          >
            {CIA_LABELS.CONFIDENTIALITY}
          </label>
        </div>

        <Selection
          id="confidentiality-select"
          data-testid="confidentiality-select"
          label=""
          value={confidentiality}
          options={confidentialityOptions}
          onChange={setConfidentiality}
          contextInfo={getSecurityContextInfo(
            "confidentiality",
            confidentialityOptions,
            confidentiality
          )}
        />

        {/* Security level indicator */}
        <div className="mt-3 flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: getLevelColor(confidentiality) }}
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="confidentiality-description"
          >
            {confidentialityOptions[confidentiality]?.description ||
              "No description available."}
            {confidentialityOptions[confidentiality]?.protectionMethod && (
              <span className="ml-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
                {confidentialityOptions[confidentiality].protectionMethod}
              </span>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("confidentiality")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {/* Technical details popover */}
        {hoveredTechnical === "confidentiality" && (
          <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm">
            <strong>Technical Implementation:</strong>{" "}
            {getTechnicalDetails(confidentialityOptions, confidentiality)}
            {confidentialityOptions[confidentiality]?.businessImpact && (
              <div className="mt-1">
                <strong>Business Impact:</strong>{" "}
                {confidentialityOptions[confidentiality].businessImpact}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
