import React, { ReactNode } from "react";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

interface WidgetContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  testId?: string;
  actions?: ReactNode;
  icon?: ReactNode; // Add icon prop
  size?: "small" | "medium" | "large" | "full"; // Add size prop for widget registry
  headerContent?: ReactNode; // Add headerContent prop
  contentTitle?: string; // Add contentTitle prop
  loading?: boolean; // Add loading prop
  error?: Error | null; // Add error prop
}

/**
 * WidgetContainer component for displaying widgets with consistent styling
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  subtitle,
  children,
  className = "",
  testId,
  actions,
  icon,
  headerContent,
  contentTitle,
  loading = false,
  error = null,
}) => {
  return (
    <section
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}
      role="region"
      aria-labelledby={`widget-title-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      data-testid={testId}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
            id={`widget-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {headerContent && <div>{headerContent}</div>}
      </div>
      {contentTitle && (
        <h3
          className="text-md font-medium mb-2"
          data-testid={WIDGET_TEST_IDS.CONTENT_TITLE}
        >
          {contentTitle}
        </h3>
      )}
      {loading ? (
        <div
          className="animate-pulse p-4"
          data-testid={WIDGET_TEST_IDS.LOADING_INDICATOR}
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : error ? (
        <div
          className="text-red-500 p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded"
          data-testid="error-message"
        >
          {error.message || String(error)}
        </div>
      ) : (
        <div className="space-y-4" data-testid={WIDGET_TEST_IDS.DATA_CONTAINER}>
          {children}
        </div>
      )}
    </section>
  );
};

export default WidgetContainer;
