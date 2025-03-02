import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard, { DashboardWidget } from "./Dashboard";

describe("Dashboard", () => {
  it("renders children correctly", () => {
    render(
      <Dashboard availability="None" integrity="None" confidentiality="None">
        <div data-testid="test-child">Hello Dashboard</div>
      </Dashboard>
    );

    expect(screen.getByTestId("test-child")).toHaveTextContent(
      "Hello Dashboard"
    );
  });

  it("renders with correct data-testid", () => {
    render(
      <Dashboard availability="None" integrity="None" confidentiality="None">
        <div>Test content</div>
      </Dashboard>
    );

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
  });

  // Add more tests as needed
});

describe("DashboardWidget", () => {
  it("renders with correct title", () => {
    render(
      <DashboardWidget title="Test Widget">
        <div>Widget content</div>
      </DashboardWidget>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
  });

  it("accepts custom testId", () => {
    render(
      <DashboardWidget title="Test Widget" testId="custom-widget-id">
        <div>Widget content</div>
      </DashboardWidget>
    );

    expect(screen.getByTestId("custom-widget-id")).toBeInTheDocument();
  });

  it("renders icons when provided", () => {
    render(
      <DashboardWidget title="Test Widget" icon="🔍">
        <div>Widget content</div>
      </DashboardWidget>
    );

    expect(screen.getByTestId("icon-test-widget")).toHaveTextContent("🔍");
  });
});
