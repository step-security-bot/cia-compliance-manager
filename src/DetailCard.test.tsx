import React from "react";
import { render, screen } from "./utils/test-utils";
import "@testing-library/jest-dom";
import DetailCard from "./components/DetailCard";
import { CIADetails } from "./hooks/useCIAOptions";

describe("DetailCard", () => {
  const mockDetails: CIADetails = {
    description: "Test description",
    impact: "Test impact",
    technical: "Test technical",
    capex: 20,
    opex: 10,
    bg: "#ffffff",
    text: "#000000",
  };

  it("renders all provided information", () => {
    render(
      <DetailCard category="Test Category" level="None" details={mockDetails} />
    );

    expect(screen.getByText(/Test description/)).toBeInTheDocument();
    expect(screen.getByText(/Impact: Test impact/)).toBeInTheDocument();
    expect(
      screen.getByText(/Technical Controls: Test technical/)
    ).toBeInTheDocument();
  });

  it("applies correct styling", () => {
    render(
      <DetailCard category="Test Category" level="None" details={mockDetails} />
    );

    const container = screen.getByRole("region");
    expect(container).toHaveStyle(`background-color: ${mockDetails.bg}`);
    expect(container.querySelector("h3")).toHaveStyle(
      `color: ${mockDetails.text}`
    );
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<DetailCard category="Test" level="None" details={mockDetails} />);
      const card = screen.getByRole("region");
      expect(card).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Content Display", () => {
    it("formats category and level correctly", () => {
      render(<DetailCard category="Test" level="High" details={mockDetails} />);
      expect(screen.getByText("Test - High")).toBeInTheDocument();
    });

    it("displays all detail sections", () => {
      render(<DetailCard category="Test" level="None" details={mockDetails} />);
      expect(screen.getByText(/Description:/)).toBeInTheDocument();
      expect(screen.getByText(/Impact:/)).toBeInTheDocument();
      expect(screen.getByText(/Technical Controls:/)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies dark mode classes correctly", () => {
      render(<DetailCard category="Test" level="None" details={mockDetails} />);
      const card = screen.getByRole("region");
      expect(card).toHaveClass("dark:border-gray-700");
    });

    it("maintains consistent spacing", () => {
      render(<DetailCard category="Test" level="None" details={mockDetails} />);
      const card = screen.getByRole("region");
      expect(card).toHaveClass("p-4");
    });
  });
});
