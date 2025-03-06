import React, { ReactNode } from "react";

interface WidgetContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  testId?: string;
  actions?: ReactNode;
  icon?: ReactNode; // Add icon prop
  size?: "small" | "medium" | "large" | "full"; // Add size prop for widget registry
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
}) => {
  return (
    <section
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}
      data-testid={testId}
      role="region"
      aria-labelledby={`widget-title-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2
            id={`widget-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};

export default WidgetContainer;
