import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Create a simple spy-based mock for Chart.js
jest.mock("chart.js/auto", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Import component after mock is set up
import RadarChart from "./RadarChart";

describe("RadarChart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      canvas: { width: 100, height: 100 },
    });
  });

  it("creates a canvas element", () => {
    const { container } = render(
      <RadarChart availability="Low" integrity="Low" confidentiality="Low" />
    );

    // Verify the canvas element is created
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("initializes the chart with proper context", () => {
    render(
      <RadarChart availability="High" integrity="High" confidentiality="High" />
    );

    // Verify getContext was called with '2d'
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");

    // Verify Chart constructor was called
    const ChartConstructor = require("chart.js/auto").default;
    expect(ChartConstructor).toHaveBeenCalled();
  });

  it("handles various security levels", () => {
    const { rerender } = render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );

    // Test with different combinations of security levels
    rerender(
      <RadarChart
        availability="Very High"
        integrity="Moderate"
        confidentiality="Low"
      />
    );

    // Component should still be in the document
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });
});
