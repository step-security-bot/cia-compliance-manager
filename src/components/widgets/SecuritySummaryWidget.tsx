import React from "react";
import {
  SECURITY_LEVELS,
  SECURITY_SUMMARY_TITLES,
  SECURITY_DESCRIPTIONS,
  SECURITY_RECOMMENDATIONS,
  UI_ICONS,
  UI_TEXT,
  SECURITY_LEVEL_COLORS,
  SecurityLevelKey,
} from "../../constants/appConstants";
import { BUSINESS_KEY_BENEFITS } from "../../constants";

interface SecuritySummaryWidgetProps {
  securityLevel: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
}) => {
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

  const summary = getSummary();
  const normalizedLevel = getNormalizedLevel(
    securityLevel === "Basic" ? "LOW" : securityLevel
  );
  // Get key benefits for this level from businessConstants
  const keyBenefits = BUSINESS_KEY_BENEFITS[normalizedLevel] || [];

  return (
    <div className="space-y-4">
      {/* Title and security level indicator */}
      <div
        className={`rounded-lg p-4 ${summary.bgColor} ${summary.borderColor} border transition-colors duration-300`}
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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Security Overview
        </h4>
        <p
          className="text-sm text-gray-600 dark:text-gray-300"
          data-testid="security-summary-description"
        >
          {summary.description}
        </p>
      </div>

      {/* Key Benefits */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
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
