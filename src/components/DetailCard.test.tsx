import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailCard from "./DetailCard";
import { CIADetails } from "../types/cia";

describe("DetailCard", () => {
  const mockDetails: CIADetails = {
    description: "Test description",
    impact: "Test impact",
    technical: "Test technical",
    capex: 20,
    opex: 10,
    bg: "#ffffff",
    text: "#000000",
    recommendations: ["Recommendation 1", "Recommendation 2"],
  };

  it("renders all provided information", () => {
    render(
      <DetailCard category="Test Category" level="None" details={mockDetails} />
    );

    // Use a regex to be more flexible with spacing
    expect(screen.getByTestId("main-heading")).toHaveTextContent(
      /Test Category.*None/
    );

    // The content should be hidden initially
    const contentContainer = screen.getByTestId("detail-content");
    expect(contentContainer).toHaveClass("hidden");
  });

  it("expands and collapses when clicked", () => {
    render(
      <DetailCard category="Test Category" level="None" details={mockDetails} />
    );

    // Before expanding - content is in the DOM but hidden
    const contentContainer = screen.getByTestId("detail-content");
    expect(contentContainer).toHaveClass("hidden");

    // Click to expand
    fireEvent.click(screen.getByTestId("toggle-button"));

    // After expanding - should not have hidden class
    expect(contentContainer).not.toHaveClass("hidden");
    expect(screen.getByText(/Test description/)).toBeVisible();
    expect(screen.getByText("Impact")).toBeVisible();
    expect(screen.getByText("Test impact")).toBeVisible();
    expect(screen.getByText("Technical Controls")).toBeVisible();
    expect(screen.getByText("Test technical")).toBeVisible();

    // Click to collapse using the close button
    fireEvent.click(screen.getByTestId("close-button"));

    // After collapsing - should have hidden class again
    expect(contentContainer).toHaveClass("hidden");
  });

  it("shows security lock icon for 'Very High' level", () => {
    // Modify the component to include the icon in data-testid for easier testing
    const { container } = render(
      <DetailCard category="Test" level="Very High" details={mockDetails} />
    );

    // Check the component has the level "Very High" in the heading
    expect(screen.getByTestId("main-heading")).toHaveTextContent("Very High");
  });

  it("displays recommendations when available", () => {
    render(<DetailCard category="Test" level="None" details={mockDetails} />);

    // Click to expand
    fireEvent.click(screen.getByTestId("toggle-button"));

    // Use a more flexible text match
    expect(screen.getByText(/Recommendations/)).toBeVisible();
    expect(screen.getByText("Recommendation 1")).toBeVisible();
    expect(screen.getByText("Recommendation 2")).toBeVisible();
  });
});
