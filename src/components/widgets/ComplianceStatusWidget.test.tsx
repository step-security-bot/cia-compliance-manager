import React from "react";
import { render, screen } from "@testing-library/react";
import ComplianceStatusWidget from "./ComplianceStatusWidget";
import {
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  SECURITY_LEVELS,
} from "../../constants";
import { TEST_CIA_LEVELS } from "../../constants/testConstants";

describe("ComplianceStatusWidget", () => {
  it("shows non-compliant status when any component is at None level", () => {
    render(
      <ComplianceStatusWidget
        availability={TEST_CIA_LEVELS.NONE}
        integrity={TEST_CIA_LEVELS.MODERATE}
        confidentiality={TEST_CIA_LEVELS.HIGH}
      />
    );

    const statusBadge = screen.getByTestId("compliance-status-badge");
    expect(statusBadge).toHaveTextContent(COMPLIANCE_STATUS.NON_COMPLIANT);

    // Verify no frameworks are shown as compliant
    expect(screen.queryAllByTestId(/^framework-\d+$/)).toHaveLength(0);
  });

  it("shows basic compliance when the lowest level is Low", () => {
    render(
      <ComplianceStatusWidget
        availability={TEST_CIA_LEVELS.LOW}
        integrity={TEST_CIA_LEVELS.MODERATE}
        confidentiality={TEST_CIA_LEVELS.HIGH}
      />
    );

    const statusBadge = screen.getByTestId("compliance-status-badge");
    expect(statusBadge).toHaveTextContent(COMPLIANCE_STATUS.BASIC_COMPLIANCE);

    // Verify SOC2 is shown as the only framework
    expect(screen.getByTestId("framework-0")).toHaveTextContent(
      COMPLIANCE_FRAMEWORKS.SOC2
    );
    expect(screen.queryByTestId("framework-1")).not.toBeInTheDocument();
  });

  it("shows standard compliance when the lowest level is Moderate", () => {
    render(
      <ComplianceStatusWidget
        availability={TEST_CIA_LEVELS.MODERATE}
        integrity={TEST_CIA_LEVELS.MODERATE}
        confidentiality={TEST_CIA_LEVELS.HIGH}
      />
    );

    const statusBadge = screen.getByTestId("compliance-status-badge");
    expect(statusBadge).toHaveTextContent(
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );

    // Verify SOC2 and ISO27001 are shown
    expect(screen.getByTestId("framework-0")).toHaveTextContent(
      COMPLIANCE_FRAMEWORKS.SOC2
    );
    expect(screen.getByTestId("framework-1")).toHaveTextContent(
      COMPLIANCE_FRAMEWORKS.ISO27001
    );
    // There should be exactly two frameworks
    expect(screen.queryAllByTestId(/^framework-\d+$/)).toHaveLength(2);
  });

  it("shows full compliance when all levels are Very High", () => {
    render(
      <ComplianceStatusWidget
        availability={TEST_CIA_LEVELS.VERY_HIGH}
        integrity={TEST_CIA_LEVELS.VERY_HIGH}
        confidentiality={TEST_CIA_LEVELS.VERY_HIGH}
      />
    );

    const statusBadge = screen.getByTestId("compliance-status-badge");
    expect(statusBadge).toHaveTextContent(COMPLIANCE_STATUS.FULL_COMPLIANCE);

    // Verify all frameworks are shown
    const frameworkElements = screen.getAllByTestId(/^framework-\d+$/);
    expect(frameworkElements.length).toBe(
      Object.keys(COMPLIANCE_FRAMEWORKS).length
    );

    // Check that all framework names are displayed
    const frameworkTexts = frameworkElements.map((el) =>
      el.textContent?.trim()
    );
    const expectedFrameworks = Object.values(COMPLIANCE_FRAMEWORKS).map((f) =>
      f.trim()
    );

    // Compare sorted arrays to ensure order doesn't matter
    expect(frameworkTexts.sort()).toEqual(expectedFrameworks.sort());
  });

  it("shows requirements for full compliance", () => {
    render(
      <ComplianceStatusWidget
        availability={TEST_CIA_LEVELS.MODERATE}
        integrity={TEST_CIA_LEVELS.LOW}
        confidentiality={TEST_CIA_LEVELS.LOW}
      />
    );

    // Verify the requirements are shown
    expect(
      screen.getByText(/Requirements for Full Compliance/i)
    ).toBeInTheDocument();

    // Check that requirements include mentions of security levels needed
    const requirementsList = screen.getByTestId("compliance-requirements-list");
    expect(requirementsList).toHaveTextContent(/High/i);
    expect(requirementsList).toHaveTextContent(/Integrity/i);
  });
});
