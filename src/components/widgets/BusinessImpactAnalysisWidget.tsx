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
import StatusBadge from "../common/StatusBadge";
import ValueDisplay from "../common/ValueDisplay";
import KeyValuePair from "../common/KeyValuePair";
import MetricsCard from "../common/MetricsCard";

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

  // Helper to get risk status for StatusBadge
  const getRiskStatus = (
    risk: string
  ): "success" | "warning" | "error" | "info" | "neutral" => {
    switch (risk) {
      case RISK_LEVELS.CRITICAL:
        return "error";
      case RISK_LEVELS.HIGH:
        return "warning";
      case RISK_LEVELS.MEDIUM:
        return "info";
      case RISK_LEVELS.LOW:
        return "success";
      default:
        return "neutral";
    }
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

  // Helper to get variant based on level for ValueDisplay
  const getLevelVariant = ():
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info" => {
    switch (getNormalizedLevel(level)) {
      case "NONE":
        return "danger";
      case "LOW":
        return "warning";
      case "MODERATE":
        return "info";
      case "HIGH":
        return "success";
      case "VERY_HIGH":
        return "primary";
      default:
        return "default";
    }
  };

  // Helper to get icon for impact type
  const getImpactIcon = (type: string): string => {
    const normalizedType = type.toUpperCase();
    const icons = enhancedIcons.IMPACT_TYPES;
    
    // Use a lookup map instead of if/else chain
    const typeIconMap: Record<string, string> = {
      "FINANCIAL": icons.FINANCIAL,
      "OPERATION": icons.OPERATIONAL,
      "REPUTATION": icons.REPUTATIONAL,
      "REGUL": icons.REGULATORY,
      "STRATEGIC": icons.STRATEGIC,
      "SECURITY": icons.SECURITY
    };
    
    // Find the matching type
    for (const [key, icon] of Object.entries(typeIconMap)) {
      if (normalizedType.includes(key)) return icon;
    }
    
    return icons.OPERATIONAL; // Default
  };

  const considerations = getBusinessConsiderations();
  const benefits = getBusinessBenefits();

  // Get business impact text or fallback to a default message
  const getBusinessImpactText = (): string => {
    if (options && options[level]?.businessImpact) {
      return options[level].businessImpact;
    }
    return `No specific business impact data available for ${level} ${category}.`;
  };

  // Add these enhanced icon definitions for better visual appeal
  const enhancedIcons = {
    IMPACT_TYPES: {
      FINANCIAL: "💰", // Money bag for financial
      OPERATIONAL: "⚙️", // Gear for operational
      REPUTATIONAL: "🏆", // Trophy for reputation
      REGULATORY: "⚖️", // Scales for regulatory
      STRATEGIC: "🎯", // Target for strategic
      SECURITY: "🔒", // Lock for security
    },
    TABS: {
      CONSIDERATIONS: "⚠️", // Warning for considerations
      BENEFITS: "✅", // Check mark for benefits
    },
    METRICS: {
      FINANCIAL: "📊", // Chart for financial metrics
      OPERATIONAL: "⏱️", // Stopwatch for operational/time metrics
      RECOVERY: "🔄", // Cycle for recovery processes
      REVENUE: "💵", // Dollar bill for revenue
    },
    SEVERITY: {
      CRITICAL: "🔴", // Red circle for critical
      HIGH: "🟠", // Orange circle for high
      MEDIUM: "🟡", // Yellow circle for medium
      LOW: "🟢", // Green circle for low
    },
  };

  // Improved container with better testids and ARIA attributes
  return (
    <div
      data-testid={`business-impact-analysis-${category.toLowerCase()}`}
      className="relative"
    >
      {/* Add an icon indicator for the category */}
      <div
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
        data-testid={`category-icon-${category.toLowerCase()}`}
        aria-hidden="true"
      >
        {category === "Availability"
          ? "⏱️"
          : category === "Integrity"
          ? "🔐"
          : "🔏"}
      </div>

      {/* Impact Analysis Summary with enhanced styling */}
      <div
        data-testid={`impact-analysis-${category.toLowerCase()}`}
        className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
        aria-label={`${category} impact analysis for ${level} level`}
      >
        <div className="flex items-center mb-2">
          <div
            className={`inline-block w-3 h-3 rounded-full mr-2 ${getBgColor()}`}
            data-testid={`impact-level-indicator-${category.toLowerCase()}`}
            aria-hidden="true"
          />
          <ValueDisplay
            value={`${level} ${category}`}
            variant={getLevelVariant()}
            size="md"
            testId={`impact-level-text-${category.toLowerCase()}`}
          />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p
            className="mb-2"
            data-testid={`impact-description-${category.toLowerCase()}`}
          >
            {options && options[level]?.description
              ? options[level].description
              : `No description available for ${level} ${category}.`}
          </p>
          <KeyValuePair
            label="Business Impact"
            value={getBusinessImpactText()}
            testId={`business-impact-${category.toLowerCase()}`}
            highlighted={true}
          />
        </div>
      </div>

      {/* Main Widget Content with improved tab styling */}
      <div
        data-testid="widget-business-impact-analysis"
        className="space-y-4 mt-4"
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="mr-2" aria-hidden="true">
              {WIDGET_ICONS.BUSINESS_IMPACT}
            </span>
            Business Impact Analysis
          </h3>
          <div className="flex text-sm" role="tablist">
            <button
              onClick={() => setActiveTab("considerations")}
              className={`px-3 py-1 rounded-l-md flex items-center ${
                activeTab === "considerations"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              data-testid="tab-considerations"
              role="tab"
              aria-selected={activeTab === "considerations"}
              aria-controls="panel-considerations"
            >
              <span aria-hidden="true" className="mr-1">
                {enhancedIcons.TABS.CONSIDERATIONS}
              </span>
              Considerations
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-3 py-1 rounded-r-md flex items-center ${
                activeTab === "benefits"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              data-testid="tab-benefits"
              role="tab"
              aria-selected={activeTab === "benefits"}
              aria-controls="panel-benefits"
            >
              <span aria-hidden="true" className="mr-1">
                {enhancedIcons.TABS.BENEFITS}
              </span>
              Key Benefits
            </button>
          </div>
        </div>

        {/* Business Impact Category Summary */}
        <div className="mb-4" data-testid="business-impact-summary">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium flex items-center">
              {category} - {level}
            </h4>
            <div
              className="inline-block w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  SECURITY_LEVEL_COLORS[getNormalizedLevel(level)] || "#6c757d",
              }}
              aria-hidden="true"
              data-testid={`level-indicator-color-${level.toLowerCase()}`}
            />
          </div>

          {/* Impact description from options if provided */}
          {options && options[level] && (
            <p
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
              data-testid="impact-detail-text"
            >
              {options[level].businessImpact}
            </p>
          )}
        </div>

        {/* Considerations Tab with enhanced styling */}
        {activeTab === "considerations" && (
          <div
            data-testid="business-considerations"
            id="panel-considerations"
            role="tabpanel"
            aria-labelledby="tab-considerations"
            className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-sm font-semibold flex items-center">
              <span aria-hidden="true" className="mr-2">
                {enhancedIcons.TABS.CONSIDERATIONS}
              </span>
              Business Considerations
            </h4>

            {considerations.length === 0 ? (
              <p
                className="text-sm text-gray-500 dark:text-gray-400 italic"
                data-testid="no-considerations-message"
              >
                No specific considerations for this level.
              </p>
            ) : (
              <ul className="space-y-2">
                {considerations.map(
                  (item: BusinessConsiderationItem, index: number) => (
                    <li
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-700"
                      data-testid={`consideration-item-${index}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <KeyValuePair
                          label=""
                          value={
                            <div className="flex items-center">
                              <span className="mr-2" aria-hidden="true">
                                {getImpactIcon(item.type) ||
                                  enhancedIcons.IMPACT_TYPES.OPERATIONAL}
                              </span>
                              <span data-testid={`impact-type-${index}`}>
                                {item.type} Impact
                              </span>
                            </div>
                          }
                          testId={`impact-type-kv-${index}`}
                        />
                        <StatusBadge
                          status={getRiskStatus(item.risk)}
                          testId={`risk-level-${index}`}
                        >
                          {enhancedIcons.SEVERITY[
                            item.risk as keyof typeof enhancedIcons.SEVERITY
                          ] || ""}{" "}
                          {item.risk}
                        </StatusBadge>
                      </div>
                      <p
                        className="text-sm mt-2 pl-2 border-l-2 border-gray-300 dark:border-gray-500"
                        data-testid={`consideration-description-${index}`}
                      >
                        {item.description}
                      </p>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        )}

        {/* Benefits Tab with enhanced styling */}
        {activeTab === "benefits" && (
          <div
            data-testid="business-benefits"
            id="panel-benefits"
            role="tabpanel"
            aria-labelledby="tab-benefits"
            className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-sm font-semibold flex items-center">
              <span aria-hidden="true" className="mr-2">
                {enhancedIcons.TABS.BENEFITS}
              </span>
              Key Benefits
            </h4>

            {benefits.length === 0 ? (
              <p
                className="text-sm text-gray-500 dark:text-gray-400 italic"
                data-testid="no-benefits-message"
              >
                No specific benefits for this level.
              </p>
            ) : (
              <ul className="space-y-2">
                {benefits.map((benefit: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
                    data-testid={`benefit-item-${index}`}
                  >
                    <StatusBadge status="success" size="xs">
                      ✓
                    </StatusBadge>
                    <span className="text-sm font-medium ml-2">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Additional metrics with enhanced styling */}
        {options && options[level]?.businessImpactDetails && (
          <div
            className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-lg"
            data-testid="impact-metrics-section"
          >
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <span className="mr-2" aria-hidden="true">
                {enhancedIcons.METRICS.FINANCIAL}
              </span>
              Impact Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options[level]?.businessImpactDetails?.financialImpact && (
                <div
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600"
                  data-testid="financial-impact-card"
                >
                  <MetricsCard
                    title="Financial Impact"
                    value={
                      options[level]?.businessImpactDetails?.financialImpact
                        .description
                    }
                    icon={enhancedIcons.IMPACT_TYPES.FINANCIAL}
                    testId="financial-impact-metrics"
                    className="bg-transparent border-0 p-0"
                  />
                  {options[level]?.businessImpactDetails?.financialImpact
                    .annualRevenueLoss && (
                    <KeyValuePair
                      label="Annual Revenue Loss"
                      value={
                        <ValueDisplay
                          value={
                            options[level]?.businessImpactDetails
                              ?.financialImpact.annualRevenueLoss
                          }
                          variant="danger"
                          size="sm"
                          testId="annual-revenue-loss"
                        />
                      }
                      testId="revenue-loss-kv"
                    />
                  )}
                </div>
              )}

              {options[level]?.businessImpactDetails?.operationalImpact && (
                <div
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600"
                  data-testid="operational-impact-card"
                >
                  <MetricsCard
                    title="Operational Impact"
                    value={
                      options[level]?.businessImpactDetails?.operationalImpact
                        .description
                    }
                    icon={enhancedIcons.IMPACT_TYPES.OPERATIONAL}
                    testId="operational-impact-metrics"
                    className="bg-transparent border-0 p-0"
                  />
                  {options[level]?.businessImpactDetails?.operationalImpact
                    .meanTimeToRecover && (
                    <KeyValuePair
                      label="Mean Recovery Time"
                      value={
                        <ValueDisplay
                          value={
                            options[level]?.businessImpactDetails
                              ?.operationalImpact.meanTimeToRecover
                          }
                          variant="info"
                          size="sm"
                          testId="mean-recovery-time"
                        />
                      }
                      testId="recovery-time-kv"
                    />
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
