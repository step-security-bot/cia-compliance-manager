import React, { ReactNode } from "react";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "neutral";
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  testId?: string;
  className?: string;
  // Re-add icon prop for backward compatibility
  icon?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  size = "md",
  testId,
  className = "",
  icon, // Include the icon prop
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "text-xs px-1.5 py-0.5";
      case "sm":
        return "text-xs px-2 py-1";
      case "lg":
        return "text-sm px-3 py-1.5";
      default:
        return "text-xs px-2.5 py-1";
    }
  };

  return (
    <span
      className={`font-medium rounded-full inline-flex items-center ${getStatusStyles()} ${getSizeStyles()} ${className}`}
      data-testid={testId || "status-badge"}
      data-status={status} // Keep the data-status attribute for testing
      data-size={size} // Keep the size information for test verification
    >
      {/* Include the icon if provided */}
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default StatusBadge;
