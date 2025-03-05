import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface KeyValuePairProps {
  label: ReactNode;
  value: ReactNode;
  highlighted?: boolean;
  testId?: string;
  className?: string;
}

/**
 * KeyValuePair component for consistently displaying label: value pairs
 * Used throughout the application for structured data display
 */
const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  highlighted = false,
  testId,
  className = "",
}) => {
  // Apply appropriate styling based on highlighting
  const containerClasses = `w-full ${
    highlighted ? "bg-blue-50 dark:bg-blue-900 p-2 rounded" : ""
  } ${className}`;

  const labelClasses = `text-sm text-gray-500 dark:text-gray-400 ${
    highlighted ? "font-medium" : ""
  }`;

  const valueClasses = `text-sm font-medium text-gray-700 dark:text-gray-300 ${
    highlighted ? "font-semibold" : ""
  }`;

  return (
    <div
      className={containerClasses}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR}
    >
      <div className="flex flex-col space-y-1">
        <span
          className={labelClasses}
          data-testid={
            testId ? `${testId}-label` : COMMON_COMPONENT_TEST_IDS.KV_LABEL
          }
        >
          {label}
        </span>
        <span
          className={valueClasses}
          data-testid={
            testId ? `${testId}-value` : COMMON_COMPONENT_TEST_IDS.KV_VALUE
          }
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default KeyValuePair;
