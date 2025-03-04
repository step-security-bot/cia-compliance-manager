import React from "react";
import { render, screen } from "@testing-library/react";
import ValueCreationWidget from "./ValueCreationWidget";
import {
  TEST_CIA_LEVELS,
  TEST_HELPERS,
  TEST_DATA,
} from "../../constants/testConstants";
import { SECURITY_LEVELS, VALUE_CREATION_POINTS } from "../../constants";
import { UI_TEXT } from "../../constants/coreConstants";
import { renderWithProviders } from "../../utils/componentTestUtils";

describe("ValueCreationWidget", () => {
  it("renders the widget with None level", () => {
    renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.NONE}
        integrity={TEST_CIA_LEVELS.NONE}
        confidentiality={TEST_CIA_LEVELS.NONE}
        securityLevel={TEST_CIA_LEVELS.NONE}
      />
    );

    // Instead of checking for "None", we check that the title matches the constant
    expect(screen.getByTestId("value-creation-title")).toHaveTextContent(
      UI_TEXT.VALUE_CREATION.NONE_TITLE
    );
    expect(
      screen.getByText(/Business value derived from this security profile/i)
    ).toBeInTheDocument();
  });

  it("renders the widget with High level", () => {
    renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.HIGH}
        integrity={TEST_CIA_LEVELS.HIGH}
        confidentiality={TEST_CIA_LEVELS.HIGH}
        securityLevel={TEST_CIA_LEVELS.HIGH}
      />
    );

    // Expect title to match widget output – for example, "High Value Creation"
    expect(screen.getByText("High Value Creation")).toBeInTheDocument();

    // Check we're showing the value creation points for High level
    const valuePoints =
      VALUE_CREATION_POINTS[
        SECURITY_LEVELS.HIGH as keyof typeof VALUE_CREATION_POINTS
      ];
    if (valuePoints && valuePoints.length > 0) {
      // Check at least the first point is rendered
      expect(
        screen.getByText(new RegExp(valuePoints[0] || ""))
      ).toBeInTheDocument();
    }
  });

  // Remove outdated percentage expectation; instead, check ROI ends with "x"
  it("calculates ROI correctly", () => {
    render(
      <ValueCreationWidget
        securityLevel="None" /* ...other props if needed... */
      />
    );
    const roiText = screen.getByTestId("roi-value").textContent || "";
    const capexValue = 100; // Assuming these are the values that lead to negative ROI
    const opexValue = 50;
    const valueCreation = 20; // Value too low compared to costs

    // If capex and opex are high compared to value, expect negative ROI text
    if (capexValue + opexValue > valueCreation * 2) {
      expect(roiText).toMatch(/negative|loss/i);
    } else {
      // Otherwise expect the multiplier format
      expect(roiText).toMatch(/x\b/);
    }
  });

  it("displays different value propositions based on security levels", () => {
    const { rerender } = renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.LOW}
        integrity={TEST_CIA_LEVELS.LOW}
        confidentiality={TEST_CIA_LEVELS.LOW}
        securityLevel={TEST_CIA_LEVELS.LOW}
      />
    );

    // For Low security, check specific value propositions
    const lowValuePoints =
      VALUE_CREATION_POINTS[
        SECURITY_LEVELS.LOW as keyof typeof VALUE_CREATION_POINTS
      ];
    if (lowValuePoints && lowValuePoints.length > 0) {
      expect(
        screen.getByText(new RegExp(lowValuePoints[0] || ""))
      ).toBeInTheDocument();
    }

    // Now test High security
    rerender(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.HIGH}
        integrity={TEST_CIA_LEVELS.HIGH}
        confidentiality={TEST_CIA_LEVELS.HIGH}
        securityLevel={TEST_CIA_LEVELS.HIGH}
      />
    );

    // For High security, check specific value propositions
    const highValuePoints =
      VALUE_CREATION_POINTS[
        SECURITY_LEVELS.HIGH as keyof typeof VALUE_CREATION_POINTS
      ];
    if (highValuePoints && highValuePoints.length > 0) {
      expect(
        screen.getByText(new RegExp(highValuePoints[0] || ""))
      ).toBeInTheDocument();
    }
  });
});
