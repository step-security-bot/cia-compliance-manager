import React from "react";
import ValueDisplay from "../common/ValueDisplay";
import { WIDGET_ICONS, CIA_LABELS } from "../../constants";

interface CIAImpactSummaryWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  testId?: string;
}

/**
 * Displays a summary of CIA impact levels in a format that's easily testable
 * and meets the requirements of the test suite
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  testId = "cia-impact-summary",
}) => {
  // Helper to determine ValueDisplay variant based on security level
  const getVariant = (
    level: string
  ): "default" | "primary" | "success" | "warning" | "danger" | "info" => {
    switch (level) {
      case "Very High":
        return "primary";
      case "High":
        return "success";
      case "Moderate":
        return "info";
      case "Low":
        return "warning";
      case "None":
        return "danger";
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
        {WIDGET_ICONS.SECURITY_LEVEL && (
          <span className="mr-2">{WIDGET_ICONS.SECURITY_LEVEL}</span>
        )}
        CIA Security Profile
      </h3>

      <div className="space-y-3">
        {/* Availability Impact */}
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-availability-row`}
        >
          <span className="text-sm">{CIA_LABELS.AVAILABILITY}:</span>
          <ValueDisplay
            value={`${availability ? availability + " " : ""}${
              CIA_LABELS.AVAILABILITY
            }`}
            variant={getVariant(availability)}
            testId={`${testId}-availability-level`}
          />
        </div>

        {/* Integrity Impact */}
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-integrity-row`}
        >
          <span className="text-sm">{CIA_LABELS.INTEGRITY}:</span>
          <ValueDisplay
            value={`${integrity} ${CIA_LABELS.INTEGRITY}`}
            variant={getVariant(integrity)}
            testId={`${testId}-integrity-level`}
          />
        </div>

        {/* Confidentiality Impact */}
        <div
          className="flex justify-between items-center"
          data-testid={`${testId}-confidentiality-row`}
        >
          <span className="text-sm">{CIA_LABELS.CONFIDENTIALITY}:</span>
          <ValueDisplay
            value={`${confidentiality} ${CIA_LABELS.CONFIDENTIALITY}`}
            variant={getVariant(confidentiality)}
            testId={`${testId}-confidentiality-level`}
          />
        </div>
      </div>
    </div>
  );
};

export default CIAImpactSummaryWidget;
