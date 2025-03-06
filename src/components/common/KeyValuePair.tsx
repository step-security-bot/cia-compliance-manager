import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface KeyValuePairProps {
  label: string;
  value: ReactNode;
  testId?: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  highlighted?: boolean;
  justified?: boolean;
}

const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  testId,
  className = "",
  labelClassName = "",
  valueClassName = "",
  highlighted = false,
  justified = false,
}) => {
  const highlightClass = highlighted
    ? "font-bold text-blue-600 dark:text-blue-400"
    : "";
  const justifyClass = justified ? "text-right" : "";

  return (
    <div
      className={`flex flex-col ${className} text-sm`}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR}
    >
      <span
        className={`text-gray-500 dark:text-gray-400 ${labelClassName} ${justifyClass}`}
        data-testid={
          testId ? `${testId}-label` : COMMON_COMPONENT_TEST_IDS.KV_LABEL
        }
      >
        {label}
      </span>
      <div
        className={`font-medium text-gray-900 dark:text-gray-100 ${valueClassName} ${highlightClass} ${justifyClass}`}
        data-testid={
          testId ? `${testId}-value` : COMMON_COMPONENT_TEST_IDS.KV_VALUE
        }
      >
        {value}
      </div>
    </div>
  );
};

export default KeyValuePair;
