import React from "react";
import { render, screen } from "@testing-library/react";
import MetricsCard from "./MetricsCard";

describe("MetricsCard", () => {
  it("renders with basic props", () => {
    render(<MetricsCard title="Test Metric" value="100" />);

    expect(screen.getByTestId("metrics-card")).toBeInTheDocument();
    expect(screen.getByTestId("metrics-card-title")).toHaveTextContent(
      "Test Metric"
    );
    expect(screen.getByTestId("metrics-card-value")).toHaveTextContent("100");
  });

  it("renders with an icon", () => {
    render(<MetricsCard title="Test Metric" value="100" icon="📊" />);

    expect(screen.getByText("📊")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <MetricsCard
        title="Test Metric"
        value="100"
        className="custom-class"
        testId="custom-metrics"
      />
    );

    expect(screen.getByTestId("custom-metrics")).toHaveClass("custom-class");
  });

  it("renders with custom testId", () => {
    render(
      <MetricsCard title="Test Metric" value="100" testId="custom-metrics" />
    );

    expect(screen.getByTestId("custom-metrics")).toBeInTheDocument();
    expect(screen.getByTestId("custom-metrics-title")).toBeInTheDocument();
    expect(screen.getByTestId("custom-metrics-value")).toBeInTheDocument();
  });

  it("renders with upward trend", () => {
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "up", value: "+10%" }}
        testId="trend-metrics"
      />
    );

    const trendElement = screen.getByTestId("trend-metrics-trend");
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent("↑+10%");
    expect(trendElement).toHaveClass("text-green-600");
  });

  it("renders with downward trend", () => {
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "down", value: "-10%" }}
        testId="trend-metrics"
      />
    );

    const trendElement = screen.getByTestId("trend-metrics-trend");
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent("↓-10%");
    expect(trendElement).toHaveClass("text-red-600");
  });

  it("renders with neutral trend", () => {
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "neutral", value: "0%" }}
        testId="trend-metrics"
      />
    );

    const trendElement = screen.getByTestId("trend-metrics-trend");
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent("→0%");
    expect(trendElement).toHaveClass("text-gray-600");
  });

  it("renders a complex value as children", () => {
    render(
      <MetricsCard
        title="Complex Metric"
        value={
          <div data-testid="complex-value">
            Complex <strong>Value</strong>
          </div>
        }
      />
    );

    expect(screen.getByTestId("complex-value")).toBeInTheDocument();
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });
});
