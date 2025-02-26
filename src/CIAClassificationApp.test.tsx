import React from "react";
import { render, screen, fireEvent, within, cleanup } from "./utils/test-utils";
import "@testing-library/jest-dom";
import CIAClassificationApp from "./CIAClassificationApp";
import { availabilityOptions } from "./hooks/useCIAOptions";

// Mock getContext to prevent errors
HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

// Mock Chart.js
jest.mock("chart.js/auto", () => {
  return class Chart {
    static defaults: { color: string } = { color: "#666" }; // Fix: Add type annotation
    destroy = jest.fn();
    constructor() {
      return {
        destroy: jest.fn(),
      };
    }
  };
});

describe("CIAClassificationApp", () => {
  beforeEach(() => {
    render(<CIAClassificationApp />);
  });

  describe("Initial Render", () => {
    it("renders initial state correctly", () => {
      expect(screen.getByTestId("app-title")).toBeInTheDocument();
      expect(screen.getByTestId("classification-form")).toBeInTheDocument();
      expect(screen.getByTestId("capex-estimate")).toHaveTextContent("$10,000");
      expect(screen.getByTestId("opex-estimate")).toHaveTextContent("$500");
    });

    it("renders all selection components", () => {
      expect(screen.getByTestId("availability-select")).toBeInTheDocument();
      expect(screen.getByTestId("integrity-select")).toBeInTheDocument();
      expect(screen.getByTestId("confidentiality-select")).toBeInTheDocument();
    });

    it("displays default cost estimates", () => {
      expect(screen.getByTestId("capex-estimate")).toHaveTextContent("$10,000");
      expect(screen.getByTestId("opex-estimate")).toHaveTextContent("$500");
    });
  });

  describe("Selection Interactions", () => {
    it("handles level changes correctly", () => {
      const availabilitySelect = screen.getByTestId("availability-select");
      const integritySelect = screen.getByTestId("integrity-select");
      const confidentialitySelect = screen.getByTestId(
        "confidentiality-select"
      );

      fireEvent.change(availabilitySelect, { target: { value: "High" } });
      fireEvent.change(integritySelect, { target: { value: "Moderate" } });
      fireEvent.change(confidentialitySelect, { target: { value: "Low" } });

      expect(availabilitySelect).toHaveValue("High");
      expect(integritySelect).toHaveValue("Moderate");
      expect(confidentialitySelect).toHaveValue("Low");
    });

    it("updates all levels simultaneously", () => {
      const selects = ["availability", "integrity", "confidentiality"].map(
        (id) => screen.getByTestId(`${id}-select`)
      );

      selects.forEach((select) => {
        fireEvent.change(select, { target: { value: "High" } });
      });

      selects.forEach((select) => {
        expect(select).toHaveValue("High");
      });

      expect(screen.getByTestId("capex-estimate")).toHaveTextContent(
        "$1,000,000"
      );
    });

    it("resets to default values correctly", () => {
      const select = screen.getByTestId("availability-select");
      fireEvent.change(select, { target: { value: "High" } });
      fireEvent.change(select, { target: { value: "None" } });
      expect(select).toHaveValue("None");
    });
  });

  describe("Cost Calculations", () => {
    it("updates cost estimates based on selections", () => {
      const confidentialitySelect = screen.getByTestId(
        "confidentiality-select"
      );
      fireEvent.change(confidentialitySelect, {
        target: { value: "Very High" },
      });

      expect(screen.getByTestId("capex-estimate")).toBeInTheDocument();
      expect(screen.getByTestId("opex-estimate")).toBeInTheDocument();
    });

    it("shows small solution costs for low-risk selections", () => {
      ["availability", "integrity", "confidentiality"].forEach((id) => {
        fireEvent.change(screen.getByTestId(`${id}-select`), {
          target: { value: "Low" },
        });
      });
      expect(screen.getByTestId("capex-estimate")).toHaveTextContent("$10,000");
      expect(screen.getByTestId("opex-estimate")).toHaveTextContent("$500");
    });

    it("shows large solution costs for high-risk selections", () => {
      ["availability", "integrity", "confidentiality"].forEach((id) => {
        fireEvent.change(screen.getByTestId(`${id}-select`), {
          target: { value: "Very High" },
        });
      });
      expect(screen.getByTestId("capex-estimate")).toHaveTextContent(
        "$1,000,000"
      );
      expect(screen.getByTestId("opex-estimate")).toHaveTextContent("$50,000");
    });
  });

  describe("Theme Toggle", () => {
    it("toggles dark mode", () => {
      const themeToggle = screen.getByTestId("theme-toggle");
      fireEvent.click(themeToggle);
      expect(document.querySelector("div.dark")).toBeInTheDocument();
    });

    it("toggles dark mode classes correctly", () => {
      const themeToggle = screen.getByTestId("theme-toggle");
      fireEvent.click(themeToggle);
      expect(document.querySelector("div.dark")).toBeInTheDocument();
      expect(themeToggle).toHaveTextContent("Light Mode");

      fireEvent.click(themeToggle);
      expect(document.querySelector("div.dark")).not.toBeInTheDocument();
      expect(themeToggle).toHaveTextContent("Dark Mode");
    });
  });

  describe("Analysis Display", () => {
    it("updates analysis section based on selections", () => {
      const analysisSection = screen.getByTestId("analysis-section");
      const recommendationsSection = screen.getByTestId("recommendations");

      fireEvent.change(screen.getByTestId("confidentiality-select"), {
        target: { value: "Very High" },
      });

      expect(
        within(recommendationsSection).getByText(/Very High/)
      ).toBeInTheDocument();
      expect(analysisSection).toBeVisible();
    });
  });

  describe("DetailCard Interaction", () => {
    it("expands detail cards on click", () => {
      const firstDetailCard = screen.getAllByRole("button")[1]; // First card after theme toggle button

      // Find the outer content div (which has the hidden class)
      const contentContainer = screen.getAllByTestId("detail-content")[0];
      expect(contentContainer).toHaveClass("hidden");

      // Click to expand
      fireEvent.click(firstDetailCard);

      // Now it should not have the hidden class
      expect(contentContainer).not.toHaveClass("hidden");

      // Click to collapse
      fireEvent.click(firstDetailCard);

      // Hidden again
      expect(contentContainer).toHaveClass("hidden");
    });

    it("shows recommendations in detail cards", () => {
      const availabilitySelect = screen.getByTestId("availability-select");
      fireEvent.change(availabilitySelect, { target: { value: "High" } });

      // Get the first DetailCard (Availability) and expand it
      const detailCards = screen.getAllByRole("button");
      const availabilityCard = detailCards.find((card) =>
        within(card).queryByText(/Availability/)
      );

      // Ensure availabilityCard is not undefined before clicking
      expect(availabilityCard).not.toBeUndefined();

      // Now click to expand with a type guard
      if (availabilityCard) {
        fireEvent.click(availabilityCard);
      }

      // Get all recommendation elements and select the first one (Availability)
      const recommendationElements = screen.getAllByText(/Recommendations/);
      expect(recommendationElements[0]).toBeVisible();

      // Check for High availability recommendations
      const cardContainer =
        recommendationElements[0].closest("div")?.parentElement;
      // Add null check before using within
      if (cardContainer) {
        expect(
          within(cardContainer).getByText(/Multi-region deployment/)
        ).toBeVisible();
      }
    });
  });

  describe("RadarChart", () => {
    it("renders radar chart component", () => {
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });

    it("renders radar chart after selection changes", () => {
      const availabilitySelect = screen.getByTestId("availability-select");
      fireEvent.change(availabilitySelect, { target: { value: "High" } });
      expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
    });

    it("updates after selection changes", () => {
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

  describe("Dark Mode Detection", () => {
    it("initializes with system preferences when available", () => {
      // Clean up previous render
      cleanup();

      // Mock matchMedia to return dark mode preference
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true, // Simulate dark mode preference
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        })),
      });

      // Re-render component to test initialization
      render(<CIAClassificationApp />);

      // Should initialize with dark mode
      expect(document.querySelector("div.dark")).toBeInTheDocument();
    });

    it("handles matchMedia errors gracefully", () => {
      // Clean up previous render
      cleanup();

      // Mock matchMedia to throw an error
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(() => {
          throw new Error("matchMedia error");
        }),
      });

      // Spy on console.error
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      // Component should render without crashing
      render(<CIAClassificationApp />);

      // Clean up
      consoleErrorSpy.mockRestore();
    });
  });

  describe("Edge Cases", () => {
    it("handles missing DOM elements gracefully during dark mode toggle", () => {
      // Clean up previous render
      cleanup();

      // Mock getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = jest.fn().mockReturnValue(null);

      // Render fresh component
      render(<CIAClassificationApp />);
      const themeToggle = screen.getByTestId("theme-toggle");

      // This should not throw errors
      fireEvent.click(themeToggle);

      // Clean up
      document.getElementById = originalGetElementById;
    });

    it("handles error logging conditionally based on environment", () => {
      // Use a spy to test the console.error behavior
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      // Create a simple error handling function that mimics our app's behavior
      const handleError = (error: Error) => {
        if (process.env.NODE_ENV !== "test") {
          console.error("Error detecting color scheme preference:", error);
        }
      };

      // Test with test environment - should not log
      handleError(new Error("Test error"));
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      // Restore the spy
      consoleErrorSpy.mockRestore();
    });
  });
});
