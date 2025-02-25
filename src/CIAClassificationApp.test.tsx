import React from "react";
import { render, screen, fireEvent, within } from "./utils/test-utils";
import "@testing-library/jest-dom";
import CIAClassificationApp from "./CIAClassificationApp";

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

      // Find the content div and check if it has the 'hidden' class
      const contentDiv = screen
        .getAllByText(/📝 Description:/)[0]
        .closest("div");
      // Handle potential null with null assertion operator since we know it exists
      expect(contentDiv!).toHaveClass("hidden");

      // Click to expand
      fireEvent.click(firstDetailCard);

      // Now it should not have the hidden class
      expect(contentDiv!).not.toHaveClass("hidden");

      // Click to collapse
      fireEvent.click(firstDetailCard);

      // Hidden again
      expect(contentDiv!).toHaveClass("hidden");
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
      const recommendationElements = screen.getAllByText(/💡 Recommendations:/);
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
});
