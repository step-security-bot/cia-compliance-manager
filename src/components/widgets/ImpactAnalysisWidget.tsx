import React from "react";
import {
  SECURITY_LEVELS,
  IMPACT_DESCRIPTIONS,
  BUSINESS_IMPACTS,
  UI_TEXT,
} from "../../constants/appConstants";

interface ImpactAnalysisWidgetProps {
  category: "Availability" | "Integrity" | "Confidentiality";
  level: string;
}

const ImpactAnalysisWidget: React.FC<ImpactAnalysisWidgetProps> = ({
  category,
  level,
}) => {
  // Impact descriptions based on category and level
  const getImpactDescription = () => {
    switch (category) {
      case "Availability":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return IMPACT_DESCRIPTIONS.AVAILABILITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return IMPACT_DESCRIPTIONS.AVAILABILITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return IMPACT_DESCRIPTIONS.AVAILABILITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return IMPACT_DESCRIPTIONS.AVAILABILITY.LOW;
          default:
            return IMPACT_DESCRIPTIONS.AVAILABILITY.NONE;
        }
      case "Integrity":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return IMPACT_DESCRIPTIONS.INTEGRITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return IMPACT_DESCRIPTIONS.INTEGRITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return IMPACT_DESCRIPTIONS.INTEGRITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return IMPACT_DESCRIPTIONS.INTEGRITY.LOW;
          default:
            return IMPACT_DESCRIPTIONS.INTEGRITY.NONE;
        }
      case "Confidentiality":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return IMPACT_DESCRIPTIONS.CONFIDENTIALITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return IMPACT_DESCRIPTIONS.CONFIDENTIALITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return IMPACT_DESCRIPTIONS.CONFIDENTIALITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return IMPACT_DESCRIPTIONS.CONFIDENTIALITY.LOW;
          default:
            return IMPACT_DESCRIPTIONS.CONFIDENTIALITY.NONE;
        }
    }
  };

  const getBusinessImpact = () => {
    switch (category) {
      case "Availability":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return BUSINESS_IMPACTS.AVAILABILITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return BUSINESS_IMPACTS.AVAILABILITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return BUSINESS_IMPACTS.AVAILABILITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return BUSINESS_IMPACTS.AVAILABILITY.LOW;
          default:
            return BUSINESS_IMPACTS.AVAILABILITY.NONE;
        }
      case "Integrity":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return BUSINESS_IMPACTS.INTEGRITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return BUSINESS_IMPACTS.INTEGRITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return BUSINESS_IMPACTS.INTEGRITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return BUSINESS_IMPACTS.INTEGRITY.LOW;
          default:
            return BUSINESS_IMPACTS.INTEGRITY.NONE;
        }
      case "Confidentiality":
        switch (level) {
          case SECURITY_LEVELS.VERY_HIGH:
            return BUSINESS_IMPACTS.CONFIDENTIALITY.VERY_HIGH;
          case SECURITY_LEVELS.HIGH:
            return BUSINESS_IMPACTS.CONFIDENTIALITY.HIGH;
          case SECURITY_LEVELS.MODERATE:
            return BUSINESS_IMPACTS.CONFIDENTIALITY.MODERATE;
          case SECURITY_LEVELS.LOW:
            return BUSINESS_IMPACTS.CONFIDENTIALITY.LOW;
          default:
            return BUSINESS_IMPACTS.CONFIDENTIALITY.NONE;
        }
    }
  };

  return (
    <div className="space-y-3">
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
        ></span>
        <span className="text-sm font-medium">
          {level} {category}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p className="mb-2">{getImpactDescription()}</p>
        <p className="font-medium text-sm mt-2">
          {UI_TEXT.LABELS.BUSINESS_IMPACT}
        </p>
        <p>{getBusinessImpact()}</p>
      </div>
    </div>
  );
};

export default ImpactAnalysisWidget;
