import React, { useState } from "react";
import { SecurityLevelKey } from "../../constants/appConstants";
// Update the imports to use the index file
import {
  WIDGET_ICONS,
  BUSINESS_IMPACT_ICONS,
  SECURITY_LEVEL_COLORS,
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  RISK_LEVELS,
} from "../../constants";
import { CIADetails } from "../../types/cia";
import { BusinessConsiderationItem } from "../../types/businessImpact";

interface BusinessImpactAnalysisWidgetProps {
  category: "Availability" | "Integrity" | "Confidentiality";
  level: string;
  options?: Record<string, CIADetails>;
}

const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({ category, level, options }) => {
  const [activeTab, setActiveTab] = useState<"considerations" | "benefits">(
    "considerations"
  );

  // Helper function to get normalized security level key
  const getNormalizedLevel = (level: string): SecurityLevelKey => {
    return level.toUpperCase().replace(/\s+/g, "_") as SecurityLevelKey;
  };

  // Get business considerations for this category and level
  const getBusinessConsiderations = () => {
    const categoryKey =
      category.toUpperCase() as keyof typeof BUSINESS_CONSIDERATIONS;
    const levelKey = getNormalizedLevel(
      level
    ) as keyof (typeof BUSINESS_CONSIDERATIONS)[keyof typeof BUSINESS_CONSIDERATIONS];

    // Return the considerations if they exist, otherwise return empty array
    return BUSINESS_CONSIDERATIONS[categoryKey]?.[levelKey] || [];
  };

  // Get business benefits for this level
  const getBusinessBenefits = () => {
    const levelKey = getNormalizedLevel(level);
    return BUSINESS_KEY_BENEFITS[levelKey] || [];
  };

  // Helper to get color based on risk level
  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case RISK_LEVELS.CRITICAL:
        return "bg-red-500 text-white";
      case RISK_LEVELS.HIGH:
        return "bg-orange-500 text-white";
      case RISK_LEVELS.MEDIUM:
        return "bg-yellow-500 text-black";
      case RISK_LEVELS.LOW:
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Helper to get background color for level
  const getBgColor = (): string => {
    switch (getNormalizedLevel(level)) {
      case "NONE":
        return "bg-red-500";
      case "LOW":
        return "bg-orange-500";
      case "MODERATE":
        return "bg-yellow-500";
      case "HIGH":
        return "bg-green-500";
      case "VERY_HIGH":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper to get icon for impact type
  const getImpactIcon = (type: string): string => {
    const typeKey = type.toUpperCase() as keyof typeof BUSINESS_IMPACT_ICONS;
    return BUSINESS_IMPACT_ICONS[typeKey] || BUSINESS_IMPACT_ICONS.NEUTRAL;
  };

  const considerations = getBusinessConsiderations();
  const benefits = getBusinessBenefits();

  // Add a wrapper div with the testId expected by Cypress tests
  return (
    <div>
      {/* Add the container with the expected testId for Cypress compatibility */}
      <div
        data-testid={`impact-analysis-${category.toLowerCase()}`}
        className="space-y-3"
      >
        <div className="flex items-center mb-2">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${getBgColor()}`}
            data-testid={`impact-level-indicator-${category.toLowerCase()}`}
          />
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
            {options && options[level]?.description}
          </p>
          <p
            className="font-medium text-sm mt-2"
            data-testid="business-impact-heading"
          >
            Business Impact:
          </p>
          <p data-testid={`business-impact-${category.toLowerCase()}`}>
            {options && options[level]?.businessImpact}
          </p>
        </div>
      </div>

      {/* Actual BusinessImpactAnalysisWidget content */}
      <div
        data-testid={`widget-business-impact-analysis`}
        className="space-y-4"
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="mr-2">{WIDGET_ICONS.BUSINESS_IMPACT}</span>
            Business Impact Analysis
          </h3>
          <div className="flex text-sm">
            <button
              onClick={() => setActiveTab("considerations")}
              className={`px-3 py-1 rounded-l-md ${
                activeTab === "considerations"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              data-testid="tab-considerations"
            >
              {BUSINESS_IMPACT_ICONS.NEGATIVE} Considerations
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-3 py-1 rounded-r-md ${
                activeTab === "benefits"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              data-testid="tab-benefits"
            >
              {BUSINESS_IMPACT_ICONS.POSITIVE} Key Benefits
            </button>
          </div>
        </div>

        {/* Business Impact Category Summary */}
        <div className="mb-4" data-testid="business-impact-summary">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium flex items-center">
              {category} - {level}
            </h4>
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  SECURITY_LEVEL_COLORS[getNormalizedLevel(level)] || "#6c757d",
              }}
            ></span>
          </div>

          {/* Impact description from options if provided */}
          {options && options[level] && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {options[level].businessImpact}
            </p>
          )}
        </div>

        {/* Considerations Tab */}
        {activeTab === "considerations" && (
          <div data-testid="business-considerations" className="space-y-3">
            <h4 className="text-sm font-semibold">Business Considerations</h4>

            {considerations.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No specific considerations for this level.
              </p>
            ) : (
              <ul className="space-y-2">
                {considerations.map(
                  (item: BusinessConsiderationItem, index: number) => (
                    <li
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-md p-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm font-medium">
                          <span className="mr-2">
                            {getImpactIcon(item.type)}
                          </span>
                          {item.type} Impact
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(
                            item.risk
                          )}`}
                          data-testid={`risk-level-${index}`}
                        >
                          {item.risk}
                        </span>
                      </div>
                      <p className="text-sm mt-1 pl-6">{item.description}</p>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div data-testid="business-benefits" className="space-y-3">
            <h4 className="text-sm font-semibold">Key Benefits</h4>

            {benefits.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No specific benefits for this level.
              </p>
            ) : (
              <ul className="space-y-1">
                {benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-baseline">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Additional metrics if using enhanced businessImpactDetails */}
        {options && options[level]?.businessImpactDetails && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold mb-2">Impact Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options[level]?.businessImpactDetails?.financialImpact && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                  <span className="text-xs font-medium">Financial Impact</span>
                  <p className="text-sm">
                    {
                      options[level]?.businessImpactDetails?.financialImpact
                        .description
                    }
                  </p>
                  {options[level]?.businessImpactDetails?.financialImpact
                    .annualRevenueLoss && (
                    <p className="text-xs mt-1">
                      Annual Revenue Loss:
                      <span className="font-semibold ml-1">
                        {
                          options[level]?.businessImpactDetails?.financialImpact
                            .annualRevenueLoss
                        }
                      </span>
                    </p>
                  )}
                </div>
              )}

              {options[level]?.businessImpactDetails?.operationalImpact && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                  <span className="text-xs font-medium">
                    Operational Impact
                  </span>
                  <p className="text-sm">
                    {
                      options[level]?.businessImpactDetails?.operationalImpact
                        .description
                    }
                  </p>
                  {options[level]?.businessImpactDetails?.operationalImpact
                    .meanTimeToRecover && (
                    <p className="text-xs mt-1">
                      Mean Recovery Time:
                      <span className="font-semibold ml-1">
                        {
                          options[level]?.businessImpactDetails
                            ?.operationalImpact.meanTimeToRecover
                        }
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessImpactAnalysisWidget;
