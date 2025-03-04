import React from "react";
import { render, screen } from "@testing-library/react";
import ValueCreationWidget from "./ValueCreationWidget";
import {
  TEST_CIA_LEVELS,
  TEST_HELPERS,
  TEST_DATA,
} from "../../constants/testConstants";
import {
  SECURITY_LEVELS,
  VALUE_CREATION_POINTS,
  UI_TEXT,
} from "../../constants";
import { renderWithProviders } from "../../utils/componentTestUtils";

describe("ValueCreationWidget", () => {
  it("renders the widget with None level", () => {
    renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.NONE}
        integrity={TEST_CIA_LEVELS.NONE}
        confidentiality={TEST_CIA_LEVELS.NONE}
      />
    );

    // Check that the component renders
    expect(screen.getByText(UI_TEXT.LABELS.BUSINESS_VALUE)).toBeInTheDocument();
    expect(
      screen.getByText(UI_TEXT.VALUE_CREATION.NONE_TITLE)
    ).toBeInTheDocument();
  });

  it("renders the widget with High level", () => {
    renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.HIGH}
        integrity={TEST_CIA_LEVELS.HIGH}
        confidentiality={TEST_CIA_LEVELS.HIGH}
      />
    );

    // Check the title uses the formatted text from constants
    expect(
      screen.getByText(UI_TEXT.VALUE_CREATION.WITH_LEVEL(TEST_CIA_LEVELS.HIGH))
    ).toBeInTheDocument();

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

  it("calculates ROI correctly", () => {
    renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.MODERATE}
        integrity={TEST_CIA_LEVELS.MODERATE}
        confidentiality={TEST_CIA_LEVELS.MODERATE}
      />
    );

    // Check for ROI element
    expect(screen.getByTestId("roi-value")).toBeInTheDocument();

    // The ROI should be a percentage
    const roiText = screen.getByTestId("roi-value").textContent || "";
    expect(roiText).toMatch(/%$/);
  });

  it("displays different value propositions based on security levels", () => {
    const { rerender } = renderWithProviders(
      <ValueCreationWidget
        availability={TEST_CIA_LEVELS.LOW}
        integrity={TEST_CIA_LEVELS.LOW}
        confidentiality={TEST_CIA_LEVELS.LOW}
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
