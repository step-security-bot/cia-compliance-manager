import React from "react";
import { render, screen } from "@testing-library/react";
import ImpactAnalysisWidget from "./ImpactAnalysisWidget";
import {
  IMPACT_DESCRIPTIONS,
  getPartialTextMatcher,
  UI_TEXT,
  TEST_MATCHERS,
} from "../../constants/appConstants";
import { availabilityOptions } from "../../hooks/useCIAOptions"; // Add this import

describe("ImpactAnalysisWidget", () => {
  // Helper function to find description paragraph
  const findDescriptionParagraph = (text: string) => {
    return screen.getByText(
      (content, element) =>
        // Add null check to fix TypeScript errors
        element !== null &&
        element.tagName.toLowerCase() === "p" &&
        content.includes(getPartialTextMatcher(text)) &&
        element.className.includes("mb-2")
    );
  };

  it("renders Availability impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Availability" level="None" />
    );

    // Test each level using our helper function with partial text matching
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.NONE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Low" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.LOW)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Moderate" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.MODERATE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="High" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.HIGH)
    ).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Availability" level="Very High" />
    );
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.VERY_HIGH)
    ).toBeInTheDocument();
  });

  it("renders Integrity impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Integrity" level="None" />
    );

    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.INTEGRITY.NONE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Low" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.INTEGRITY.LOW)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Moderate" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.INTEGRITY.MODERATE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="High" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.INTEGRITY.HIGH)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Very High" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.INTEGRITY.VERY_HIGH)
    ).toBeInTheDocument();
  });

  it("renders Confidentiality impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Confidentiality" level="None" />
    );

    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.CONFIDENTIALITY.NONE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="Low" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.CONFIDENTIALITY.LOW)
    ).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Moderate" />
    );
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.CONFIDENTIALITY.MODERATE)
    ).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="High" />);
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.CONFIDENTIALITY.HIGH)
    ).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Very High" />
    );
    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.CONFIDENTIALITY.VERY_HIGH)
    ).toBeInTheDocument();
  });

  it("displays business impact for each level and category", () => {
    // High availability
    render(
      <ImpactAnalysisWidget
        category="Availability" // Capitalize to match expected type
        level="High"
      />
    );

    const businessImpactParagraph = screen.getByTestId(
      "business-impact-availability"
    );

    expect(businessImpactParagraph).toBeInTheDocument();
    // Update this test to match the new text which no longer contains "downtime"
    expect(businessImpactParagraph).toHaveTextContent(
      "Business continuity preserved"
    );
  });

  it("falls back to None level when invalid level is provided", () => {
    render(<ImpactAnalysisWidget category="Availability" level="Invalid" />);

    expect(
      findDescriptionParagraph(IMPACT_DESCRIPTIONS.AVAILABILITY.NONE)
    ).toBeInTheDocument();
  });
});
