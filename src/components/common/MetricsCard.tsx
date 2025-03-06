import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface MetricsCardProps {
  title: string;
  value: ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: string;
  testId?: string;
  className?: string;
  variant?: "success" | "warning" | "danger" | "info" | "primary" | "default";
}

/**
 * MetricsCard component for displaying important metrics consistently
 */
const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  trend,
  icon,
  testId,
  className = "",
  variant,
}) => {
  const getTrendClasses = () => {
    if (!trend) return "";

    switch (trend.direction) {
      case "up":
        return "text-green-600 dark:text-green-400";
      case "down":
        return "text-red-600 dark:text-red-400";
      case "neutral":
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trend.direction) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      case "neutral":
      default:
        return "→";
    }
  };

  // Add variant handling for the value display
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      case "primary":
        return "text-indigo-600 dark:text-indigo-400";
      default:
        return "";
    }
  };

  return (
    <div
      className={`p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.METRICS_CARD}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs text-gray-500 dark:text-gray-400 flex items-center"
          data-testid={`${
            testId || COMMON_COMPONENT_TEST_IDS.METRICS_CARD
          }-title`}
        >
          {icon && <span className="mr-1">{icon}</span>}
          {title}
        </span>
        {trend && (
          <span
            className={`text-xs flex items-center ${getTrendClasses()}`}
            data-testid={`${
              testId || COMMON_COMPONENT_TEST_IDS.METRICS_CARD
            }-trend`}
          >
            <span className="mr-0.5">{getTrendIcon()}</span>
            {trend.value}
          </span>
        )}
      </div>
      <div
        className={`mt-1 font-bold text-lg ${getVariantClass()}`}
        data-testid={`${
          testId || COMMON_COMPONENT_TEST_IDS.METRICS_CARD
        }-value`}
      >
        {value}
      </div>
    </div>
  );
};

export default MetricsCard;
