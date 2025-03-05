import React, { useState } from "react";
import {
  SECURITY_LEVELS,
  SECURITY_DESCRIPTIONS,
  UI_TEXT,
  SECURITY_LEVEL_COLORS,
} from "../../constants/appConstants"; // Updated to use appConstants instead of coreConstants
import {
  SECURITY_SUMMARY_TITLES,
  SECURITY_RECOMMENDATIONS,
  UI_ICONS,
  ROI_ESTIMATES,
  DETAILED_VALUE_POINTS,
} from "../../constants/appConstants";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../../hooks/useCIAOptions";
import ValueDisplay from "../common/ValueDisplay";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import MetricsCard from "../common/MetricsCard";
import { SUMMARY_TEST_IDS, WIDGET_TEST_IDS } from "../../constants/testIds"; // Updated to include WIDGET_TEST_IDS

// Define type for security level keys
type SecurityLevelKey = "NONE" | "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";

// Add CSS animation classes
const animationStyles = {
  fadeIn: {
    animation: "fadeIn 0.3s ease-in-out",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

// Update the BusinessKeyBenefits reference by importing from types/businessImpact
import {
  BusinessKeyBenefits,
  BusinessKeyBenefit,
} from "../../types/businessImpact";

interface SecuritySummaryWidgetProps {
  securityLevel: string;
  // Add optional props for individual CIA levels
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    technical: boolean;
    value: boolean;
    metrics: boolean;
  }>({
    technical: false,
    value: false,
    metrics: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Use individual components if provided, otherwise use the securityLevel for all
  const actualAvailabilityLevel = availabilityLevel || securityLevel;
  const actualIntegrityLevel = integrityLevel || securityLevel;
  const actualConfidentialityLevel = confidentialityLevel || securityLevel;

  // Add a function to normalize security level for data lookup
  const getDataLookupKey = (level: string): string => {
    // Map "Basic" to "Low" for data lookups
    return level === "Basic" ? "Low" : level;
  };

  const getNormalizedLevel = (level: string): SecurityLevelKey => {
    return level.toUpperCase().replace(/\s+/g, "_") as SecurityLevelKey;
  };

  const getSummary = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return {
          title: SECURITY_SUMMARY_TITLES.VERY_HIGH,
          description: SECURITY_DESCRIPTIONS.VERY_HIGH,
          recommendation: SECURITY_RECOMMENDATIONS.VERY_HIGH,
          emoji: UI_ICONS.SECURITY_VERY_HIGH,
          colorClass: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900",
          borderColor: "border-blue-200 dark:border-blue-800",
          progressColor: SECURITY_LEVEL_COLORS.VERY_HIGH,
          progressPercent: 100,
        };
      case SECURITY_LEVELS.HIGH:
        return {
          title: SECURITY_SUMMARY_TITLES.HIGH,
          description: SECURITY_DESCRIPTIONS.HIGH,
          recommendation: SECURITY_RECOMMENDATIONS.HIGH,
          emoji: UI_ICONS.SECURITY_HIGH,
          colorClass: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900",
          borderColor: "border-green-200 dark:border-green-800",
          progressColor: SECURITY_LEVEL_COLORS.HIGH,
          progressPercent: 80,
        };
      case SECURITY_LEVELS.MODERATE:
        return {
          title: SECURITY_SUMMARY_TITLES.MODERATE,
          description: SECURITY_DESCRIPTIONS.MODERATE,
          recommendation: SECURITY_RECOMMENDATIONS.MODERATE,
          emoji: UI_ICONS.SECURITY_MODERATE,
          colorClass: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          progressColor: SECURITY_LEVEL_COLORS.MODERATE,
          progressPercent: 60,
        };
      case SECURITY_LEVELS.LOW:
        return {
          title: SECURITY_SUMMARY_TITLES.LOW,
          description: SECURITY_DESCRIPTIONS.LOW,
          recommendation: SECURITY_RECOMMENDATIONS.LOW,
          emoji: UI_ICONS.SECURITY_LOW,
          colorClass: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900",
          borderColor: "border-orange-200 dark:border-orange-800",
          progressColor: SECURITY_LEVEL_COLORS.LOW,
          progressPercent: 40,
        };
      case "Basic":
        return {
          title: "Basic Security",
          description: SECURITY_DESCRIPTIONS.LOW,
          recommendation: SECURITY_RECOMMENDATIONS.BASIC,
          emoji: UI_ICONS.BASIC_COMPLIANCE,
          colorClass: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900",
          borderColor: "border-orange-200 dark:border-orange-800",
          progressColor: SECURITY_LEVEL_COLORS.LOW,
          progressPercent: 20,
        };
      default:
        return {
          title: SECURITY_SUMMARY_TITLES.NONE,
          description: SECURITY_DESCRIPTIONS.NONE,
          recommendation: SECURITY_RECOMMENDATIONS.NONE,
          emoji: UI_ICONS.SECURITY_NONE,
          colorClass: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900",
          borderColor: "border-red-200 dark:border-red-800",
          progressColor: SECURITY_LEVEL_COLORS.NONE,
          progressPercent: 0,
        };
    }
  };

  // Get technical details from each CIA component for this security level
  const getTechnicalDetails = () => {
    return {
      availability:
        availabilityOptions[getDataLookupKey(actualAvailabilityLevel)]
          ?.technical || "No data available",
      integrity:
        integrityOptions[getDataLookupKey(actualIntegrityLevel)]?.technical ||
        "No data available",
      confidentiality:
        confidentialityOptions[getDataLookupKey(actualConfidentialityLevel)]
          ?.technical || "No data available",
    };
  };

  // Get metrics for this security level
  const getMetrics = () => {
    return {
      availability: {
        uptime:
          availabilityOptions[getDataLookupKey(actualAvailabilityLevel)]
            ?.uptime || "N/A",
        capex:
          availabilityOptions[getDataLookupKey(actualAvailabilityLevel)]
            ?.capex || 0,
        opex:
          availabilityOptions[getDataLookupKey(actualAvailabilityLevel)]
            ?.opex || 0,
      },
      integrity: {
        method:
          integrityOptions[getDataLookupKey(actualIntegrityLevel)]
            ?.validationMethod || "None",
        capex:
          integrityOptions[getDataLookupKey(actualIntegrityLevel)]?.capex || 0,
        opex:
          integrityOptions[getDataLookupKey(actualIntegrityLevel)]?.opex || 0,
      },
      confidentiality: {
        method:
          confidentialityOptions[getDataLookupKey(actualConfidentialityLevel)]
            ?.protectionMethod || "None",
        capex:
          confidentialityOptions[getDataLookupKey(actualConfidentialityLevel)]
            ?.capex || 0,
        opex:
          confidentialityOptions[getDataLookupKey(actualConfidentialityLevel)]
            ?.opex || 0,
      },
    };
  };

  // Get business impact for this security level
  const getBusinessImpact = () => {
    return {
      availability:
        availabilityOptions[getDataLookupKey(actualAvailabilityLevel)]
          ?.businessImpact || "No data",
      integrity:
        integrityOptions[getDataLookupKey(actualIntegrityLevel)]
          ?.businessImpact || "No data",
      confidentiality:
        confidentialityOptions[getDataLookupKey(actualConfidentialityLevel)]
          ?.businessImpact || "No data",
    };
  };

  // Calculate a composite description when we have mixed security levels
  const getCompositeDescription = () => {
    if (
      actualAvailabilityLevel === actualIntegrityLevel &&
      actualIntegrityLevel === actualConfidentialityLevel
    ) {
      // If all the same, just use the standard description
      return summary.description;
    }

    // Otherwise, generate a composite description
    return `Mixed security profile with ${actualAvailabilityLevel} Availability, ${actualIntegrityLevel} Integrity, and ${actualConfidentialityLevel} Confidentiality. This non-uniform approach creates an unbalanced security posture that may require additional scrutiny.`;
  };

  // Get variant based on security level for ValueDisplay
  const getLevelVariant = (
    level: string
  ): "default" | "primary" | "success" | "warning" | "danger" | "info" => {
    switch (level) {
      case SECURITY_LEVELS.VERY_HIGH:
        return "success";
      case SECURITY_LEVELS.HIGH:
        return "primary";
      case SECURITY_LEVELS.MODERATE:
        return "info";
      case SECURITY_LEVELS.LOW:
        return "warning";
      default:
        return "danger";
    }
  };

  const summary = getSummary();
  const normalizedLevel = getNormalizedLevel(securityLevel);
  const keyBenefits = BusinessKeyBenefits[normalizedLevel] || [];
  const valuePoints =
    DETAILED_VALUE_POINTS[
      normalizedLevel as keyof typeof DETAILED_VALUE_POINTS
    ] || [];
  const roiEstimate =
    ROI_ESTIMATES[normalizedLevel as keyof typeof ROI_ESTIMATES] || "Unknown";
  const technicalDetails = getTechnicalDetails();
  const metrics = getMetrics();
  const businessImpact = getBusinessImpact();
  const compositeDescription = getCompositeDescription();

  // Display the ROI value in the component regardless of expanded state
  const roiValueFormatted = roiEstimate || "N/A";

  return (
    <div
      className="space-y-4"
      data-testid={SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER}
    >
      {/* Title and security level indicator */}
      <div
        className={`rounded-lg p-4 ${summary.bgColor} ${summary.borderColor} border transition-colors duration-300 shadow-sm`}
        data-testid={SUMMARY_TEST_IDS.SECURITY_LEVEL_INDICATOR}
      >
        <div
          className={`text-lg font-medium ${summary.colorClass} flex items-center`}
          data-testid={WIDGET_TEST_IDS.SECURITY_SUMMARY_TITLE}
        >
          <span
            className="mr-2 text-xl"
            data-testid={SUMMARY_TEST_IDS.SECURITY_ICON}
          >
            {summary.emoji}
          </span>
          {summary.title}
        </div>

        {/* Display individual component levels when they're mixed */}
        {(actualAvailabilityLevel !== securityLevel ||
          actualIntegrityLevel !== securityLevel ||
          actualConfidentialityLevel !== securityLevel) && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-2">
            <span>Security components:</span>
            <ValueDisplay
              value={actualAvailabilityLevel}
              label="A"
              variant="primary"
              size="sm"
              testId={SUMMARY_TEST_IDS.AVAILABILITY_LEVEL_PILL}
            />
            <ValueDisplay
              value={actualIntegrityLevel}
              label="I"
              variant="success"
              size="sm"
              testId={SUMMARY_TEST_IDS.INTEGRITY_LEVEL_PILL}
            />
            <ValueDisplay
              value={actualConfidentialityLevel}
              label="C"
              variant="info"
              size="sm"
              testId={SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL_PILL}
            />
          </div>
        )}

        {/* Security Level Bar */}
        <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div
            className="h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${summary.progressPercent}%`,
              backgroundColor: summary.progressColor,
            }}
            aria-valuenow={summary.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            data-testid="security-level-progress-bar"
          ></div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Security Overview
        </h4>
        <p
          className="text-sm text-gray-600 dark:text-gray-300"
          data-testid="security-summary-description"
        >
          {compositeDescription}
        </p>

        {/* Add a ROI summary here for easier testing */}
        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
          <KeyValuePair
            label="Est. ROI"
            value={
              <ValueDisplay
                value={roiValueFormatted}
                variant={getLevelVariant(securityLevel)}
                size="sm"
                testId="roi-estimate-summary"
              />
            }
            testId="roi-estimate-pair"
          />
        </div>
      </div>

      {/* Technical Implementation - Expandable */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <button
          onClick={() => toggleSection("technical")}
          className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-expanded={expandedSections.technical}
          data-testid="technical-section-toggle"
          aria-controls="technical-details-section"
        >
          <div className="flex items-center">
            <span className="mr-2">⚙️</span>
            <span>Technical Implementation</span>
          </div>
          <span
            className="transform transition-transform duration-200"
            style={{
              transform: expandedSections.technical
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ⌄
          </span>
        </button>

        {expandedSections.technical && (
          <div
            className="mt-3 space-y-3"
            style={animationStyles.fadeIn}
            data-testid="technical-details-section"
            id="technical-details-section"
          >
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="availability-tech-heading"
              >
                <span className="mr-1">⏱️</span> Availability
              </h5>
              <p className="text-sm" data-testid="availability-tech-details">
                {technicalDetails.availability}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="integrity-tech-heading"
              >
                <span className="mr-1">🔐</span> Integrity
              </h5>
              <p className="text-sm" data-testid="integrity-tech-details">
                {technicalDetails.integrity}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="confidentiality-tech-heading"
              >
                <span className="mr-1">🔏</span> Confidentiality
              </h5>
              <p className="text-sm" data-testid="confidentiality-tech-details">
                {technicalDetails.confidentiality}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Business Impact - Expandable */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <button
          onClick={() => toggleSection("value")}
          className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-expanded={expandedSections.value}
          data-testid="business-impact-toggle"
        >
          <div className="flex items-center">
            <span className="mr-2">📊</span>
            <span>Business Impact</span>
          </div>
          <span
            className="transform transition-transform duration-200"
            style={{
              transform: expandedSections.value
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ⌄
          </span>
        </button>

        {expandedSections.value && (
          <div
            className="mt-3 space-y-3"
            style={animationStyles.fadeIn}
            data-testid="business-impact-section"
          >
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="availability-impact-heading"
              >
                <span className="mr-1">⏱️</span> Availability Impact
              </h5>
              <p className="text-sm" data-testid="availability-impact-details">
                {businessImpact.availability}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="integrity-impact-heading"
              >
                <span className="mr-1">🔐</span> Integrity Impact
              </h5>
              <p className="text-sm" data-testid="integrity-impact-details">
                {businessImpact.integrity}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5
                className="text-xs font-semibold mb-1 flex items-center"
                data-testid="confidentiality-impact-heading"
              >
                <span className="mr-1">🔏</span> Confidentiality Impact
              </h5>
              <p
                className="text-sm"
                data-testid="confidentiality-impact-details"
              >
                {businessImpact.confidentiality}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics - Expandable */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <button
          onClick={() => toggleSection("metrics")}
          className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-expanded={expandedSections.metrics}
          data-testid="metrics-toggle"
        >
          <div className="flex items-center">
            <span className="mr-2">📈</span>
            <span>Key Metrics</span>
          </div>
          <span
            className="transform transition-transform duration-200"
            style={{
              transform: expandedSections.metrics
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ⌄
          </span>
        </button>

        {expandedSections.metrics && (
          <div
            className="mt-3"
            style={animationStyles.fadeIn}
            data-testid="metrics-section"
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                <h5 className="text-xs text-gray-500 dark:text-gray-400">
                  Uptime
                </h5>
                <p className="text-lg font-semibold">
                  {metrics.availability.uptime}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                <h5 className="text-xs text-gray-500 dark:text-gray-400">
                  Total CAPEX
                </h5>
                <p className="text-lg font-semibold">
                  {metrics.availability.capex +
                    metrics.integrity.capex +
                    metrics.confidentiality.capex}
                  %
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                <h5 className="text-xs text-gray-500 dark:text-gray-400">
                  Total OPEX
                </h5>
                <p className="text-lg font-semibold">
                  {metrics.availability.opex +
                    metrics.integrity.opex +
                    metrics.confidentiality.opex}
                  %
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                <h5 className="text-xs text-gray-500 dark:text-gray-400">
                  Est. ROI
                </h5>
                <p className="text-lg font-semibold">{roiEstimate}</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600 text-sm">
              <h5 className="text-xs font-semibold mb-1">Protection Methods</h5>
              <ul className="space-y-1 pl-5 list-disc">
                <li>Integrity: {metrics.integrity.method}</li>
                <li>Confidentiality: {metrics.confidentiality.method}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Key Benefits */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4
          className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          data-testid="key-benefits-heading"
        >
          Key Benefits
        </h4>
        {keyBenefits.length > 0 ? (
          <ul className="space-y-1" data-testid="key-benefits-list">
            {keyBenefits.map((benefit: BusinessKeyBenefit, index: number) => (
              <li
                key={index}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded-md"
                data-testid={`key-benefit-${index}`}
              >
                <StatusBadge status="success" size="xs">
                  <span className="ml-1">
                    {typeof benefit === "string" ? benefit : benefit.title}
                  </span>
                </StatusBadge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No specific benefits at this security level.
          </p>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4
          className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          data-testid="recommendation-heading"
        >
          {UI_TEXT.LABELS.RECOMMENDATION}
        </h4>
        <p
          className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-medium bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
          data-testid="security-recommendation"
        >
          {summary.recommendation}
        </p>

        {/* Replace recommendation badges with StatusBadge */}
        <div className="flex flex-wrap gap-2 mt-2">
          {securityLevel === "None" && (
            <>
              <StatusBadge status="error" testId="badge-high-risk">
                High Risk
              </StatusBadge>
              <StatusBadge status="warning" testId="badge-not-recommended">
                Not Recommended
              </StatusBadge>
            </>
          )}
          {securityLevel === "Low" && (
            <>
              <StatusBadge status="warning" testId="badge-limited-protection">
                Limited Protection
              </StatusBadge>
              <StatusBadge status="info" testId="badge-public-data-only">
                Public Data Only
              </StatusBadge>
            </>
          )}
          {securityLevel === "Moderate" && (
            <>
              <StatusBadge status="info" testId="badge-compliance-ready">
                Compliance Ready
              </StatusBadge>
              <StatusBadge status="success" testId="badge-good-balance">
                Good Balance
              </StatusBadge>
            </>
          )}
          {securityLevel === "High" && (
            <>
              <StatusBadge status="success" testId="badge-strong-protection">
                Strong Protection
              </StatusBadge>
              <StatusBadge status="info" testId="badge-sensitive-data-ready">
                Sensitive Data Ready
              </StatusBadge>
            </>
          )}
          {securityLevel === "Very High" && (
            <>
              <StatusBadge status="success" testId="badge-maximum-security">
                Maximum Security
              </StatusBadge>
              <StatusBadge status="info" testId="badge-mission-critical">
                Mission Critical
              </StatusBadge>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySummaryWidget;
