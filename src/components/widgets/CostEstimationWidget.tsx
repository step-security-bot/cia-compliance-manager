import React from "react";

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
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total CAPEX
          </p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {totalCapex}%
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total OPEX
          </p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {totalOpex}%
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <span className="font-medium text-gray-800 dark:text-gray-100">
          Estimated CAPEX:
        </span>
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {capexEstimate}
        </span>
      </div>

      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
        <span className="font-medium text-gray-800 dark:text-gray-100">
          Estimated OPEX:
        </span>
        <span className="font-bold text-green-600 dark:text-green-400">
          {opexEstimate}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 p-2">
        <span className="font-medium">Note:</span>{" "}
        {isSmallSolution
          ? "Small solution estimation based on lower risk classification."
          : "Enterprise-grade solution required for high security requirements."}
      </p>
    </div>
  );
};

export default CostEstimationWidget;
