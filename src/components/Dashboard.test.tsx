import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Dashboard, { DashboardWidget } from "./Dashboard";

// Mock components
const MockChild = () => (
  <div data-testid="mock-child">Mock Child Component</div>
);

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

  it("renders the dashboard with widgets", () => {
    render(
      <Dashboard
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
      >
        <MockChild />
      </Dashboard>
    );

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    expect(screen.getByTestId("mock-child")).toBeInTheDocument();
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
    expect(screen.getByTestId("widget-integrity-impact")).toBeInTheDocument();
    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
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

  it("renders the widget with correct title", () => {
    render(
      <DashboardWidget title="Test Widget" testId="custom-test-id">
        <MockChild />
      </DashboardWidget>
    );

    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByTestId("mock-child")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <DashboardWidget title="Small Widget" size="small">
        <MockChild />
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-small-widget")).toHaveClass(
      "widget-col-2"
    );

    rerender(
      <DashboardWidget title="Large Widget" size="large">
        <MockChild />
      </DashboardWidget>
    );

    expect(screen.getByTestId("widget-large-widget")).toHaveClass(
      "widget-col-6"
    );
  });
});
