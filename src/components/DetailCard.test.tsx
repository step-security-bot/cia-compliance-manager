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

    expect(screen.getByText(/Test Category - None/)).toBeInTheDocument();

    // The content should be hidden initially - need to check for hidden class
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
    fireEvent.click(screen.getByRole("button"));

    // After expanding - should not have hidden class
    expect(contentContainer).not.toHaveClass("hidden");
    expect(screen.getByText(/Test description/)).toBeVisible();
    expect(screen.getByText("💥 Impact:")).toBeVisible();
    expect(screen.getByText("Test impact")).toBeVisible();
    expect(screen.getByText("🛡️ Technical Controls:")).toBeVisible();
    expect(screen.getByText("Test technical")).toBeVisible();

    // Click to collapse
    fireEvent.click(screen.getByRole("button"));

    // After collapsing - should have hidden class again
    expect(contentContainer).toHaveClass("hidden");
  });

  it("shows security lock icon for 'Very High' level", () => {
    render(
      <DetailCard category="Test" level="Very High" details={mockDetails} />
    );

    // Use a regex to find text containing the lock emoji
    // This is more flexible than looking for the exact emoji string
    expect(screen.getByText(/🔒/)).toBeInTheDocument();

    // Alternative approach: check the heading text contains the icon
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toContain("🔒");
  });

  it("displays recommendations when available", () => {
    render(<DetailCard category="Test" level="None" details={mockDetails} />);

    // Click to expand
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("💡 Recommendations:")).toBeVisible();
    expect(screen.getByText("Recommendation 1")).toBeVisible();
    expect(screen.getByText("Recommendation 2")).toBeVisible();
  });
});
