import React, { ReactNode } from "react";

interface WidgetContainerProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  testId?: string;
  size?: "small" | "medium" | "large" | "full";
}

/**
 * Standard Widget Container component to ensure consistent styling across all widgets.
 * This component provides a consistent layout with a header and body for widget content.
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  icon,
  children,
  className = "",
  testId,
  size = "medium",
}) => {
  // Map size to grid columns
  const sizeClasses = {
    small: "widget-col-2",
    medium: "widget-col-4",
    large: "widget-col-6",
    full: "widget-col-12",
  };

  return (
    <div
      className={`widget ${sizeClasses[size]} ${className} bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md`}
      data-testid={
        testId || `widget-${title.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <div className="widget-header p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-t-lg">
        <h3 className="text-md font-semibold flex items-center">
          {icon && <span className="mr-2 widget-icon">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="widget-body p-3 overflow-hidden">{children}</div>
    </div>
  );
};

export default WidgetContainer;
