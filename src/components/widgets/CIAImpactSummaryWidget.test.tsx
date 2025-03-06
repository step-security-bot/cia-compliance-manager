import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CIAImpactSummaryWidget from "./CIAImpactSummaryWidget";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

describe("CIAImpactSummaryWidget", () => {
  it("renders all three CIA categories with correct text", () => {
    render(
      <CIAImpactSummaryWidget
        availability="High"
        integrity="Low"
        confidentiality="Moderate"
      />
    );

    // Check that all titles are rendered
    expect(screen.getByText("Availability:")).toBeInTheDocument();
    expect(screen.getByText("Integrity:")).toBeInTheDocument();
    expect(screen.getByText("Confidentiality:")).toBeInTheDocument();

    // Check that all values are rendered with correct text
    expect(screen.getByText("High Availability")).toBeInTheDocument();
    expect(screen.getByText("Low Integrity")).toBeInTheDocument();
    expect(screen.getByText("Moderate Confidentiality")).toBeInTheDocument();
  });

  it("applies appropriate styling to different security levels", () => {
    render(
      <CIAImpactSummaryWidget
        availability="Very High"
        integrity="None"
        confidentiality="Moderate"
      />
    );

    const availabilityValue = screen.getByTestId(
      "cia-impact-summary-availability-level"
    );
    // Update to match "success" variant which is used for "Very High" level
    expect(availabilityValue).toHaveClass("text-success-600");

    const integrityValue = screen.getByTestId(
      "cia-impact-summary-integrity-level"
    );
    // "None" maps to "default" variant which uses gray colors
    expect(integrityValue).toHaveClass("text-gray-700");

    const confidentialityValue = screen.getByTestId(
      "cia-impact-summary-confidentiality-level"
    );
    // "Moderate" maps to "info" variant
    expect(confidentialityValue).toHaveClass("text-info-600");
  });

  it("uses default testId when not provided", () => {
    render(
      <CIAImpactSummaryWidget
        availability="High"
        integrity="High"
        confidentiality="High"
      />
    );

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY)
    ).toBeInTheDocument();
  });

  it("handles empty or unexpected values gracefully", () => {
    // @ts-ignore intentionally testing with invalid values
    render(<CIAImpactSummaryWidget />);

    expect(screen.getByText("None Availability")).toBeInTheDocument();
    expect(screen.getByText("None Integrity")).toBeInTheDocument();
    expect(screen.getByText("None Confidentiality")).toBeInTheDocument();
  });
});
