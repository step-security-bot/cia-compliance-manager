import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

vi.mock("./components/widgets/BusinessImpactAnalysisWidget", () => ({
  default: () => (
    <div data-testid="mock-business-impact">Business Impact Analysis</div>
  ),
}));

vi.mock("./components/widgets/TechnicalDetailsWidget", () => ({
  default: () => (
    <div data-testid="mock-technical-details">Technical Implementation</div>
  ),
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

// Mock modules used by App
vi.mock("./CIAClassificationApp", () => ({
  default: () => (
    <div data-testid="cia-classification-app">CIA Classification App</div>
  ),
}));

describe("App Component", () => {
  beforeEach(() => {
    // Clear all mocks for a fresh start
    vi.resetAllMocks();

    // Create better mock for matchMedia - must return object with matches property
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // This must be explicitly defined
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mockup the LandingPage component correctly
    vi.mock("./components/LandingPage", () => ({
      __esModule: true,
      default: () => (
        <div data-testid="landing-page">
          <h1>Welcome to the CIA Compliance Manager</h1>
          <button data-testid="get-started-button">Get Started</button>
        </div>
      ),
    }));

    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        hash: "",
        pathname: "/",
        reload: vi.fn(),
      },
      writable: true,
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

    // Fix: Use the correct test ID for the Business Impact Analysis widget
    expect(
      screen.getByTestId("mock-widget-business-impact-analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("mock-widget-technical-implementation")
    ).toBeInTheDocument();
  });

  it("renders landing page by default", () => {
    render(<App />);
    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to the CIA Compliance Manager")
    ).toBeInTheDocument();
  });

  // Fix the "navigates to CIA app on click" test
  it("navigates to CIA app on click", () => {
    // Mock the landing page and button content
    vi.mock("./components/LandingPage", () => ({
      default: () => (
        <div data-testid="landing-page">
          <h1>Welcome to the CIA Compliance Manager</h1>
          <button data-testid="get-started-button">Get Started</button>
        </div>
      ),
    }));

    render(<App />);
    // Use testId instead of text content
    const startButton = screen.getByTestId("get-started-button");

    fireEvent.click(startButton);

    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();
  });

  it("shows theme toggle on landing page", () => {
    render(<App />);
    // Change from app-theme-toggle to theme-toggle
    const themeToggle = screen.getByTestId("theme-toggle");
    expect(themeToggle).toBeInTheDocument();

    // Test toggle functionality
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();

    // Toggle back
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
  });

  // Add tests for conditional branches
  // Fix deep linking test
  it("handles deep linking to app view", () => {
    // Reset mocks to ensure clean environment
    vi.resetAllMocks();

    // Set the hash BEFORE the component renders
    Object.defineProperty(window, "location", {
      value: {
        hash: "#app",
        pathname: "/",
        search: "",
        reload: vi.fn(),
      },
      writable: true,
    });

    // Ensure CIAClassificationApp is properly mocked
    vi.mock("./CIAClassificationApp", () => ({
      __esModule: true,
      default: () => <div data-testid="cia-classification-app">CIA App</div>,
    }));

    // Reset modules to ensure the component picks up the mock
    vi.resetModules();

    // Import App dynamically to ensure it uses our mocks
    const { App } = require("./App");
    render(<App />);

    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();
  });

  it("handles backwards navigation from hash changes", () => {
    const { rerender } = render(<App />);

    // Simulate navigation to app
    Object.defineProperty(window, "location", {
      value: {
        hash: "#app",
        pathname: "/",
      },
      writable: true,
    });

    // Trigger hashchange event
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    rerender(<App />);

    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();

    // Simulate navigation back to home
    Object.defineProperty(window, "location", {
      value: {
        hash: "",
        pathname: "/",
      },
      writable: true,
    });

    // Trigger hashchange event
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    rerender(<App />);

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });
});
