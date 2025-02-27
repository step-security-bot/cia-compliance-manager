import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard, { DashboardWidget } from "./Dashboard";

describe("Dashboard Component", () => {
  it("renders children correctly", () => {
    render(
      <Dashboard>
        <div data-testid="test-child">Test content</div>
      </Dashboard>
    );

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("creates the dashboard grid layout", () => {
    const { container } = render(
      <Dashboard>
        <div>Test content</div>
      </Dashboard>
    );

    const dashboardGrid = container.querySelector(".dashboard-grid");
    expect(dashboardGrid).toHaveClass("dashboard-grid");
  });
});

describe("DashboardWidget Component", () => {
  it("renders with appropriate title", () => {
    render(
      <DashboardWidget title="Test Widget">
        <div>Widget content</div>
      </DashboardWidget>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByText("Widget content")).toBeInTheDocument();
  });

  it("applies the correct size classes", () => {
    const { rerender } = render(
      <DashboardWidget title="Small Widget" size="small">
        Content
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-small-widget")).toHaveClass(
      "widget-col-2"
    );

    rerender(
      <DashboardWidget title="Medium Widget" size="medium">
        Content
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-medium-widget")).toHaveClass(
      "widget-col-4"
    );

    rerender(
      <DashboardWidget title="Large Widget" size="large">
        Content
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-large-widget")).toHaveClass(
      "widget-col-6"
    );

    rerender(
      <DashboardWidget title="Full Widget" size="full">
        Content
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-full-widget")).toHaveClass(
      "widget-col-12"
    );
  });

  it("applies default medium size when not specified", () => {
    render(<DashboardWidget title="Default Size">Content</DashboardWidget>);

    expect(screen.getByTestId("widget-default-size")).toHaveClass(
      "widget-col-4"
    );
  });

  it("accepts and applies additional classNames", () => {
    render(
      <DashboardWidget title="Custom Class" className="test-class">
        Content
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-custom-class")).toHaveClass("test-class");
  });
});
