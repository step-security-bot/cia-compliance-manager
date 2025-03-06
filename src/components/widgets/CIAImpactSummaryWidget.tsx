import React from "react";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import ValueDisplay from "../common/ValueDisplay";

interface CIAImpactSummaryWidgetProps {
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  testId?: string;
  className?: string;
}

/**
 * Widget to display the CIA impact levels in a compact summary format
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  testId = WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY,
  className = "",
}) => {
  // Apply default "None" for any undefined or empty values
  const availabilityLevel =
    !availability || availability === "" ? "None" : availability;
  const integrityLevel = !integrity || integrity === "" ? "None" : integrity;
  const confidentialityLevel =
    !confidentiality || confidentiality === "" ? "None" : confidentiality;

  // Helper function to determine color variant based on security level
  const getVariant = (level: string) => {
    switch (level) {
      case "None":
        return "default";
      case "Low":
        return "warning";
      case "Moderate":
        return "info";
      case "High":
        return "primary";
      case "Very High":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div
      className="cia-impact-summary p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
      data-testid={testId}
    >
      <h3 className="text-md font-medium mb-3 flex items-center">
        <span className="mr-2">🛡️</span>
        CIA Security Profile
      </h3>
      <div className="space-y-3">
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-availability-row`}
        >
          <span className="text-sm">Availability:</span>
          <span
            data-testid={`${testId}-availability-level`}
            className={`text-${
              getVariant(availabilityLevel) === "default"
                ? "gray-700 dark:text-gray-300"
                : `${getVariant(availabilityLevel)}-600 dark:text-${getVariant(
                    availabilityLevel
                  )}-400`
            } text-base font-semibold `}
          >
            <ValueDisplay
              value={`${availabilityLevel} Availability`}
              variant={getVariant(availabilityLevel)}
              testId={`${testId}-availability-level-value`}
            />
          </span>
        </div>
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-integrity-row`}
        >
          <span className="text-sm">Integrity:</span>
          <span
            data-testid={`${testId}-integrity-level`}
            className={`text-${
              getVariant(integrityLevel) === "default"
                ? "gray-700 dark:text-gray-300"
                : `${getVariant(integrityLevel)}-600 dark:text-${getVariant(
                    integrityLevel
                  )}-400`
            } text-base font-semibold `}
          >
            <ValueDisplay
              value={`${integrityLevel} Integrity`}
              variant={getVariant(integrityLevel)}
              testId={`${testId}-integrity-level-value`}
            />
          </span>
        </div>
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-confidentiality-row`}
        >
          <span className="text-sm">Confidentiality:</span>
          <span
            data-testid={`${testId}-confidentiality-level`}
            className={`text-${
              getVariant(confidentialityLevel) === "default"
                ? "gray-700 dark:text-gray-300"
                : `${getVariant(
                    confidentialityLevel
                  )}-600 dark:text-${getVariant(confidentialityLevel)}-400`
            } text-base font-semibold `}
          >
            <ValueDisplay
              value={`${confidentialityLevel} Confidentiality`}
              variant={getVariant(confidentialityLevel)}
              testId={`${testId}-confidentiality-level-value`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CIAImpactSummaryWidget;
