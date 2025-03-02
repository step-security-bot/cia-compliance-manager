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
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300";
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300";
      case "danger":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300";
      case "info":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300";
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
        <span className="text-gray-600 dark:text-gray-400 mr-2 text-sm">
          {label}:
        </span>
      )}
      <span
        className={`font-semibold inline-block rounded-md border ${getVariantClasses()} ${getSizeClasses()}`}
        data-testid={testId ? `${testId}-value` : "displayed-value"}
      >
        {value}
      </span>
    </div>
  );
};

export default ValueDisplay;
