import React, { useState } from "react";
import Selection from "../Selection";
import {
  WIDGET_ICONS,
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  SECURITY_LEVEL_COLORS,
  SecurityLevelKey,
} from "../../constants/appConstants";
import ValueDisplay from "../common/ValueDisplay";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";

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

  // Get variant based on component type
  const getComponentVariant = (
    component: string
  ): "primary" | "success" | "info" => {
    switch (component) {
      case "availability":
        return "primary";
      case "integrity":
        return "success";
      case "confidentiality":
        return "info";
      default:
        return "primary";
    }
  };

  // Get variant based on security level
  const getLevelVariant = (
    level: string
  ): "success" | "warning" | "danger" | "info" | "primary" => {
    switch (level) {
      case "None":
        return "danger";
      case "Low":
        return "warning";
      case "Moderate":
        return "info";
      case "High":
        return "success";
      case "Very High":
        return "primary";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-4" data-testid="security-level-controls">
      {/* Widget Header */}
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-2">{WIDGET_ICONS.SECURITY_LEVEL}</div>
        <h2 className="text-xl font-bold">Security Level Selection</h2>
      </div>

      {/* Availability Section - Updated to use ValueDisplay */}
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
          {/* Replace custom div with ValueDisplay */}
          <div className="ml-auto">
            <ValueDisplay
              value={availability}
              variant="primary"
              size="sm"
              testId="availability-selected-level"
            />
          </div>
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
            data-testid="availability-color-indicator"
            aria-hidden="true"
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="availability-description"
          >
            {availabilityOptions[availability]?.description ||
              "No description available."}
            {availabilityOptions[availability]?.uptime && (
              <StatusBadge
                status="info"
                size="xs"
                testId="availability-uptime-badge"
                className="ml-1"
              >
                {availabilityOptions[availability].uptime} uptime
              </StatusBadge>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("availability")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
            data-testid="availability-technical-info-button"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {/* Technical details popover - Updated with KeyValuePair */}
        {hoveredTechnical === "availability" && (
          <div
            className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm"
            data-testid="availability-technical-popover"
          >
            <KeyValuePair
              label="Technical Implementation"
              value={getTechnicalDetails(availabilityOptions, availability)}
              testId="availability-technical-details"
            />
            {availabilityOptions[availability]?.businessImpact && (
              <KeyValuePair
                label="Business Impact"
                value={availabilityOptions[availability].businessImpact}
                testId="availability-business-impact"
                className="mt-1"
              />
            )}
          </div>
        )}
      </div>

      {/* Integrity Section - Updated similarly to Availability section */}
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
          <div className="ml-auto">
            <ValueDisplay
              value={integrity}
              variant="success"
              size="sm"
              testId="integrity-selected-level"
            />
          </div>
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
            data-testid="integrity-color-indicator"
            aria-hidden="true"
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="integrity-description"
          >
            {integrityOptions[integrity]?.description ||
              "No description available."}
            {integrityOptions[integrity]?.validationMethod && (
              <StatusBadge
                status="success"
                size="xs"
                testId="integrity-validation-badge"
                className="ml-1"
              >
                {integrityOptions[integrity].validationMethod}
              </StatusBadge>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("integrity")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
            data-testid="integrity-technical-info-button"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {hoveredTechnical === "integrity" && (
          <div
            className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm"
            data-testid="integrity-technical-popover"
          >
            <KeyValuePair
              label="Technical Implementation"
              value={getTechnicalDetails(integrityOptions, integrity)}
              testId="integrity-technical-details"
            />
            {integrityOptions[integrity]?.businessImpact && (
              <KeyValuePair
                label="Business Impact"
                value={integrityOptions[integrity].businessImpact}
                testId="integrity-business-impact"
                className="mt-1"
              />
            )}
          </div>
        )}
      </div>

      {/* Confidentiality Section - Updated similarly */}
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
          <div className="ml-auto">
            <ValueDisplay
              value={confidentiality}
              variant="info"
              size="sm"
              testId="confidentiality-selected-level"
            />
          </div>
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
            data-testid="confidentiality-color-indicator"
            aria-hidden="true"
          ></div>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 flex-grow"
            data-testid="confidentiality-description"
          >
            {confidentialityOptions[confidentiality]?.description ||
              "No description available."}
            {confidentialityOptions[confidentiality]?.protectionMethod && (
              <StatusBadge
                status="info"
                size="xs"
                testId="confidentiality-protection-badge"
                className="ml-1"
              >
                {confidentialityOptions[confidentiality].protectionMethod}
              </StatusBadge>
            )}
          </p>
          <button
            className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onMouseEnter={() => setHoveredTechnical("confidentiality")}
            onMouseLeave={() => setHoveredTechnical(null)}
            aria-label="Show technical details"
            data-testid="confidentiality-technical-info-button"
          >
            {WIDGET_ICONS.TECHNICAL_IMPLEMENTATION}
          </button>
        </div>

        {hoveredTechnical === "confidentiality" && (
          <div
            className="mt-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 text-sm"
            data-testid="confidentiality-technical-popover"
          >
            <KeyValuePair
              label="Technical Implementation"
              value={getTechnicalDetails(
                confidentialityOptions,
                confidentiality
              )}
              testId="confidentiality-technical-details"
            />
            {confidentialityOptions[confidentiality]?.businessImpact && (
              <KeyValuePair
                label="Business Impact"
                value={confidentialityOptions[confidentiality].businessImpact}
                testId="confidentiality-business-impact"
                className="mt-1"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
