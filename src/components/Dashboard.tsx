import React, { ReactNode } from "react";
import { UI_TEXT } from "../constants/appConstants";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="dashboard-grid" data-testid="dashboard-grid">
      {children}
    </div>
  );
};

interface DashboardWidgetProps {
  title: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  className?: string;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  size = "medium",
  children,
  className = "",
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
      className={`widget ${sizeClasses[size]} ${className}`}
      data-testid={`widget-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="widget-header">
        <h3 className="text-md font-semibold">{title}</h3>
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
};

// Export predefined widget titles
export const WIDGET_TITLES = UI_TEXT.WIDGET_TITLES;

export default Dashboard;
