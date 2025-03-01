import React from "react";
import { COST_ANALYSIS, UI_TEXT } from "../../constants/appConstants";

interface CostEstimationWidgetProps {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
}

const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  totalCapex,
  totalOpex,
  capexEstimate,
  opexEstimate,
  isSmallSolution,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">
          {UI_TEXT.LABELS.ESTIMATED_COST}
        </h4>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {UI_TEXT.LABELS.CAPEX}
          </span>
          <span className="font-medium">{capexEstimate}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${Math.min(totalCapex, 100)}%` }}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span data-testid="capex-percentage">{totalCapex}%</span>{" "}
          {UI_TEXT.BUDGET.IT_BUDGET_CAPEX}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {UI_TEXT.LABELS.OPEX}
          </span>
          <span className="font-medium">{opexEstimate}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${Math.min(totalOpex, 100)}%` }}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span data-testid="opex-percentage">{totalOpex}%</span>{" "}
          {UI_TEXT.BUDGET.IT_BUDGET_OPEX}
        </p>
      </div>

      <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3 mt-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          {UI_TEXT.LABELS.COST_ANALYSIS}
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {isSmallSolution
            ? COST_ANALYSIS.SMALL_SOLUTION
            : COST_ANALYSIS.LARGE_SOLUTION}
        </p>
      </div>
    </div>
  );
};

export default CostEstimationWidget;
