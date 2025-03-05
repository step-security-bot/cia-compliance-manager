import React from "react";
import { render, screen } from "@testing-library/react";
import MetricsCard from "./MetricsCard";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("MetricsCard", () => {
  it("renders with basic props", () => {
    render(<MetricsCard title="Test Metric" value="100" />);

    expect(screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD)).toBeInTheDocument();
    expect(screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TITLE)).toHaveTextContent(
      "Test Metric"
    );
    expect(screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_VALUE)).toHaveTextContent("100");
  });

  it("renders with an icon", () => {
    render(<MetricsCard title="Test Metric" value="100" icon="📊" />);

    expect(screen.getByText("📊")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const testId = "custom-metrics";
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        className="custom-class"
        testId={testId}
      />
    );

    expect(screen.getByTestId(testId)).toHaveClass("custom-class");
  });

  it("renders with custom testId", () => {
    const testId = "custom-metrics";
    render(
      <MetricsCard title="Test Metric" value="100" testId={testId} />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-value`)).toBeInTheDocument();
  });

  it("renders with upward trend", () => {
    const testId = "trend-metrics";
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "up", value: "+10%" }}
        testId={testId}
      />
    );

    const trendElement = screen.getByTestId(`${testId}-trend`);
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent("↑+10%");
    expect(trendElement).toHaveClass("text-green-600");
  });

  it("renders with downward trend", () => {
    const testId = "trend-metrics";
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "down", value: "-10%" }}
        testId={testId}
      />
    );

    const trendElement = screen.getByTestId(`${testId}-trend`);
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent("↓-10%");
    expect(trendElement).toHaveClass("text-red-600");
  });

  it("renders with neutral trend", () => {
    const testId = "trend-metrics";
    render(
      <MetricsCard
        title="Test Metric"
        value="100"
        trend={{ direction: "neutral", value: "0%" }}
        testId={testId}
      />
    );

    const trendElement = screen.getByTestId(`${testId}-trend`);
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
