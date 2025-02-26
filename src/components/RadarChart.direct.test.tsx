import React from "react";
import { render, screen } from "@testing-library/react";
import RadarChart from "./RadarChart";
import { vi } from "vitest";

// Track if the mock was called
let mockCalled = false;

// Create a mock for Chart.js using the factory function pattern
vi.mock("chart.js/auto", () => {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation((...args) => {
      // Set our flag when the mock is called
      mockCalled = true;
      return {
        destroy: vi.fn(),
        update: vi.fn(),
      };
    }),
  };
});

describe("RadarChart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset our flag before each test
    mockCalled = false;

    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
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

    // Verify our mock was called (using the flag)
    expect(mockCalled).toBe(true);
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
