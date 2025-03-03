import React, { ReactNode } from "react";

interface ValueDisplayProps {
  value: ReactNode;
  label?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  testId?: string;
}

/**
 * ValueDisplay component for consistently displaying application-set values
 * with clear visual distinction from regular text content.
 */
const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  label,
  variant = "default",
  size = "md",
  testId,
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case "primary":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200";
      case "success":
        return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200";
      case "danger":
        return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200";
      case "info":
        return "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200";
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "text-xs px-1.5 py-0.5";
      case "lg":
        return "text-base px-3 py-1.5";
      default:
        return "text-sm px-2 py-1";
    }
  };

  return (
    <div
      className="inline-flex items-center"
      data-testid={testId || "value-display"}
    >
      {label && (
        <span className="text-gray-600 dark:text-gray-400 mr-2 text-sm font-medium">
          {label}:
        </span>
      )}
      <span
        className={`font-semibold inline-block rounded-md border ${getVariantClasses()} ${getSizeClasses()} shadow-sm`}
        data-testid={testId ? `${testId}-value` : "displayed-value"}
      >
        {value}
      </span>
    </div>
  );
};

export default ValueDisplay;
