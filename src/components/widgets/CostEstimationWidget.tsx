import React from "react";
import { COST_ANALYSIS, UI_TEXT, UI_ICONS } from "../../constants/appConstants";
import ValueDisplay from "../common/ValueDisplay";
import KeyValuePair from "../common/KeyValuePair";
import MetricsCard from "../common/MetricsCard";

interface CostEstimationWidgetProps {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
  roi?: string;
  implementationTime?: string;
}

const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  totalCapex,
  totalOpex,
  capexEstimate,
  opexEstimate,
  isSmallSolution,
  roi,
  implementationTime,
}) => {
  const getCostSeverity = (percentage: number): string => {
    if (percentage <= 15) return "low";
    if (percentage <= 40) return "medium";
    if (percentage <= 70) return "high";
    return "very-high";
  };

  const getCapexColorClass = (): string => {
    const severity = getCostSeverity(totalCapex);
    switch (severity) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-blue-500";
      case "high":
        return "bg-yellow-500";
      case "very-high":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getOpexColorClass = (): string => {
    const severity = getCostSeverity(totalOpex);
    switch (severity) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-teal-500";
      case "high":
        return "bg-yellow-500";
      case "very-high":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value) return "";
    if (value.startsWith("$")) return value;
    return `$${value}`;
  };

  const getMonthlyOpex = (): string => {
    if (/^\$\d+([,.]\d+)?$/.test(opexEstimate)) {
      const numericValue = parseFloat(opexEstimate.replace(/[$,]/g, ""));
      if (!isNaN(numericValue)) {
        const monthlyValue = numericValue / 12;
        return `$${monthlyValue.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}/month`;
      }
    }
    return "";
  };

  const getTotalCost = (): string => {
    if (
      /^\$\d+([,.]\d+)?$/.test(capexEstimate) &&
      /^\$\d+([,.]\d+)?$/.test(opexEstimate)
    ) {
      const capexValue = parseFloat(capexEstimate.replace(/[$,]/g, ""));
      const opexValue = parseFloat(opexEstimate.replace(/[$,]/g, ""));

      if (!isNaN(capexValue) && !isNaN(opexValue)) {
        const totalCost = capexValue + 3 * opexValue;
        return `$${totalCost.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;
      }
    }
    return "Varies";
  };

  // Add cost icon indicators based on severity
  const getCostIcon = (percentage: number): string => {
    if (percentage <= 15) return "🟢"; // Low cost
    if (percentage <= 40) return "🟡"; // Medium cost
    if (percentage <= 70) return "🟠"; // High cost
    return "🔴"; // Very high cost
  };

  const monthlyOpex = getMonthlyOpex();
  const totalCost = getTotalCost();

  return (
    <div
      className="space-y-4"
      data-testid="cost-estimation-content"
      aria-label="Security cost estimation"
    >
      <div className="flex justify-between items-center">
        <h4
          className="text-sm font-medium"
          data-testid="estimated-cost-heading"
        >
          {UI_TEXT.LABELS.ESTIMATED_COST}
        </h4>

        {implementationTime && (
          <ValueDisplay
            value={implementationTime}
            variant="info"
            size="sm"
            testId="implementation-time"
          />
        )}
      </div>

      <div>
        <KeyValuePair
          label={UI_TEXT.LABELS.CAPEX}
          value={
            <div className="flex items-center">
              <span
                className="mr-1"
                aria-hidden="true"
                data-testid="capex-severity-icon"
              >
                {getCostIcon(totalCapex)}
              </span>
              <ValueDisplay
                value={formatCurrency(capexEstimate)}
                variant="primary"
                size="sm"
                testId="capex-estimate"
              />
            </div>
          }
          testId="capex-section"
        />

        <div className="mt-2">
          <div
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
            role="progressbar"
            aria-valuenow={Math.min(totalCapex, 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Capital expenditure: ${totalCapex}% of IT budget`}
          >
            <div
              className={`${getCapexColorClass()} h-2.5 rounded-full`}
              style={{ width: `${Math.min(totalCapex, 100)}%` }}
              data-testid="capex-progress-bar"
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-bold" data-testid="capex-percentage">
              {totalCapex}%
            </span>{" "}
            {UI_TEXT.BUDGET.IT_BUDGET_CAPEX}
          </p>
        </div>
      </div>

      <div>
        <KeyValuePair
          label={UI_TEXT.LABELS.OPEX}
          value={
            <div className="flex items-center">
              <span
                className="mr-1"
                aria-hidden="true"
                data-testid="opex-severity-icon"
              >
                {getCostIcon(totalOpex)}
              </span>
              <ValueDisplay
                value={formatCurrency(opexEstimate)}
                variant="primary"
                size="sm"
                testId="opex-estimate"
              />
              {monthlyOpex && (
                <span
                  className="ml-1 text-xs text-gray-500 font-normal"
                  data-testid="monthly-opex"
                >
                  (~{monthlyOpex})
                </span>
              )}
            </div>
          }
          testId="opex-section"
        />

        <div className="mt-2">
          <div
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
            role="progressbar"
            aria-valuenow={Math.min(totalOpex, 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Operational expenditure: ${totalOpex}% of IT budget`}
          >
            <div
              className={`${getOpexColorClass()} h-2.5 rounded-full`}
              style={{ width: `${Math.min(totalOpex, 100)}%` }}
              data-testid="opex-progress-bar"
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-bold" data-testid="opex-percentage">
              {totalOpex}%
            </span>{" "}
            {UI_TEXT.BUDGET.IT_BUDGET_OPEX}
          </p>
        </div>
      </div>

      <div
        className="bg-gray-50 dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md"
        data-testid="total-cost-summary"
      >
        <MetricsCard
          title="3-Year Total Cost"
          value={totalCost}
          testId="three-year-total"
          className="bg-transparent border-0 p-0"
        />

        {roi && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <KeyValuePair
              label="Estimated ROI"
              value={
                <ValueDisplay
                  value={roi}
                  variant="success"
                  size="sm"
                  testId="roi-estimate"
                />
              }
              testId="roi-section"
            />
          </div>
        )}
      </div>

      <div
        className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3 mt-2"
        data-testid="cost-analysis-section"
      >
        <h4
          className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2"
          data-testid="cost-analysis-heading"
        >
          {UI_TEXT.LABELS.COST_ANALYSIS}
        </h4>
        <p
          className="text-sm text-blue-700 dark:text-blue-300"
          data-testid="cost-analysis-text"
        >
          {isSmallSolution
            ? COST_ANALYSIS.SMALL_SOLUTION
            : COST_ANALYSIS.LARGE_SOLUTION}
        </p>
      </div>
    </div>
  );
};

export default CostEstimationWidget;
