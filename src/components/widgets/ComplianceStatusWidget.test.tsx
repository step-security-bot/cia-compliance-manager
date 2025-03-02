import React from "react";
import { render, screen } from "@testing-library/react";
import ComplianceStatusWidget from "./ComplianceStatusWidget";
import {
  COMPLIANCE_STATUS,
  UI_ICONS,
  TEST_MATCHERS,
  COMPLIANCE_FRAMEWORKS,
  SECURITY_LEVELS,
} from "../../constants/appConstants";

describe("ComplianceStatusWidget", () => {
  it("shows non-compliant status for None security levels", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "None",
          integrity: "None",
          confidentiality: "None",
        }}
      />
    );

    expect(
      screen.getByText(COMPLIANCE_STATUS.NON_COMPLIANT)
    ).toBeInTheDocument();
    expect(screen.getByText(UI_ICONS.NON_COMPLIANT)).toBeInTheDocument();

    // Check compliance percentage is 0%
    expect(screen.getByTestId("compliance-percentage")).toHaveTextContent(
      "0% Compliant"
    );

    // Verify progress bar width
    const progressBar = screen.getByTestId("compliance-progress-bar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    // Verify component status indicators
    expect(screen.getByTestId("availability-status")).toHaveClass("bg-red-100");
    expect(screen.getByTestId("integrity-status")).toHaveClass("bg-red-100");
    expect(screen.getByTestId("confidentiality-status")).toHaveClass(
      "bg-red-100"
    );

    // Check next level requirements
    expect(screen.getByTestId("next-level-requirements")).toHaveTextContent(
      /To reach Basic Compliance/
    );
  });

  it("shows basic compliance for Low security levels", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "Low",
          integrity: "Low",
          confidentiality: "Low",
        }}
      />
    );

    expect(
      screen.getByText(COMPLIANCE_STATUS.BASIC_COMPLIANCE)
    ).toBeInTheDocument();
    expect(screen.getByText(UI_ICONS.BASIC_COMPLIANCE)).toBeInTheDocument();

    // Check compliance percentage is 40%
    expect(screen.getByTestId("compliance-percentage")).toHaveTextContent(
      "40% Compliant"
    );

    // Verify progress bar
    const progressBar = screen.getByTestId("compliance-progress-bar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "40");

    // Verify component status indicators (should all be green)
    expect(screen.getByTestId("availability-status")).toHaveClass(
      "bg-green-100"
    );
    expect(screen.getByTestId("integrity-status")).toHaveClass("bg-green-100");
    expect(screen.getByTestId("confidentiality-status")).toHaveClass(
      "bg-green-100"
    );

    // Check next level requirements
    expect(screen.getByTestId("next-level-requirements")).toHaveTextContent(
      /To reach Standard Compliance/
    );
  });

  it("shows standard compliance for Moderate security levels", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "Moderate",
          integrity: "Moderate",
          confidentiality: "Moderate",
        }}
      />
    );

    expect(
      screen.getByText(COMPLIANCE_STATUS.STANDARD_COMPLIANCE)
    ).toBeInTheDocument();

    // Use getAllByText since there are multiple checkmarks
    const checkmarks = screen.getAllByText(UI_ICONS.STANDARD_COMPLIANCE);
    expect(checkmarks.length).toBeGreaterThan(0);

    // Verify the main status checkmark is in the right section
    const statusSection = screen.getByText(
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    ).parentElement;

    // Check if statusSection exists instead of using toBeNull
    expect(statusSection !== null).toBe(true);

    // Only check innerHTML if statusSection exists
    if (statusSection) {
      expect(statusSection.innerHTML).toContain(UI_ICONS.STANDARD_COMPLIANCE);
    }

    // Check compliance percentage is 70%
    expect(screen.getByTestId("compliance-percentage")).toHaveTextContent(
      "70% Compliant"
    );

    // Verify progress bar
    const progressBar = screen.getByTestId("compliance-progress-bar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "70");

    // Check next level requirements
    expect(screen.getByTestId("next-level-requirements")).toHaveTextContent(
      /To reach Full Compliance/
    );
  });

  it("shows full compliance for High security levels", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "High",
          integrity: "High",
          confidentiality: "High",
        }}
      />
    );

    expect(screen.getByTestId("compliance-status-text")).toHaveTextContent(
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );
    expect(screen.getByTestId("compliance-status-icon")).toHaveTextContent(
      UI_ICONS.FULL_COMPLIANCE
    );

    // Check compliance percentage is 100%
    expect(screen.getByTestId("compliance-percentage")).toHaveTextContent(
      "100% Compliant"
    );

    // Verify progress bar
    const progressBar = screen.getByTestId("compliance-progress-bar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");

    // Check next level requirements message for full compliance
    expect(screen.getByTestId("next-level-requirements")).toHaveTextContent(
      /achieved the highest compliance level/
    );
  });

  it("correctly handles mixed security levels", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "High",
          integrity: "Low",
          confidentiality: "Moderate",
        }}
      />
    );

    // Should not meet high compliance requirements
    expect(
      screen.queryByText(COMPLIANCE_STATUS.FULL_COMPLIANCE)
    ).not.toBeInTheDocument();

    // Get all framework elements using the framework regex pattern
    const frameworks = screen.getAllByText(
      TEST_MATCHERS.COMPLIANCE_FRAMEWORKS_REGEX
    );

    // Check each framework for compliance status
    const soc2Element = frameworks.find((el) =>
      el.textContent?.includes("SOC 2")
    );
    const nistElement = frameworks.find((el) =>
      el.textContent?.includes("NIST")
    );

    // Check parent elements for compliance indicators
    expect(soc2Element?.closest("div")?.textContent).toContain(
      UI_ICONS.STANDARD_COMPLIANCE
    );
    expect(nistElement?.closest("div")?.textContent).toContain("✗");
  });

  it("displays Very High security levels as fully compliant", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "Very High",
          integrity: "Very High",
          confidentiality: "Very High",
        }}
      />
    );

    expect(screen.getByTestId("compliance-status-text")).toHaveTextContent(
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );
    expect(screen.getByTestId("compliance-status-icon")).toHaveTextContent(
      UI_ICONS.FULL_COMPLIANCE
    );
    expect(screen.getByTestId("compliance-percentage")).toHaveTextContent(
      "100% Compliant"
    );
  });

  it("shows framework descriptions for all compliance frameworks", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "High",
          integrity: "High",
          confidentiality: "High",
        }}
      />
    );

    // Check that each framework has a description
    Object.keys(COMPLIANCE_FRAMEWORKS).forEach((framework) => {
      const frameworkId = COMPLIANCE_FRAMEWORKS[
        framework as keyof typeof COMPLIANCE_FRAMEWORKS
      ]
        .replace(/\s+/g, "-")
        .toLowerCase();

      const descElement = screen.getByTestId(
        `framework-description-${frameworkId}`
      );
      expect(descElement).toBeInTheDocument();
      expect(descElement.textContent).not.toBe("");
    });
  });

  it("handles security levels with mixed case correctly", () => {
    render(
      <ComplianceStatusWidget
        securityLevels={{
          availability: "moderate", // lowercase
          integrity: "HIGH", // uppercase
          confidentiality: "Moderate", // normal
        }}
      />
    );

    expect(screen.getByTestId("compliance-status-text")).toHaveTextContent(
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );

    // Verify that all frameworks that require moderate level are compliant
    expect(
      screen.getByTestId("framework-status-soc-2-type-1")
    ).toHaveTextContent("✓");
    expect(screen.getByTestId("framework-status-iso-27001")).toHaveTextContent(
      "✓"
    );
  });
});
