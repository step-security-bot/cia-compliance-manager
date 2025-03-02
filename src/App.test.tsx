import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";

// Mock components and hooks
vi.mock("./components/SecurityLevelSelector", () => ({
  default: () => (
    <div data-testid="mock-security-selector">Security Selector</div>
  ),
}));

// Fix: Include the DashboardWidget named export in the Dashboard mock
vi.mock("./components/Dashboard", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dashboard">{children}</div>
  ),
  // Add the missing DashboardWidget export
  DashboardWidget: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div
      data-testid={`mock-widget-${title?.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {children}
    </div>
  ),
}));

vi.mock("./components/RadarChart", () => ({
  default: () => <div data-testid="mock-radar-chart">Radar Chart</div>,
}));

vi.mock("./components/widgets/SecuritySummaryWidget", () => ({
  default: () => (
    <div data-testid="mock-security-summary">Security Summary</div>
  ),
}));

vi.mock("./components/widgets/ComplianceStatusWidget", () => ({
  default: () => (
    <div data-testid="mock-compliance-status">Compliance Status</div>
  ),
}));

vi.mock("./components/widgets/ValueCreationWidget", () => ({
  default: () => <div data-testid="mock-value-creation">Value Creation</div>,
}));

vi.mock("./components/widgets/CostEstimationWidget", () => ({
  default: () => <div data-testid="mock-cost-estimation">Cost Estimation</div>,
}));

vi.mock("./hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: { Moderate: { capex: 10, opex: 5 } },
    integrityOptions: { Moderate: { capex: 15, opex: 7 } },
    confidentialityOptions: { Moderate: { capex: 20, opex: 10 } },
  }),
}));

// Mock the applyWidgetStyling function
vi.mock("./utils/widgetUtils", () => ({
  applyWidgetStyling: vi.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock matchMedia for theme detection
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders without crashing", () => {
    render(<App />);

    expect(screen.getByText("CIA Compliance Manager")).toBeInTheDocument();
    expect(screen.getByTestId("mock-security-selector")).toBeInTheDocument();
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dashboard")).toBeInTheDocument();
  });

  it("toggles dark mode when button is clicked", async () => {
    render(<App />);

    const toggleButton = screen.getByTestId("theme-toggle");
    expect(toggleButton).toBeInTheDocument();

    await userEvent.click(toggleButton);

    // Check that the dark class is added
    expect(screen.getByText("LIGHT MODE")).toBeInTheDocument();
  });

  it("renders all dashboard widgets", () => {
    render(<App />);

    // Check that all the widgets are rendered
    expect(
      screen.getByTestId("mock-widget-security-summary")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-widget-compliance-status")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-widget-value-creation")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-widget-cost-estimation")
    ).toBeInTheDocument();
  });
});
