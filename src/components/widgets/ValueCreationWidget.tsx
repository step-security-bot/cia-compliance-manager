import React from "react";
import {
  SECURITY_LEVELS,
  VALUE_CREATION_POINTS,
  ROI_ESTIMATES,
  UI_TEXT,
  DETAILED_VALUE_POINTS,
} from "../../constants/appConstants";
import { ensureArray } from "../../utils/typeGuards";
import ValueDisplay from "../common/ValueDisplay";
import KeyValuePair from "../common/KeyValuePair";

interface ValueCreationWidgetProps {
  securityLevel: string;
}

const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel,
}) => {
  // Create a mapping to simplify the getValuePoints function
  const getValuePoints = () => {
    const levelMap: Record<string, string[]> = {
      [SECURITY_LEVELS.VERY_HIGH]: [
        VALUE_CREATION_POINTS.VERY_HIGH,
        ...DETAILED_VALUE_POINTS.VERY_HIGH,
      ],
      [SECURITY_LEVELS.HIGH]: [
        VALUE_CREATION_POINTS.HIGH,
        ...DETAILED_VALUE_POINTS.HIGH,
      ],
      [SECURITY_LEVELS.MODERATE]: [
        VALUE_CREATION_POINTS.MODERATE,
        ...DETAILED_VALUE_POINTS.MODERATE,
      ],
      [SECURITY_LEVELS.LOW]: [
        VALUE_CREATION_POINTS.LOW,
        ...DETAILED_VALUE_POINTS.LOW,
      ],
      [SECURITY_LEVELS.NONE]: [
        VALUE_CREATION_POINTS.NONE,
        ...DETAILED_VALUE_POINTS.NONE,
      ],
    };

    return levelMap[securityLevel] || levelMap[SECURITY_LEVELS.NONE];
  };

  const valuePoints = getValuePoints();

  // Get ROI estimation based on security level
  const getROIEstimate = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return ROI_ESTIMATES.VERY_HIGH;
      case SECURITY_LEVELS.HIGH:
        return ROI_ESTIMATES.HIGH;
      case SECURITY_LEVELS.MODERATE:
        return ROI_ESTIMATES.MODERATE;
      case SECURITY_LEVELS.LOW:
        return ROI_ESTIMATES.LOW;
      default:
        return ROI_ESTIMATES.NONE;
    }
  };

  const roiEstimate = getROIEstimate();

  // Color styling based on level
  const getLevelVariant = () => {
    switch (securityLevel) {
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

  // Get text color class based on security level
  const getLevelColorClass = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return "text-green-600 dark:text-green-400";
      case SECURITY_LEVELS.HIGH:
        return "text-blue-600 dark:text-blue-400";
      case SECURITY_LEVELS.MODERATE:
        return "text-yellow-600 dark:text-yellow-400";
      case SECURITY_LEVELS.LOW:
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-4" data-testid="value-creation-content">
      <div className="mb-3">
        <h3
          className={`text-lg font-medium ${getLevelColorClass()}`}
          data-testid="value-creation-title"
        >
          {securityLevel === SECURITY_LEVELS.NONE
            ? UI_TEXT.VALUE_CREATION.NONE_TITLE
            : UI_TEXT.VALUE_CREATION.WITH_LEVEL(securityLevel)}
        </h3>
        <p
          className="text-sm text-gray-600 dark:text-gray-300 mt-1"
          data-testid="value-creation-subtitle"
        >
          {UI_TEXT.LABELS.BUSINESS_VALUE}
        </p>
      </div>

      <ul className="space-y-2" data-testid="value-points-list">
        {ensureArray(valuePoints).map((point, index) => (
          <li
            key={index}
            className="flex items-start bg-gray-50 dark:bg-gray-800 p-2.5 rounded-md border border-gray-100 dark:border-gray-700"
            data-testid={`value-point-${index}`}
          >
            <span className={`mr-2 ${getLevelColorClass()}`}>•</span>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {point}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <KeyValuePair
          label={UI_TEXT.LABELS.ESTIMATED_ROI}
          value={
            <ValueDisplay
              value={roiEstimate}
              variant={getLevelVariant()}
              testId="roi-value"
            />
          }
          testId="roi-section"
          highlighted={true}
        />
      </div>
    </div>
  );
};

export default ValueCreationWidget;
