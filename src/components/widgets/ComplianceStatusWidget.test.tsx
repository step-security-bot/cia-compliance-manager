import React from "react";
import { render, screen } from "@testing-library/react";
import ComplianceStatusWidget from "./ComplianceStatusWidget";
import {
  COMPLIANCE_STATUS,
  UI_ICONS,
  TEST_MATCHERS,
  COMPLIANCE_FRAMEWORKS,
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

    expect(
      screen.getByText(COMPLIANCE_STATUS.FULL_COMPLIANCE)
    ).toBeInTheDocument();
    expect(screen.getByText(UI_ICONS.FULL_COMPLIANCE)).toBeInTheDocument();
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
});
