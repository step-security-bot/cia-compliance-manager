import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface ValueDisplayProps {
  value: string | number;
  variant?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral"
    | "default";
  size?: "sm" | "md" | "lg";
  label?: string;
  testId?: string;
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  variant = "primary",
  size = "md",
  label,
  testId = COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY,
}) => {
  // Get background and text colors based on variant
  const getColorClass = () => {
    switch (variant) {
      case "success":
        return "text-green-700 dark:text-green-400 bg-green-100";
      case "warning":
        return "text-yellow-700 dark:text-yellow-400 bg-yellow-100";
      case "danger":
        return "text-red-700 dark:text-red-400 bg-red-100";
      case "info":
        return "text-blue-700 dark:text-blue-400 bg-blue-100";
      case "neutral":
        return "text-gray-700 dark:text-gray-400 bg-gray-100";
      case "default":
        return "text-gray-800 dark:text-gray-200 bg-transparent";
      case "primary":
      default:
        return "text-blue-700 dark:text-blue-400 bg-blue-100";
    }
  };

  // Get padding and border radius based on size
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "py-0.5 px-2 text-sm";
      case "lg":
        return "py-1.5 px-3 text-lg"; // Updated to use text-lg
      case "md":
      default:
        return "py-1 px-2.5 text-base";
    }
  };

  // Get text color without background for text-only elements
  const getTextOnlyColor = () => {
    switch (variant) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      case "neutral":
        return "text-gray-600 dark:text-gray-400";
      case "default":
        return "text-gray-700 dark:text-gray-300";
      case "primary":
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  // Get font size for the wrapper element
  const getFontSize = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg"; // This needs to be applied to the value element
      case "md":
      default:
        return "text-base";
    }
  };

  // Get all classes combined
  const valueClasses = `${getColorClass()} ${getSizeClass()}`;

  return (
    <span
      className={`${getTextOnlyColor()} ${getFontSize()} font-semibold `}
      data-testid={testId}
    >
      {label && <span className="mr-1">{label}:</span>}
      <span data-testid={`${testId}-value`} className={valueClasses}>
        {value}
      </span>
    </span>
  );
};

export default ValueDisplay;
