import React from "react";
import {
  SECURITY_LEVELS,
  SECURITY_SUMMARY_TITLES,
  SECURITY_DESCRIPTIONS,
  SECURITY_RECOMMENDATIONS,
  UI_ICONS,
  UI_TEXT,
} from "../../constants/appConstants";

interface SecuritySummaryWidgetProps {
  securityLevel: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
}) => {
  const getSummary = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return {
          title: SECURITY_SUMMARY_TITLES.VERY_HIGH,
          description: SECURITY_DESCRIPTIONS.VERY_HIGH,
          recommendation: SECURITY_RECOMMENDATIONS.VERY_HIGH,
          emoji: UI_ICONS.SECURITY_VERY_HIGH,
          colorClass: "text-green-600 dark:text-green-400",
        };
      case SECURITY_LEVELS.HIGH:
        return {
          title: SECURITY_SUMMARY_TITLES.HIGH,
          description: SECURITY_DESCRIPTIONS.HIGH,
          recommendation: SECURITY_RECOMMENDATIONS.HIGH,
          emoji: UI_ICONS.SECURITY_HIGH,
          colorClass: "text-blue-600 dark:text-blue-400",
        };
      case SECURITY_LEVELS.MODERATE:
        return {
          title: SECURITY_SUMMARY_TITLES.MODERATE,
          description: SECURITY_DESCRIPTIONS.MODERATE,
          recommendation: SECURITY_RECOMMENDATIONS.MODERATE,
          emoji: UI_ICONS.SECURITY_MODERATE,
          colorClass: "text-yellow-600 dark:text-yellow-400",
        };
      case SECURITY_LEVELS.LOW:
        return {
          title: SECURITY_SUMMARY_TITLES.LOW,
          description: SECURITY_DESCRIPTIONS.LOW,
          recommendation: SECURITY_RECOMMENDATIONS.LOW,
          emoji: UI_ICONS.SECURITY_LOW,
          colorClass: "text-orange-600 dark:text-orange-400",
        };
      case "Basic":
        return {
          title: "Basic Security",
          description: SECURITY_DESCRIPTIONS.LOW,
          recommendation: SECURITY_RECOMMENDATIONS.BASIC,
          emoji: UI_ICONS.BASIC_COMPLIANCE,
          colorClass: "text-orange-600 dark:text-orange-400",
        };
      default:
        return {
          title: SECURITY_SUMMARY_TITLES.NONE,
          description: SECURITY_DESCRIPTIONS.NONE,
          recommendation: SECURITY_RECOMMENDATIONS.NONE,
          emoji: UI_ICONS.SECURITY_NONE,
          colorClass: "text-red-600 dark:text-red-400",
        };
    }
  };

  const summary = getSummary();

  return (
    <div className="space-y-3">
      <div
        className={`text-lg font-medium ${summary.colorClass} flex items-center`}
      >
        <span className="mr-2 text-xl" data-testid="security-icon">
          {summary.emoji}
        </span>
        {summary.title}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {summary.description}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium mb-2">
          {UI_TEXT.LABELS.RECOMMENDATION}:
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {summary.recommendation}
        </p>
      </div>
    </div>
  );
};

export default SecuritySummaryWidget;
