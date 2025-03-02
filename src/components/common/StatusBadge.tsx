import React, { ReactNode } from "react";

interface StatusBadgeProps {
  status:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
    | "primary"
    | "indigo";
  children: ReactNode;
  icon?: ReactNode;
  testId?: string;
  className?: string;
  size?: "xs" | "sm" | "md";
}

/**
 * StatusBadge component for displaying consistent status indicators across the application
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  icon,
  testId,
  className = "",
  size = "sm",
}) => {
  const getStatusClasses = (): string => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "primary":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "indigo":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "neutral":
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getSizeClass = (): string => {
    switch (size) {
      case "xs":
        return "text-xs px-1.5 py-0.5";
      case "md":
        return "text-sm px-2.5 py-1";
      case "sm":
      default:
        return "text-xs px-2 py-0.5";
    }
  };

  return (
    <span
      className={`font-medium rounded-full inline-flex items-center ${getStatusClasses()} ${getSizeClass()} ${className}`}
      data-testid={testId || `status-badge-${status}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default StatusBadge;
