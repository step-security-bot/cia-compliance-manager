import React, { ReactNode } from "react";

interface KeyValuePairProps {
  label: string;
  value: ReactNode;
  testId?: string;
  labelClassName?: string;
  valueClassName?: string;
  highlighted?: boolean;
  className?: string; // Add className prop to fix the TypeScript errors
}

/**
 * KeyValuePair component for displaying label-value pairs consistently throughout the app
 */
const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  testId,
  labelClassName = "",
  valueClassName = "",
  highlighted = false,
  className = "", // Add default value for className
}) => {
  return (
    <div
      className={`flex justify-between items-center ${
        highlighted ?? false
          ? "bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
          : ""
      } ${className ?? ""}`}
      data-testid={testId || "key-value-pair"}
    >
      <span
        className={`text-sm text-gray-600 dark:text-gray-400 ${labelClassName}`}
        data-testid={testId ? `${testId}-label` : "kv-label"}
      >
        {label}
      </span>
      <span
        className={`font-medium ${
          highlighted ? "text-blue-700 dark:text-blue-300" : ""
        } ${valueClassName}`}
        data-testid={testId ? `${testId}-value` : "kv-value"}
      >
        {value}
      </span>
    </div>
  );
};

export default KeyValuePair;
