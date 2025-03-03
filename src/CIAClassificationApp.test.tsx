import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";

// Mock components and hooks
vi.mock("./components/Dashboard", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dashboard">{children}</div>
  ),
  DashboardWidget: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div
      data-testid={`mock-widget-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {children}
    </div>
  ),
}));

vi.mock("./components/widgets/SecurityLevelWidget", () => ({
  default: () => (
    <div data-testid="mock-security-level">Security Level Widget</div>
  ),
}));

vi.mock("./components/RadarChart", () => ({
  default: () => <div data-testid="mock-radar-chart">Radar Chart</div>,
}));

vi.mock("./hooks/useCIAOptions", () => {
  const actual = vi.importActual("./hooks/useCIAOptions");
  return {
    ...actual,
    availabilityOptions: { Moderate: { capex: 10, opex: 5 } },
    integrityOptions: { Moderate: { capex: 15, opex: 7 } },
    confidentialityOptions: { Moderate: { capex: 20, opex: 10 } },
  };
});

// Mock document methods for theme toggle
const mockDocumentMethodsForThemeToggle = () => {
  Object.defineProperty(document, "documentElement", {
    writable: true,
    value: {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    },
  });

  Object.defineProperty(document, "getElementById", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    })),
  });
};

describe("CIAClassificationApp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDocumentMethodsForThemeToggle();

    // Properly spy on document.addEventListener
    vi.spyOn(document, "addEventListener");
    vi.spyOn(document, "dispatchEvent");

    // Mock matchMedia
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
    render(<CIAClassificationApp />);

    expect(screen.getByTestId("app-container")).toBeInTheDocument();
    expect(
      screen.getByText("CIA Compliance Manager Dashboard")
    ).toBeInTheDocument();
  });

  it("toggles dark mode when button is clicked", async () => {
    render(<CIAClassificationApp />);

    const toggleButton = screen.getByTestId("theme-toggle");
    expect(toggleButton).toBeInTheDocument();

    await userEvent.click(toggleButton);

    // Check that the dark mode is toggled
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

  it("responds to test events", () => {
    // Use act to wrap the render and event dispatch
    act(() => {
      render(<CIAClassificationApp />);
    });

    // Use act to wrap the event dispatch that triggers state updates
    act(() => {
      // Dispatch a test event to update security levels
      document.dispatchEvent(
        new CustomEvent("test:set-values", {
          detail: {
            availability: "High",
            integrity: "High",
            confidentiality: "High",
          },
        })
      );
    });

    // Now we can verify the event listener was properly set up
    expect(document.addEventListener).toHaveBeenCalledWith(
      "test:set-values",
      expect.any(Function)
    );
  });
});
