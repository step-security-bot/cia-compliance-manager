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
  // Map "default" to "neutral" for backward compatibility
  const normalizedVariant = variant === "default" ? "neutral" : variant;

  const getColorClass = () => {
    switch (normalizedVariant) {
      case "primary":
        return "text-blue-700 dark:text-blue-400 bg-blue-100";
      case "success":
        return "text-green-700 dark:text-green-400 bg-green-100";
      case "warning":
        return "text-yellow-700 dark:text-yellow-400 bg-yellow-100";
      case "danger":
        return "text-red-700 dark:text-red-400 bg-red-100";
      case "info":
        return "text-blue-700 dark:text-blue-400 bg-blue-100";
      default:
        return "text-gray-700 dark:text-gray-400 bg-gray-100";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "py-0.5 px-2 text-xs";
      case "md":
        return "py-1 px-2 text-sm";
      case "lg":
        return "py-1 px-2.5 text-base";
      default:
        return "py-1 px-2 text-sm";
    }
  };

  // Deduce the text color from the color class for standalone use
  const getTextOnlyColor = () => {
    switch (normalizedVariant) {
      case "primary":
        return "text-blue-600 dark:text-blue-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      case "info":
        return "text-cyan-600 dark:text-cyan-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
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
