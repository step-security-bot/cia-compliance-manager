import React, { useState } from "react";
import {
  SECURITY_LEVELS,
  SECURITY_SUMMARY_TITLES,
  SECURITY_DESCRIPTIONS,
  SECURITY_RECOMMENDATIONS,
  UI_ICONS,
  UI_TEXT,
  SECURITY_LEVEL_COLORS,
  SecurityLevelKey,
  ROI_ESTIMATES,
  DETAILED_VALUE_POINTS, // Add this missing import
} from "../../constants/appConstants";
import { BUSINESS_KEY_BENEFITS } from "../../constants";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../../hooks/useCIAOptions";

// Add CSS animation classes at the top
const animationStyles = {
  fadeIn: {
    animation: "fadeIn 0.3s ease-in-out",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

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

  const summary = getSummary();
  const normalizedLevel = getNormalizedLevel(
    securityLevel === "Basic" ? "LOW" : securityLevel
  );
  const keyBenefits = BUSINESS_KEY_BENEFITS[normalizedLevel] || [];
  const valuePoints = DETAILED_VALUE_POINTS[normalizedLevel] || [];
  const roiEstimate = ROI_ESTIMATES[normalizedLevel] || "Unknown";
  const technicalDetails = getTechnicalDetails();
  const metrics = getMetrics();
  const businessImpact = getBusinessImpact();
  const compositeDescription = getCompositeDescription();

  return (
    <div className="space-y-4" data-testid="security-summary-container">
      {/* Title and security level indicator */}
      <div
        className={`rounded-lg p-4 ${summary.bgColor} ${summary.borderColor} border transition-colors duration-300 shadow-sm`}
        data-testid="security-level-indicator"
      >
        <div
          className={`text-lg font-medium ${summary.colorClass} flex items-center`}
          data-testid="security-summary-title"
        >
          <span className="mr-2 text-xl" data-testid="security-icon">
            {summary.emoji}
          </span>
          {summary.title}
        </div>

        {/* Display individual component levels when they're mixed */}
        {(actualAvailabilityLevel !== securityLevel ||
          actualIntegrityLevel !== securityLevel ||
          actualConfidentialityLevel !== securityLevel) && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Security components:
            <span className="ml-1 font-medium">
              A:{actualAvailabilityLevel}
            </span>{" "}
            /<span className="ml-1 font-medium">I:{actualIntegrityLevel}</span>{" "}
            /
            <span className="ml-1 font-medium">
              C:{actualConfidentialityLevel}
            </span>
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
      </div>

      {/* Technical Implementation - Expandable */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <button
          onClick={() => toggleSection("technical")}
          className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-expanded={expandedSections.technical}
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
          <div className="mt-3 space-y-3" style={animationStyles.fadeIn}>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">⏱️</span> Availability
              </h5>
              <p className="text-sm">{technicalDetails.availability}</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">🔐</span> Integrity
              </h5>
              <p className="text-sm">{technicalDetails.integrity}</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">🔏</span> Confidentiality
              </h5>
              <p className="text-sm">{technicalDetails.confidentiality}</p>
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
          <div className="mt-3 space-y-3" style={animationStyles.fadeIn}>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">⏱️</span> Availability Impact
              </h5>
              <p className="text-sm">{businessImpact.availability}</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">🔐</span> Integrity Impact
              </h5>
              <p className="text-sm">{businessImpact.integrity}</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
              <h5 className="text-xs font-semibold mb-1 flex items-center">
                <span className="mr-1">🔏</span> Confidentiality Impact
              </h5>
              <p className="text-sm">{businessImpact.confidentiality}</p>
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
          <div className="mt-3" style={animationStyles.fadeIn}>
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
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Key Benefits
        </h4>
        {keyBenefits.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {keyBenefits.map((benefit, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                {benefit}
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
          className="text-sm text-gray-600 dark:text-gray-300 mb-3"
          data-testid="security-recommendation"
        >
          {summary.recommendation}
        </p>

        {/* Recommendation badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Keep the existing badges */}
          {securityLevel === "None" && (
            <>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded dark:bg-red-900 dark:text-red-300">
                High Risk
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded dark:bg-yellow-900 dark:text-yellow-300">
                Not Recommended
              </span>
            </>
          )}
          {securityLevel === "Low" && (
            <>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded dark:bg-yellow-900 dark:text-yellow-300">
                Limited Protection
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded dark:bg-blue-900 dark:text-blue-300">
                Public Data Only
              </span>
            </>
          )}
          {securityLevel === "Moderate" && (
            <>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded dark:bg-blue-900 dark:text-blue-300">
                Compliance Ready
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-green-900 dark:text-green-300">
                Good Balance
              </span>
            </>
          )}
          {securityLevel === "High" && (
            <>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-green-900 dark:text-green-300">
                Strong Protection
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded dark:bg-purple-900 dark:text-purple-300">
                Sensitive Data Ready
              </span>
            </>
          )}
          {securityLevel === "Very High" && (
            <>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded dark:bg-indigo-900 dark:text-indigo-300">
                Maximum Security
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded dark:bg-purple-900 dark:text-purple-300">
                Mission Critical
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySummaryWidget;
