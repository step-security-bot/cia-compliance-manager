import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

// Mock Chart.js
vi.mock("chart.js/auto", () => ({
  default: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

// Mock the useCIAOptions hook
vi.mock("./hooks/useCIAOptions", async () => {
  const mockOptions = {
    None: {
      description: "None level",
      technical: "Technical details",
      businessImpact: "Business impact",
      impact: "None",
      capex: 0,
      opex: 0,
      bg: "#ccc",
      text: "#000",
    },
    Low: {
      description: "Low level",
      technical: "Technical details",
      businessImpact: "Business impact",
      impact: "Low",
      capex: 10,
      opex: 5,
      bg: "#ffe",
      text: "#000",
    },
  };

  return {
    useCIAOptions: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
    }),
    // Export these directly as required by the components
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };
});

// Mock any components that might cause issues
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
    // Updated test to check for dashboard-grid that is actually rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders selection components with proper labels", () => {
    render(<App />);

    // FIX: Use data-testid selectors instead of text content to be more specific
    expect(screen.getByTestId("availability-kv-label")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-kv-label")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-kv-label")).toBeInTheDocument();

    // Alternative approach: Use getAllByText and check the length if needed
    expect(screen.getAllByText("Availability").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Integrity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Confidentiality").length).toBeGreaterThan(0);
  });

  it("renders dashboard structure correctly", () => {
    render(<App />);
    // Updated to look for elements that are actually in the rendered output
    expect(screen.getByText("Security Profile")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});

describe("App", () => {
  it("renders the application title", () => {
    render(<App />);
    // Updated to match the actual title in the current component
    expect(screen.getByText("CIA Compliance Manager")).toBeInTheDocument();
  });

  it("renders the dashboard by default", () => {
    render(<App />);
    // Updated to check for elements that are actually rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
