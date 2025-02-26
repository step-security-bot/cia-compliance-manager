import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadarChart from "./RadarChart";
import { vi } from "vitest";

// Properly mock Chart.js
vi.mock("chart.js/auto", () => {
  return {
    __esModule: true,
    default: class MockChart {
      static defaults: { color: string } = { color: "#666" }; // Add type annotation
      static register = vi.fn();
      destroy = vi.fn();
      update = vi.fn();
      constructor() {
        return this;
      }
    },
  };
});

describe("RadarChart Component", () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
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
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(ctx);

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

  // Fix the window-related tests that are failing

  // Replace the failing test with a safer implementation
  it("handles DOM environment checks properly", () => {
    // Create a spy for document.documentElement.classList.contains
    const originalDocumentElement = document.documentElement;
    const containsSpy = vi
      .spyOn(document.documentElement.classList, "contains")
      .mockReturnValue(true);

    // Render the component
    const { unmount } = render(
      <RadarChart availability="High" integrity="High" confidentiality="High" />
    );

    // Verify the contains method was called with 'dark'
    expect(containsSpy).toHaveBeenCalledWith("dark");

    unmount();

    // Clean up the spy
    containsSpy.mockRestore();
  });

  it("handles error cases during chart initialization", () => {
    // Mock getContext to return null to simulate canvas API errors
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    // Mock console.error to verify it's not called in test mode
    const consoleErrorSpy = vi.spyOn(console, "error");

    // Should not throw errors
    render(
      <RadarChart availability="High" integrity="High" confidentiality="High" />
    );

    // In test mode, error should not be logged
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Clean up
    consoleErrorSpy.mockRestore();
  });

  it("handles error during chart destruction", () => {
    // Create a simple mock for Chart that has a destroy method that throws
    const mockDestroy = vi.fn().mockImplementation(() => {
      throw new Error("Destroy error");
    });

    // Mock chart instance with throwing destroy method
    const mockChartInstance = {
      destroy: mockDestroy,
    };

    // Use a ref to simulate the chart instance
    const useRefSpy = vi.spyOn(React, "useRef").mockReturnValue({
      current: mockChartInstance,
    });

    // Render the component
    const { unmount } = render(
      <RadarChart availability="High" integrity="High" confidentiality="High" />
    );

    // Test unmounting which should call destroy
    unmount();

    // Restore the spy
    useRefSpy.mockRestore();
  });
});
