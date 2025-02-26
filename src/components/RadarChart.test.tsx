import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadarChart from "./RadarChart";

// Properly mock Chart.js
jest.mock("chart.js/auto", () => {
  return {
    __esModule: true,
    default: class MockChart {
      static defaults: { color: string } = { color: "#666" }; // Add type annotation
      static register = jest.fn();
      destroy = jest.fn();
      update = jest.fn();
      constructor() {
        return this;
      }
    },
  };
});

describe("RadarChart Component", () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      canvas: { width: 100, height: 100 },
    });
  });

  it("renders with default props", () => {
    const { container } = render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("handles component updates with new values", async () => {
    const { rerender } = render(
      <RadarChart availability="Low" integrity="Low" confidentiality="Low" />
    );

    // Update with new props
    rerender(
      <RadarChart availability="High" integrity="High" confidentiality="High" />
    );

    await waitFor(() => {
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });
  });

  it("handles extreme values properly", () => {
    render(
      <RadarChart
        availability="Very High"
        integrity="Very High"
        confidentiality="Very High"
      />
    );
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("cleans up resources on unmount", () => {
    const { unmount } = render(
      <RadarChart
        availability="Low"
        integrity="Moderate"
        confidentiality="High"
      />
    );

    unmount();
    // The test passes if no errors are thrown during unmount
  });

  it("handles chart option configurations correctly", () => {
    const { rerender } = render(
      <RadarChart
        availability="High"
        integrity="Moderate"
        confidentiality="None"
      />
    );

    // Test with different props to exercise various code paths
    rerender(
      <RadarChart
        availability="None"
        integrity="Very High"
        confidentiality="Low"
      />
    );

    // Test with extreme values to hit edge conditions
    rerender(
      <RadarChart
        availability="Very High"
        integrity="None"
        confidentiality="Very High"
      />
    );

    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("handles canvas refs and chart initialization", () => {
    // Mock the canvas element with a more sophisticated setup
    const canvasMock = document.createElement("canvas");
    const ctx = {
      canvas: canvasMock,
      clearRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
    };

    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(ctx);

    const { unmount, rerender } = render(
      <RadarChart
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
      />
    );

    // Force re-render to test componentDidUpdate paths
    rerender(
      <RadarChart
        availability="Very High"
        integrity="High"
        confidentiality="Very High"
      />
    );

    // Test cleanup
    unmount();
  });

  it("handles zero-value selections properly", () => {
    // This test targets specific cases where values might be 0
    // which can trigger different code paths
    render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );

    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });
});
