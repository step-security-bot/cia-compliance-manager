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
  return (
    <WidgetContainer
      title={title}
      size={size}
      className={className}
      icon={icon}
      testId={testId || `widget-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {children}
    </WidgetContainer>
  );
};

// Export predefined widget titles
export const WIDGET_TITLES = UI_TEXT.WIDGET_TITLES;

export default Dashboard;
