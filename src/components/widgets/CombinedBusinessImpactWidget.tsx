import React from "react";
import {
  WIDGET_ICONS,
  CIA_COMPONENT_ICONS,
} from "../../constants/appConstants";
import { CIADetails } from "../../types/cia";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";

interface CombinedBusinessImpactWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  availabilityOptions: Record<string, CIADetails>;
  integrityOptions: Record<string, CIADetails>;
  confidentialityOptions: Record<string, CIADetails>;
}

/**
 * Widget that displays business impact analysis for all three CIA components
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
    <div className="space-y-6" data-testid="combined-business-impact">
      {/* Introduction Text */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          The Business Impact Analysis (BIA) helps identify critical business
          functions and their dependencies, quantify financial and operational
          impacts of security incidents.
        </p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <h4 className="font-medium text-sm mb-1">Key Benefits</h4>
            <ul className="list-disc pl-5 text-xs">
              <li>Clear visibility into security requirements</li>
              <li>Quantifiable metrics for security investments</li>
              <li>Documentation for compliance requirements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">
              Business Considerations
            </h4>
            <ul className="list-disc pl-5 text-xs">
              <li>Revenue impact: High</li>
              <li>Regulatory risk: Significant</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Availability Impact Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-md font-medium mb-3 flex items-center">
          <span className="mr-2" aria-hidden="true">
            ⚡
          </span>
          Availability Impact
        </h3>
        <div className="pl-2 border-l-4 border-blue-400 dark:border-blue-600">
          <div className="flex items-start mb-2">
            <span className="mr-2 text-xl" aria-hidden="true">
              {CIA_COMPONENT_ICONS.AVAILABILITY}
            </span>
            <h4 className="font-medium">{availability} Availability</h4>
          </div>
          <p className="text-sm mb-3">
            {availabilityOptions[availability]?.description ||
              "No description available"}
          </p>

          <div className="mb-3">
            <h5 className="text-sm font-medium">Business Impact:</h5>
            <p className="text-sm pl-2 border-l-2 border-gray-300 dark:border-gray-600 my-2">
              {availabilityOptions[availability]?.businessImpact ||
                "No business impact data available"}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <BusinessImpactAnalysisWidget
            category="Availability"
            level={availability}
            options={availabilityOptions}
          />
        </div>
      </div>

      {/* Integrity Impact Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-md font-medium mb-3 flex items-center">
          <span className="mr-2" aria-hidden="true">
            🔗
          </span>
          Integrity Impact
        </h3>
        <div className="pl-2 border-l-4 border-green-400 dark:border-green-600">
          <div className="flex items-start mb-2">
            <span className="mr-2 text-xl" aria-hidden="true">
              {CIA_COMPONENT_ICONS.INTEGRITY}
            </span>
            <h4 className="font-medium">{integrity} Integrity</h4>
          </div>
          <p className="text-sm mb-3">
            {integrityOptions[integrity]?.description ||
              "No description available"}
          </p>

          <div className="mb-3">
            <h5 className="text-sm font-medium">Business Impact:</h5>
            <p className="text-sm pl-2 border-l-2 border-gray-300 dark:border-gray-600 my-2">
              {integrityOptions[integrity]?.businessImpact ||
                "No business impact data available"}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <BusinessImpactAnalysisWidget
            category="Integrity"
            level={integrity}
            options={integrityOptions}
          />
        </div>
      </div>

      {/* Confidentiality Impact Section */}
      <div className="pb-2">
        <h3 className="text-md font-medium mb-3 flex items-center">
          <span className="mr-2" aria-hidden="true">
            🔒
          </span>
          Confidentiality Impact
        </h3>
        <div className="pl-2 border-l-4 border-purple-400 dark:border-purple-600">
          <div className="flex items-start mb-2">
            <span className="mr-2 text-xl" aria-hidden="true">
              {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            </span>
            <h4 className="font-medium">{confidentiality} Confidentiality</h4>
          </div>
          <p className="text-sm mb-3">
            {confidentialityOptions[confidentiality]?.description ||
              "No description available"}
          </p>

          <div className="mb-3">
            <h5 className="text-sm font-medium">Business Impact:</h5>
            <p className="text-sm pl-2 border-l-2 border-gray-300 dark:border-gray-600 my-2">
              {confidentialityOptions[confidentiality]?.businessImpact ||
                "No business impact data available"}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <BusinessImpactAnalysisWidget
            category="Confidentiality"
            level={confidentiality}
            options={confidentialityOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default CombinedBusinessImpactWidget;
