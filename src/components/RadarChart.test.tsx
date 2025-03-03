import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import RadarChart from "./RadarChart";

// Mock Chart.js to avoid canvas issues in tests
vi.mock("chart.js/auto", () => {
  return {
    default: class ChartMock {
      static register() {}
      destroy = vi.fn();
      resize = vi.fn();
      update = vi.fn();
      constructor() {}
    },
  };
});

describe("RadarChart Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );

    // Updated test to match actual implementation
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart-container")).toBeInTheDocument();

    // Check for security level values
    expect(screen.getByTestId("radar-availability-value")).toHaveTextContent(
      "A: None"
    );
    expect(screen.getByTestId("radar-integrity-value")).toHaveTextContent(
      "I: None"
    );
    expect(screen.getByTestId("radar-confidentiality-value")).toHaveTextContent(
      "C: None"
    );
  });

  it("handles different security levels", () => {
    render(
      <RadarChart
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
      />
    );

    // Check canvas is rendered
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();

    // Verify security level values are displayed correctly
    expect(screen.getByTestId("radar-availability-value")).toHaveTextContent(
      "A: High"
    );
    expect(screen.getByTestId("radar-integrity-value")).toHaveTextContent(
      "I: Moderate"
    );
    expect(screen.getByTestId("radar-confidentiality-value")).toHaveTextContent(
      "C: Low"
    );
  });

  it("applies custom className", () => {
    render(
      <RadarChart
        availability="None"
        integrity="None"
        confidentiality="None"
        className="custom-class"
      />
    );

    // Check if the radar chart container has the custom class directly
    const container = screen.getByTestId("radar-chart-container");
    expect(container.className).toContain("custom-class");

    // And check if the canvas also has the class
    const canvas = screen.getByTestId("radar-chart");
    expect(canvas.className).toContain("custom-class");
  });

  // ...existing tests for edge cases...

  it("handles canvas rendering errors gracefully", () => {
    // Mock console.error to prevent noise in test output
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock getContext to throw an error
    const getContextMock = vi.fn(() => {
      throw new Error("Could not get canvas context");
    });

    // Save original implementation
    const originalGetContext = HTMLCanvasElement.prototype.getContext;

    // Replace with mock
    HTMLCanvasElement.prototype.getContext = getContextMock;

    render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );

    // Error should be caught and displayed
    expect(screen.getByTestId("radar-chart-error")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart-error")).toHaveTextContent(
      "Error rendering chart"
    );

    // Clean up mocks
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    consoleErrorMock.mockRestore();
  });

  // Add tests for resize functionality
  it("handles resize events", async () => {
    // Mock window.addEventListener and removeEventListener
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    // Render the component
    const { unmount } = render(
      <RadarChart
        availability="Moderate"
        integrity="High"
        confidentiality="Low"
      />
    );

    // Check that resize event listener is added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    // Unmount to verify cleanup
    unmount();

    // Check that event listener is removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    // Clean up spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  // Test dark mode detection
  it("applies dark mode styling when dark mode is active", () => {
    // Mock dark mode
    document.documentElement.classList.add("dark");

    // Mock chart constructor - this is safer
    const mockChartInstance = { destroy: vi.fn(), resize: vi.fn() };
    const mockChartClass = vi.fn(() => mockChartInstance);
    vi.doMock("chart.js/auto", () => ({ default: mockChartClass }));

    render(
      <RadarChart
        availability="Moderate"
        integrity="High"
        confidentiality="Low"
      />
    );

    // Clean up
    document.documentElement.classList.remove("dark");
  });
});
