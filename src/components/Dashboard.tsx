import React, { ReactNode } from "react";
import { UI_TEXT, WIDGET_ICONS } from "../constants/appConstants";
import BusinessImpactAnalysisWidget from "./widgets/BusinessImpactAnalysisWidget";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../hooks/useCIAOptions";

interface DashboardProps {
  children: ReactNode;
  availability: string;
  integrity: string;
  confidentiality: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  availability,
  integrity,
  confidentiality,
}) => {
  return (
    <div
      className="dashboard-grid overflow-visible"
      data-testid="dashboard-grid"
    >
      {children}

      {/* Use original testIds for backward compatibility with Cypress tests */}
      <DashboardWidget
        title="Availability Impact"
        icon={WIDGET_ICONS.AVAILABILITY_IMPACT}
        testId="widget-availability-impact"
      >
        <BusinessImpactAnalysisWidget
          category="Availability"
          level={availability}
          options={availabilityOptions}
        />
      </DashboardWidget>

      <DashboardWidget
        title="Integrity Impact"
        icon={WIDGET_ICONS.INTEGRITY_IMPACT}
        testId="widget-integrity-impact"
      >
        <BusinessImpactAnalysisWidget
          category="Integrity"
          level={integrity}
          options={integrityOptions}
        />
      </DashboardWidget>

      <DashboardWidget
        title="Confidentiality Impact"
        icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
        testId="widget-confidentiality-impact"
      >
        <BusinessImpactAnalysisWidget
          category="Confidentiality"
          level={confidentiality}
          options={confidentialityOptions}
        />
      </DashboardWidget>
    </div>
  );
};

interface DashboardWidgetProps {
  title: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  testId?: string; // Add testId prop to fix TS error
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  size = "medium",
  children,
  className = "",
  icon,
  testId, // Add to component parameters
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
          {icon && (
            <span
              className="mr-2 widget-icon"
              data-testid={`icon-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {icon}
            </span>
          )}
          {title}
        </h3>
      </div>
      <div className="widget-body p-3">{children}</div>
    </div>
  );
};

// Export predefined widget titles
export const WIDGET_TITLES = UI_TEXT.WIDGET_TITLES;

export default Dashboard;
