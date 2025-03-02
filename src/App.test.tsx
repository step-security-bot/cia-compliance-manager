import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { vi } from "vitest";

// Define interface for Chart.js mock
interface MockChartInstance {
  ctx: CanvasRenderingContext2D | null;
  config: any;
  data: any;
  options: any;
  canvas: HTMLCanvasElement | null;
  update: () => void;
  destroy: () => void;
  resize: () => void;
}

// Better mock for Chart.js with TypeScript support
vi.mock("chart.js/auto", () => {
  return {
    default: class MockChart implements MockChartInstance {
      static register(): void {}
      static defaults = {
        font: {},
        plugins: {},
      };

      ctx: CanvasRenderingContext2D | null;
      config: any;
      data: any;
      options: any;
      canvas: HTMLCanvasElement | null;

      constructor(ctx: CanvasRenderingContext2D | null, config: any) {
        this.ctx = ctx;
        this.config = config || {};
        this.data = config?.data || { datasets: [] };
        this.options = config?.options || {};
        this.canvas = ctx ? ctx.canvas : null;
      }

      update(): void {
        // Mock implementation
      }

      destroy(): void {
        // Mock implementation
      }

      resize(): void {
        // Mock implementation
      }
    },
  };
});

describe("App Component", () => {
  beforeEach(() => {
    // Silence the expected console errors from Chart.js
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (
        typeof message === "string" &&
        (message.includes("Failed to create chart") ||
          message.includes("can't acquire context"))
      ) {
        return;
      }
      // Log other errors normally
      console.log(message);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders app dashboard correctly", () => {
    render(<App />);
    expect(screen.getByTestId("app-container")).toBeInTheDocument();
    expect(
      screen.getByText(/CIA Compliance Manager Dashboard/i)
    ).toBeInTheDocument();
  });

  it("renders selection components with proper labels", () => {
    render(<App />);

    // Check for selection labels
    expect(screen.getByTestId("availability-label")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-label")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-label")).toBeInTheDocument();
  });

  it("renders dashboard structure correctly", () => {
    render(<App />);

    // Verify dashboard grid exists
    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();

    // Check for key widgets
    expect(
      screen.getByTestId("widget-security-level-selection")
    ).toBeInTheDocument();
    expect(screen.getByTestId("widget-security-summary")).toBeInTheDocument();
  });
});
