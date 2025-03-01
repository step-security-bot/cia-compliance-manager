import React from "react";
import {
  SECURITY_LEVELS,
  IMPACT_DESCRIPTIONS,
  BUSINESS_IMPACTS,
  UI_TEXT,
  SecurityLevelKey, // Import the type
} from "../../constants/appConstants";

interface ImpactAnalysisWidgetProps {
  category: "Availability" | "Integrity" | "Confidentiality";
  level: string;
}

const ImpactAnalysisWidget: React.FC<ImpactAnalysisWidgetProps> = ({
  category,
  level,
}) => {
  // Add these helper lookups to simplify the switch statements
  const getImpactDescription = () => {
    // Strongly typed map of category to impact descriptions
    const impactMap = {
      Availability: IMPACT_DESCRIPTIONS.AVAILABILITY,
      Integrity: IMPACT_DESCRIPTIONS.INTEGRITY,
      Confidentiality: IMPACT_DESCRIPTIONS.CONFIDENTIALITY,
    };

    // Strongly typed map of security levels to keys
    const levelMap: Record<string, SecurityLevelKey> = {
      [SECURITY_LEVELS.VERY_HIGH]: "VERY_HIGH",
      [SECURITY_LEVELS.HIGH]: "HIGH",
      [SECURITY_LEVELS.MODERATE]: "MODERATE",
      [SECURITY_LEVELS.LOW]: "LOW",
      [SECURITY_LEVELS.NONE]: "NONE",
    };

    const safeLevel = levelMap[level] || "NONE";
    return impactMap[category][safeLevel];
  };

  const getBusinessImpact = () => {
    // Strongly typed map of category to business impacts
    const impactMap = {
      Availability: BUSINESS_IMPACTS.AVAILABILITY,
      Integrity: BUSINESS_IMPACTS.INTEGRITY,
      Confidentiality: BUSINESS_IMPACTS.CONFIDENTIALITY,
    };

    // Strongly typed map of security levels to keys
    const levelMap: Record<string, SecurityLevelKey> = {
      [SECURITY_LEVELS.VERY_HIGH]: "VERY_HIGH",
      [SECURITY_LEVELS.HIGH]: "HIGH",
      [SECURITY_LEVELS.MODERATE]: "MODERATE",
      [SECURITY_LEVELS.LOW]: "LOW",
      [SECURITY_LEVELS.NONE]: "NONE",
    };

    const safeLevel = levelMap[level] || "NONE";
    return impactMap[category][safeLevel];
  };

  return (
    <div
      className="space-y-3"
      data-testid={`impact-analysis-${category.toLowerCase()}`}
    >
      <div className="flex items-center mb-2">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            level === SECURITY_LEVELS.VERY_HIGH
              ? "bg-green-500"
              : level === SECURITY_LEVELS.HIGH
              ? "bg-blue-500"
              : level === SECURITY_LEVELS.MODERATE
              ? "bg-yellow-500"
              : level === SECURITY_LEVELS.LOW
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
          data-testid={`impact-level-indicator-${category.toLowerCase()}`}
        ></span>
        <span
          className="text-sm font-medium"
          data-testid={`impact-level-text-${category.toLowerCase()}`}
        >
          {level} {category}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p
          className="mb-2"
          data-testid={`impact-description-${category.toLowerCase()}`}
        >
          {getImpactDescription()}
        </p>
        <p
          className="font-medium text-sm mt-2"
          data-testid="business-impact-heading"
        >
          {UI_TEXT.LABELS.BUSINESS_IMPACT}
        </p>
        <p data-testid={`business-impact-${category.toLowerCase()}`}>
          {getBusinessImpact()}
        </p>
      </div>
    </div>
  );
};

export default ImpactAnalysisWidget;
