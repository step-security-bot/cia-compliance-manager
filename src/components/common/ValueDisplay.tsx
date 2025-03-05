import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

type DisplayVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
type DisplaySize = "xs" | "sm" | "md" | "lg" | "xl";

interface ValueDisplayProps {
  value: ReactNode;
  label?: string;
  variant?: DisplayVariant;
  size?: DisplaySize;
  testId?: string;
  className?: string;
}

/**
 * ValueDisplay component for displaying values with consistent styling
 * Used for showing security levels, metrics, and other values
 */
const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  label,
  variant = "default",
  size = "md",
  testId,
  className = "",
}) => {
  // Define variant-based color schemes
  const variantStyles = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    info: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  };

  // Define size-based padding and font sizes
  const sizeStyles = {
    xs: "py-0.5 px-1 text-xs",
    sm: "py-0.5 px-2 text-xs",
    md: "py-1 px-3 text-sm",
    lg: "py-1.5 px-4 text-base",
    xl: "py-2 px-5 text-lg",
  };

  // Combine all style classes
  const baseStyles =
    "inline-flex items-center font-medium rounded whitespace-nowrap";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <span
      className={combinedStyles}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}
    >
      {label && <span className="mr-1 font-bold">{label}:</span>}
      <span
        data-testid={
          testId ? `${testId}-value` : COMMON_COMPONENT_TEST_IDS.DISPLAYED_VALUE
        }
      >
        {value}
      </span>
    </span>
  );
};

export default ValueDisplay;
