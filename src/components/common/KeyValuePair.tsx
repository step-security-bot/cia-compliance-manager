import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface KeyValuePairProps {
  label: string;
  value: React.ReactNode;
  testId?: string;
  highlighted?: boolean;
  justified?: boolean;
  labelClassName?: string;
  valueClassName?: string;
}

const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  testId = COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR,
  highlighted = false,
  justified = false,
  labelClassName = "",
  valueClassName = "",
}) => {
  const containerClasses = `flex ${
    justified ? "justify-between" : "flex-col"
  } ${highlighted ? "bg-gray-50 dark:bg-gray-700 p-2 rounded" : ""} text-sm ${
    labelClassName || ""
  }`;

  return (
    <div className={containerClasses} data-testid={testId}>
      <span
        className={`text-gray-500 dark:text-gray-400 ${labelClassName}`}
        data-testid={`${
          testId === COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR
            ? COMMON_COMPONENT_TEST_IDS.KV_LABEL
            : `${testId}-label`
        }`}
      >
        {label}
      </span>
      <div
        className={`font-medium text-gray-900 dark:text-gray-100 ${valueClassName}`}
        data-testid={`${
          testId === COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR
            ? COMMON_COMPONENT_TEST_IDS.KV_VALUE
            : `${testId}-value`
        }`}
      >
        {value}
      </div>
    </div>
  );
};

export default KeyValuePair;
