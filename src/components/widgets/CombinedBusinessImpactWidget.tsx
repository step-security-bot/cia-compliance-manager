import React from "react";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import CIAImpactSummaryWidget from "./CIAImpactSummaryWidget";
import { CIADetails } from "../../types/cia";
import { CombinedBusinessImpactWidgetProps } from "../../types/widgets";

/**
 * A widget that displays business impact analysis for all three CIA components
 */
const CombinedBusinessImpactWidget: React.FC<
  CombinedBusinessImpactWidgetProps
> = ({
  availability,
  integrity,
  confidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
  return (
    <div
      className="p-2 space-y-4"
      data-testid="combined-business-impact-widget"
    >
      {/* Introduction text */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        The Business Impact Analysis (BIA) helps identify critical business
        functions and their dependencies, quantify financial and operational
        impacts of security incidents.
      </p>

      {/* Add CIA Impact Summary Widget at the top */}
      <CIAImpactSummaryWidget
        availability={availability}
        integrity={integrity}
        confidentiality={confidentiality}
      />

      {/* Key Benefits section */}
      <div className="space-y-3">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-sm">
              Clear visibility into security requirements
            </li>
            <li className="text-sm">
              Quantifiable metrics for security investments
            </li>
            <li className="text-sm">
              Documentation for compliance requirements
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Business Considerations</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-sm">
              Revenue impact:{" "}
              {availability === "Very High"
                ? "Minimal"
                : availability === "High"
                ? "Low"
                : availability === "Moderate"
                ? "Moderate"
                : "High"}
            </li>
            <li className="text-sm">
              Regulatory risk:{" "}
              {confidentiality === "Very High" || confidentiality === "High"
                ? "Minimal"
                : "Significant"}
            </li>
          </ul>
        </div>
      </div>

      {/* Individual Impact Analysis sections */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Availability Impact</h3>
        <BusinessImpactAnalysisWidget
          category="Availability"
          level={availability}
          options={availabilityOptions}
        />

        <h3 className="text-md font-medium mt-4">Integrity Impact</h3>
        <BusinessImpactAnalysisWidget
          category="Integrity"
          level={integrity}
          options={integrityOptions}
        />

        <h3 className="text-md font-medium mt-4">Confidentiality Impact</h3>
        <BusinessImpactAnalysisWidget
          category="Confidentiality"
          level={confidentiality}
          options={confidentialityOptions}
        />
      </div>
    </div>
  );
};

export default CombinedBusinessImpactWidget;
