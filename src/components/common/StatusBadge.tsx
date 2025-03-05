import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

type BadgeStatus = "success" | "warning" | "error" | "info" | "neutral";
type BadgeSize = "xs" | "sm" | "md" | "lg";

interface StatusBadgeProps {
  status?: BadgeStatus;
  size?: BadgeSize;
  children: React.ReactNode;
  testId?: string;
  className?: string;
}

/**
 * StatusBadge component for indicating statuses with consistent styling
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "neutral",
  size = "md",
  children,
  testId,
  className = "",
}) => {
  // Define status-based color schemes
  const statusStyles = {
    success:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  // Define size-based padding and font sizes
  const sizeStyles = {
    xs: "py-0.5 px-1 text-xs",
    sm: "py-0.5 px-2 text-xs",
    md: "py-1 px-3 text-sm",
    lg: "py-1.5 px-4 text-sm",
  };

  // Combine all style classes
  const baseStyles =
    "inline-flex items-center font-medium rounded-full whitespace-nowrap";
  const combinedStyles = `${baseStyles} ${statusStyles[status]} ${sizeStyles[size]} ${className}`;

  return (
    <span
      className={combinedStyles}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.STATUS_BADGE}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
