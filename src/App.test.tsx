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

vi.mock("./hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: {
        description: "None desc",
        technical: "None tech",
        businessImpact: "None impact",
      },
      Low: {
        description: "Low desc",
        technical: "Low tech",
        businessImpact: "Low impact",
      },
      Moderate: {
        description: "Moderate desc",
        technical: "Moderate tech",
        businessImpact: "Moderate impact",
      },
      High: {
        description: "High desc",
        technical: "High tech",
        businessImpact: "High impact",
      },
      "Very High": {
        description: "Very High desc",
        technical: "Very High tech",
        businessImpact: "Very High impact",
      },
    },
    integrityOptions: {
      None: {
        description: "None desc",
        technical: "None tech",
        businessImpact: "None impact",
      },
      Low: {
        description: "Low desc",
        technical: "Low tech",
        businessImpact: "Low impact",
      },
      Moderate: {
        description: "Moderate desc",
        technical: "Moderate tech",
        businessImpact: "Moderate impact",
      },
      High: {
        description: "High desc",
        technical: "High tech",
        businessImpact: "High impact",
      },
      "Very High": {
        description: "Very High desc",
        technical: "Very High tech",
        businessImpact: "Very High impact",
      },
    },
    confidentialityOptions: {
      None: {
        description: "None desc",
        technical: "None tech",
        businessImpact: "None impact",
      },
      Low: {
        description: "Low desc",
        technical: "Low tech",
        businessImpact: "Low impact",
      },
      Moderate: {
        description: "Moderate desc",
        technical: "Moderate tech",
        businessImpact: "Moderate impact",
      },
      High: {
        description: "High desc",
        technical: "High tech",
        businessImpact: "High impact",
      },
      "Very High": {
        description: "Very High desc",
        technical: "Very High tech",
        businessImpact: "Very High impact",
      },
    },
  }),
}));

// Mock components that might cause issues
vi.mock("./components/widgets/SecuritySummaryWidget", () => ({
  default: () => (
    <div data-testid="security-summary-widget">Security Summary Mock</div>
  ),
}));

vi.mock("./components/widgets/ComplianceStatusWidget", () => ({
  default: () => (
    <div data-testid="compliance-status-widget">Compliance Status Mock</div>
  ),
}));

vi.mock("./components/widgets/ValueCreationWidget", () => ({
  default: () => (
    <div data-testid="value-creation-widget">Value Creation Mock</div>
  ),
}));

vi.mock("./components/widgets/CostEstimationWidget", () => ({
  default: () => (
    <div data-testid="cost-estimation-widget">Cost Estimation Mock</div>
  ),
}));

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

describe("App", () => {
  it("renders the application title", () => {
    render(<App />);
    expect(screen.getByText("CIA Compliance Manager")).toBeInTheDocument();
  });

  it("renders the dashboard by default", () => {
    render(<App />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
