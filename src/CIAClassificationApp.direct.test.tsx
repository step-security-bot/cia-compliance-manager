import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CIAClassificationApp from "./CIAClassificationApp";
import { vi, expect } from "vitest";

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

// Mock window.matchMedia for dark mode tests
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

describe("CIAClassificationApp Component Direct Tests", () => {
  // Update the test to handle multiple elements with the same text
  it("renders basic structure correctly", () => {
    render(<CIAClassificationApp />);
    expect(screen.getByTestId("app-container")).toBeInTheDocument();
    expect(screen.getByTestId("app-title")).toHaveTextContent(
      "CIA Security Profile" // Updated from "CIA Compliance Manager Dashboard"
    );

    // Check for specific component rather than text
    expect(
      screen.getByTestId("widget-security-level-selection")
    ).toBeInTheDocument();
  });

  it("shows security level section", () => {
    render(<CIAClassificationApp />);
    expect(
      screen.getByTestId("widget-security-level-selection")
    ).toBeInTheDocument();
  });
});
