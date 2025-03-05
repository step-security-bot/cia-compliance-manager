import React, { ReactNode } from "react";
import { WIDGET_ICONS } from "../constants/appConstants";
import widgetRegistry from "../utils/widgetRegistry";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../hooks/useCIAOptions";

// Main Dashboard component props
interface DashboardProps {
  children?: ReactNode;
  useRegistry?: boolean;
  availability?: string;
  integrity?: string;
  confidentiality?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  useRegistry = false,
  availability,
  integrity,
  confidentiality,
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
    <div className="dashboard-grid" data-testid="dashboard-grid">
      {useRegistry
        ? widgetRegistry.renderWidgets(undefined, widgetProps)
        : children}
    </div>
  );
};

// Helper function to calculate overall security level
function calculateOverallLevel(
  availability?: string,
  integrity?: string,
  confidentiality?: string
): string {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIndex = levels.indexOf(availability || "None");
  const integrityIndex = levels.indexOf(integrity || "None");
  const confidentialityIndex = levels.indexOf(confidentiality || "None");

  const avgIndex = Math.round(
    (availabilityIndex + integrityIndex + confidentialityIndex) / 3
  );

  return levels[avgIndex] || "None";
}

// Helper function to calculate cost props
function calculateCostProps(
  availability?: string,
  integrity?: string,
  confidentiality?: string
) {
  // Handle undefined values
  const availLevel = availability || "None";
  const intLevel = integrity || "None";
  const confLevel = confidentiality || "None";

  const totalCapex =
    (availabilityOptions[availLevel]?.capex || 0) +
    (integrityOptions[intLevel]?.capex || 0) +
    (confidentialityOptions[confLevel]?.capex || 0);

  const totalOpex =
    (availabilityOptions[availLevel]?.opex || 0) +
    (integrityOptions[intLevel]?.opex || 0) +
    (confidentialityOptions[confLevel]?.opex || 0);

  return {
    totalCapex,
    totalOpex,
    capexEstimate: `${totalCapex * 5000}`,
    opexEstimate: `${totalOpex * 2000}`,
    isSmallSolution: totalCapex <= 60,
    roi: `${Math.round(200 + totalCapex / 2)}%`,
  };
}

// DashboardWidget component for widget containers
interface DashboardWidgetProps {
  title: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  testId?: string;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  size = "medium",
  children,
  className = "",
  icon,
  testId,
}) => {
  // Map widget sizes to grid column spans
  const sizeClasses = {
    small: "widget-col-4", // 1/3 width (standard)
    medium: "widget-col-4", // 1/3 width (standard)
    large: "widget-col-6", // 1/2 width
    full: "widget-col-12", // Full width
  };

  return (
    <div
      className={`widget p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${sizeClasses[size]} ${className}`}
      data-testid={
        testId || `widget-${title.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <div className="widget-header">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
          {icon && <span className="widget-icon mr-2">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
};

export default Dashboard;
