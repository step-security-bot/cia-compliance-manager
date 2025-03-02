import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CIAClassificationApp from "./CIAClassificationApp";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the Chart.js module
vi.mock("chart.js/auto", () => ({
  default: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

// Fix: Use proper type declaration to match the HTMLCanvasElement.getContext overload signatures
// We need to create a properly typed function overload
const originalGetContext = HTMLCanvasElement.prototype.getContext;

// Replace with a properly typed mock implementation that matches the actual method signature
HTMLCanvasElement.prototype.getContext = function (
  contextId: string,
  options?: any
): any {
  // Create a mock 2d context with the minimum properties needed
  if (contextId === "2d") {
    return {
      canvas: { width: 100, height: 100 },
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 10 }),
      // Add more required CanvasRenderingContext2D properties
      globalAlpha: 1,
      globalCompositeOperation: "source-over",
      drawImage: vi.fn(),
      clip: vi.fn(),
      createLinearGradient: vi.fn(),
      createPattern: vi.fn(),
      createRadialGradient: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      // Add minimum required for type compatibility
    };
  }

  if (contextId === "bitmaprenderer") {
    return {
      transferFromImageBitmap: vi.fn(),
    };
  }

  // Return null for other context types like 'webgl'
  return null;
};

// Mock the useCIAOptions hook
vi.mock("./hooks/useCIAOptions", () => {
  const mockOptions = {
    None: {
      description: "None level description",
      technical: "Technical details for None",
      businessImpact: "Business impact for None",
      impact: "None",
      capex: 0,
      opex: 0,
      bg: "#ccc",
      text: "#000",
    },
    Low: {
      description: "Low level description",
      technical: "Technical details for Low",
      businessImpact: "Business impact for Low",
      impact: "Low",
      capex: 10,
      opex: 5,
      bg: "#ffe",
      text: "#000",
    },
    High: {
      description: "High level description",
      technical: "redundant systems with automated recovery",
      businessImpact: "Business impact for High",
      impact: "High",
      capex: 30,
      opex: 20,
      bg: "#efe",
      text: "#000",
    },
    Moderate: {
      description: "Moderate level description",
      technical: "Hash verification and automated validation",
      businessImpact: "Business impact for Moderate",
      impact: "Medium",
      capex: 20,
      opex: 15,
      bg: "#eef",
      text: "#000",
    },
  };

  return {
    useCIAOptions: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
    }),
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };
});

// Add mock for the RadarChart component
vi.mock("./components/RadarChart", () => ({
  default: () => (
    <div data-testid="radar-chart">Mocked Radar Chart Component</div>
  ),
}));

describe("CIAClassificationApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ... existing tests ...

  describe("RadarChart", () => {
    it("renders radar chart component", () => {
      render(<CIAClassificationApp />);
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });

    it("renders radar chart after selection changes", () => {
      render(<CIAClassificationApp />);
      const availabilitySelect = screen.getByTestId("availability-select");
      fireEvent.change(availabilitySelect, { target: { value: "High" } });
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });

    it("updates after selection changes", () => {
      render(<CIAClassificationApp />);
      const availabilitySelect = screen.getByTestId("availability-select");
      const integritySelect = screen.getByTestId("integrity-select");
      const confidentialitySelect = screen.getByTestId(
        "confidentiality-select"
      );

      // Change all selections
      fireEvent.change(availabilitySelect, { target: { value: "High" } });
      fireEvent.change(integritySelect, { target: { value: "Moderate" } });
      fireEvent.change(confidentialitySelect, { target: { value: "Low" } });

      // The chart should still be in the DOM
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });
  });

  // ... other tests ...

  describe("Dashboard Widgets", () => {
    it("displays technical implementation details after selection", () => {
      // Start each test with a clean render
      cleanup();
      render(<CIAClassificationApp />);

      // Change availability to High
      fireEvent.change(screen.getByTestId("availability-select"), {
        target: { value: "High" },
      });

      // Find the technical implementation widget
      const techWidget = screen.getByTestId("widget-technical-implementation");

      // Look for the heading that contains High
      expect(
        within(techWidget).getByText(/Availability:\s*High/i)
      ).toBeInTheDocument();

      // Look for visible text content in the widget by function matcher pattern
      expect(
        within(techWidget).getByText(
          (content) =>
            content.includes("Technical details for High") ||
            content.includes("redundant systems") ||
            content.includes("automated recovery")
        )
      ).toBeInTheDocument();
    });

    it("shows appropriate security summary for selected levels", async () => {
      // Start with a clean render
      cleanup();

      // Create user for interactions
      const user = userEvent.setup();

      // Render the app
      render(<CIAClassificationApp />);

      // Get the availability, integrity, and confidentiality selects
      const availabilitySelect = screen.getByTestId("availability-select");
      const integritySelect = screen.getByTestId("integrity-select");
      const confidentialitySelect = screen.getByTestId(
        "confidentiality-select"
      );

      // Change all to Moderate using user events for more realistic interactions
      await user.selectOptions(availabilitySelect, "Moderate");
      await user.selectOptions(integritySelect, "Moderate");
      await user.selectOptions(confidentialitySelect, "Moderate");

      // Check for "Moderate" text in the security widget or security summary section
      // Using a more flexible approach by looking for specific security level text
      expect(screen.getByTestId("security-summary-title")).toHaveTextContent(
        /moderate security/i
      );

      // Verify the technical implementation details are updated too
      const techWidget = screen.getByTestId("widget-technical-implementation");

      // FIX: Use getAllByText instead of getByText since there are multiple elements
      // that match this condition (one for each CIA component)
      const technicalTexts = within(techWidget).getAllByText(
        (content) =>
          content.includes("Hash verification") ||
          content.includes("automated validation") ||
          content.includes("Technical details for Moderate")
      );

      // Verify at least one technical detail element is found
      expect(technicalTexts.length).toBeGreaterThan(0);
    });

    // ... other tests ...
  });
});
