import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";

// Improve mock setup to avoid JSDOM errors

// Mock Dashboard component with a simpler implementation
vi.mock("./components/Dashboard", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dashboard">{children}</div>
  ),
  DashboardWidget: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
  }) => (
    <div
      data-testid={
        testId || `mock-widget-${title.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <h3>{title}</h3>
      <div className="widget-content">{children}</div>
    </div>
  ),
}));

// Better mock for SecurityLevelWidget
vi.mock("./components/widgets/SecurityLevelWidget", () => ({
  default: () => (
    <div data-testid="mock-security-level">Security Level Widget</div>
  ),
}));

// Mock other widget components that might cause issues
vi.mock("./components/widgets/CostEstimationWidget", () => ({
  default: () => <div data-testid="mock-cost-estimation">Cost Estimation</div>,
}));

vi.mock("./components/widgets/SecuritySummaryWidget", () => ({
  default: () => (
    <div data-testid="mock-security-summary">Security Summary</div>
  ),
}));

vi.mock("./components/widgets/ValueCreationWidget", () => ({
  default: () => <div data-testid="mock-value-creation">Value Creation</div>,
}));

vi.mock("./components/widgets/ComplianceStatusWidget", () => ({
  default: () => (
    <div data-testid="mock-compliance-status">Compliance Status</div>
  ),
}));

vi.mock("./components/widgets/CombinedBusinessImpactWidget", () => ({
  default: () => <div data-testid="mock-business-impact">Business Impact</div>,
}));

// More reliable RadarChart mock
vi.mock("./components/RadarChart", () => ({
  default: ({
    availability,
    integrity,
    confidentiality,
  }: {
    availability: string;
    integrity: string;
    confidentiality: string;
    className?: string;
  }) => (
    <div data-testid="mock-radar-chart">
      <div data-testid="mock-radar-availability">{availability}</div>
      <div data-testid="mock-radar-integrity">{integrity}</div>
      <div data-testid="mock-radar-confidentiality">{confidentiality}</div>
    </div>
  ),
}));

// Simplified mock for useCIAOptions
vi.mock("./hooks/useCIAOptions", () => ({
  availabilityOptions: {
    None: { capex: 0, opex: 0 },
    Moderate: { capex: 10, opex: 5, technical: "Test" },
  },
  integrityOptions: {
    None: { capex: 0, opex: 0 },
    Moderate: { capex: 15, opex: 7, technical: "Test" },
  },
  confidentialityOptions: {
    None: { capex: 0, opex: 0 },
    Moderate: { capex: 20, opex: 10, technical: "Test" },
  },
}));

// Mock document methods safely
beforeEach(() => {
  // Create a proper mock for document.documentElement
  Object.defineProperty(document, "documentElement", {
    writable: true,
    value: {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn().mockReturnValue(false),
      },
    },
  });

  // Mock getElementById safely
  document.getElementById = vi.fn().mockImplementation(() => ({
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  }));

  // Mock matchMedia safely
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

describe("CIAClassificationApp Component", () => {
  it("renders without crashing", () => {
    render(<CIAClassificationApp />);
    expect(screen.getByTestId("app-container")).toBeInTheDocument();
    expect(
      screen.getByText("CIA Compliance Manager Dashboard")
    ).toBeInTheDocument();
  });

  it("toggles dark mode when button is clicked", () => {
    render(<CIAClassificationApp />);
    const toggleButton = screen.getByTestId("theme-toggle");

    // Initial state should not be dark (mocked)
    const appContainer = screen.getByTestId("app-container");
    expect(appContainer.className).not.toContain("dark");

    // Click toggle button
    fireEvent.click(toggleButton);

    // After clicking, should be in dark mode
    expect(appContainer.className).toContain("dark");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
  });

  it("renders security level widget", () => {
    render(<CIAClassificationApp />);
    expect(screen.getByTestId("mock-security-level")).toBeInTheDocument();
  });

  it("renders radar chart", () => {
    render(<CIAClassificationApp />);
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
  });

  it("responds to test events", async () => {
    render(<CIAClassificationApp />);

    // Initially "None" (default)
    expect(screen.getByTestId("mock-radar-availability")).toHaveTextContent(
      "None"
    );

    // Create and dispatch a custom event
    const testEvent = new CustomEvent("test:set-values", {
      detail: {
        availability: "High",
        integrity: "Moderate",
        confidentiality: "Low",
      },
    });

    // Use act to wrap the event dispatch
    act(() => {
      document.dispatchEvent(testEvent);
    });

    // Wait for component to update using findBy instead of getBy
    await screen.findByText("High");

    // Now check the updated values
    expect(screen.getByTestId("mock-radar-availability")).toHaveTextContent(
      "High"
    );
    expect(screen.getByTestId("mock-radar-integrity")).toHaveTextContent(
      "Moderate"
    );
    expect(screen.getByTestId("mock-radar-confidentiality")).toHaveTextContent(
      "Low"
    );
  });
});
