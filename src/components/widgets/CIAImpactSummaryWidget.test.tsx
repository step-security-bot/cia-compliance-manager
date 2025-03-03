import React from "react";
import { render, screen } from "@testing-library/react";
import CIAImpactSummaryWidget from "./CIAImpactSummaryWidget";
import { UI_TEXT } from "../../constants/appConstants";

describe("CIAImpactSummaryWidget", () => {
  it("renders all three CIA categories with correct text", () => {
    render(
      <CIAImpactSummaryWidget
        availability="Moderate"
        integrity="High"
        confidentiality="Low"
      />
    );

    // Check for the text in the format expected by the tests
    expect(screen.getByText("Moderate Availability")).toBeInTheDocument();
    expect(screen.getByText("High Integrity")).toBeInTheDocument();
    expect(screen.getByText("Low Confidentiality")).toBeInTheDocument();

    // Verify test IDs are properly set
    expect(screen.getByTestId("cia-impact-summary")).toBeInTheDocument();
    expect(
      screen.getByTestId("cia-impact-summary-availability-level")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("cia-impact-summary-integrity-level")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("cia-impact-summary-confidentiality-level")
    ).toBeInTheDocument();
  });

  it("applies appropriate styling to different security levels", () => {
    render(
      <CIAImpactSummaryWidget
        availability="Very High"
        integrity="None"
        confidentiality="Moderate"
        testId="custom-cia-summary"
      />
    );

    // Check that the values are displayed
    expect(screen.getByText("Very High Availability")).toBeInTheDocument();
    expect(screen.getByText("None Integrity")).toBeInTheDocument();
    expect(screen.getByText("Moderate Confidentiality")).toBeInTheDocument();

    // Check that custom testId is used
    expect(screen.getByTestId("custom-cia-summary")).toBeInTheDocument();

    // Verify correct variant styling is applied to each level
    const availabilityValue = screen.getByTestId(
      "custom-cia-summary-availability-level-value"
    );
    const integrityValue = screen.getByTestId(
      "custom-cia-summary-integrity-level-value"
    );
    const confidentialityValue = screen.getByTestId(
      "custom-cia-summary-confidentiality-level-value"
    );

    // Check for appropriate styling classes being applied
    expect(availabilityValue.className).toContain("bg-blue"); // primary variant
    expect(integrityValue.className).toContain("bg-red"); // danger variant
    expect(confidentialityValue.className).toContain("bg-purple"); // info variant
  });

  // Add a test for the default test ID behavior:
  it("uses default testId when not provided", () => {
    render(
      <CIAImpactSummaryWidget
        availability="Moderate"
        integrity="High"
        confidentiality="Low"
      />
    );

    // Check for default testId
    expect(screen.getByTestId("cia-impact-summary")).toBeInTheDocument();
  });

  // Test for edge cases with empty or unexpected values
  it("handles empty or unexpected values gracefully", () => {
    render(
      <CIAImpactSummaryWidget
        availability=""
        integrity="Invalid Value"
        confidentiality={undefined as any} // Testing with undefined
      />
    );

    // Should still render without crashing
    expect(screen.getByTestId("cia-impact-summary")).toBeInTheDocument();
    expect(
      screen.getByTestId("cia-impact-summary-availability-level")
    ).toHaveTextContent(/^\s*Availability$/);
    expect(
      screen.getByTestId("cia-impact-summary-integrity-level")
    ).toHaveTextContent("Invalid Value Integrity");
  });
});
