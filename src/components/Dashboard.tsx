import React, { ReactNode } from "react";
import { UI_TEXT, WIDGET_ICONS } from "../constants/appConstants";
import { WidgetContainer } from "./common";
import widgetRegistry from "../utils/widgetRegistry";
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
  useRegistry?: boolean; // Flag to use widget registry instead of children
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  availability,
  integrity,
  confidentiality,
  useRegistry = false,
}) => {
  // Prepare props for business impact widgets
  const impactWidgetProps = {
    "availability-impact": {
      level: availability,
      options: availabilityOptions,
    },
    "integrity-impact": {
      level: integrity,
      options: integrityOptions,
    },
    "confidentiality-impact": {
      level: confidentiality,
      options: confidentialityOptions,
    },
  };

  // Common props for security widgets
  const securityProps = {
    securityLevel: calculateOverallLevel(
      availability,
      integrity,
      confidentiality
    ),
    availabilityLevel: availability,
    integrityLevel: integrity,
    confidentialityLevel: confidentiality,
  };

  // Props for each registered widget
  const widgetProps = {
    "security-summary": securityProps,
    "compliance-status": {
      securityLevels: {
        availability,
        integrity,
        confidentiality,
      },
    },
    "value-creation": {
      securityLevel: securityProps.securityLevel,
    },
    "cost-estimation": calculateCostProps(
      availability,
      integrity,
      confidentiality
    ),
    ...impactWidgetProps,
  };

  return (
    <div
      className="dashboard-grid overflow-visible"
      data-testid="dashboard-grid"
    >
      {useRegistry
        ? widgetRegistry.renderWidgets(undefined, widgetProps)
        : children}
    </div>
  );
};

// Helper function to calculate overall security level
function calculateOverallLevel(
  availability: string,
  integrity: string,
  confidentiality: string
): string {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIndex = levels.indexOf(availability);
  const integrityIndex = levels.indexOf(integrity);
  const confidentialityIndex = levels.indexOf(confidentiality);

  const avgIndex = Math.round(
    (availabilityIndex + integrityIndex + confidentialityIndex) / 3
  );

  return levels[avgIndex] || "None";
}

// Helper function to calculate cost props
function calculateCostProps(
  availability: string,
  integrity: string,
  confidentiality: string
) {
  // This is a simplified version - you would replace with your actual calculation logic
  const totalCapex =
    (availabilityOptions[availability]?.capex || 0) +
    (integrityOptions[integrity]?.capex || 0) +
    (confidentialityOptions[confidentiality]?.capex || 0);

  const totalOpex =
    (availabilityOptions[availability]?.opex || 0) +
    (integrityOptions[integrity]?.opex || 0) +
    (confidentialityOptions[confidentiality]?.opex || 0);

  return {
    totalCapex,
    totalOpex,
    capexEstimate: `${totalCapex * 5000}`,
    opexEstimate: `${totalOpex * 2000}`,
    isSmallSolution: totalCapex <= 60,
    roi: `${Math.round(200 + totalCapex / 2)}%`,
  };
}

interface DashboardWidgetProps {
  title: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  testId?: string;
}

// Keep the original DashboardWidget for backward compatibility
export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  size = "medium",
  children,
  className = "",
  icon,
  testId,
}) => {
  // Map widget sizes to grid column spans - all standard widgets now use the same size
  const sizeClasses = {
    small: "widget-col-4", // Changed to be the same as medium
    medium: "widget-col-4", // Standard 1/3 width widget
    large: "widget-col-4", // Changed to be the same as medium
    full: "widget-col-12", // Only full remains different
  };

  return (
    <div
      className={`widget ${sizeClasses[size]}`}
      data-testid={
        testId || `widget-${title.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <div className="widget-header">
        <h3 className="text-sm font-semibold">
          {icon && <span className="widget-icon mr-2">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
};

// Export predefined widget titles
export const WIDGET_TITLES = UI_TEXT.WIDGET_TITLES;

// Export the fixed column sizes to ensure proper grid layout
export const GRID_SIZES = {
  SMALL: "widget-col-3",
  MEDIUM: "widget-col-4",
  LARGE: "widget-col-6",
  FULL: "widget-col-12",
};

export default Dashboard;
