import React, { ReactNode } from "react";

interface MetricsCardProps {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
  };
  testId?: string;
  className?: string;
}

/**
 * MetricsCard component for displaying important metrics consistently
 */
const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  trend,
  testId,
  className = "",
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

  return (
    <div
      className={`p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}
      data-testid={testId || "metrics-card"}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs text-gray-500 dark:text-gray-400 flex items-center"
          data-testid={`${testId}-title`}
        >
          {icon && <span className="mr-1">{icon}</span>}
          {title}
        </span>
        {trend && (
          <span
            className={`text-xs flex items-center ${getTrendClasses()}`}
            data-testid={`${testId}-trend`}
          >
            <span className="mr-0.5">{getTrendIcon()}</span>
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-1 font-bold text-lg" data-testid={`${testId}-value`}>
        {value}
      </div>
    </div>
  );
};

export default MetricsCard;
