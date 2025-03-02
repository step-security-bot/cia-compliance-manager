import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard, { DashboardWidget } from "./Dashboard";

// Mock the widget registry
vi.mock("../utils/widgetRegistry", () => ({
  default: {
    renderWidgets: vi.fn(() => [<div key="mock-widget">Mock Widget</div>]),
  },
  __esModule: true,
}));

// Mock the useCIAOptions hook
vi.mock("../hooks/useCIAOptions", () => ({
  availabilityOptions: {
    Moderate: { capex: 10, opex: 5 },
  },
  integrityOptions: {
    Moderate: { capex: 15, opex: 7 },
  },
  confidentialityOptions: {
    Moderate: { capex: 20, opex: 10 },
  },
}));

describe("Dashboard Component", () => {
  const defaultProps = {
    children: <div data-testid="test-child">Test Child</div>,
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  };

  it("renders children when useRegistry is false", () => {
    render(<Dashboard {...defaultProps} />);

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("uses widget registry when useRegistry is true", () => {
    render(<Dashboard {...defaultProps} useRegistry={true} />);

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    expect(screen.getByText("Mock Widget")).toBeInTheDocument();
  });
});

describe("DashboardWidget Component", () => {
  it("renders with correct props", () => {
    render(
      <DashboardWidget title="Test Widget" testId="test-widget">
        <div>Widget Content</div>
      </DashboardWidget>
    );

    expect(screen.getByTestId("test-widget")).toBeInTheDocument();
    expect(screen.getByText("Widget Content")).toBeInTheDocument();
  });
});
