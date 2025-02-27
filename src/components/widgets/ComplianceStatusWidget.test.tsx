import React from "react";
import { render, screen } from "@testing-library/react";
import ComplianceStatusWidget from "./ComplianceStatusWidget";

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

    expect(screen.getByText("Non-compliant")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
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

    expect(screen.getByText("Meets basic compliance only")).toBeInTheDocument();
    expect(screen.getByText("⚠️")).toBeInTheDocument();
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
      screen.getByText("Compliant with standard frameworks")
    ).toBeInTheDocument();

    // Use getAllByText since there are multiple checkmarks
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks.length).toBeGreaterThan(0);

    // Verify the main status checkmark is in the right section
    const statusSection = screen.getByText(
      "Compliant with standard frameworks"
    ).parentElement;

    // Check if statusSection exists instead of using toBeNull
    expect(statusSection !== null).toBe(true);

    // Only check innerHTML if statusSection exists
    if (statusSection) {
      expect(statusSection.innerHTML).toContain("✓");
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
      screen.getByText("Compliant with all major frameworks")
    ).toBeInTheDocument();
    expect(screen.getByText("✅")).toBeInTheDocument(); // Green checkmark
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
      screen.queryByText("Compliant with all major frameworks")
    ).not.toBeInTheDocument();

    // Get all framework elements
    const frameworks = screen.getAllByText(
      /SOC 2|ISO 27001|NIST 800-53|PCI DSS|HIPAA/
    );

    // Check each framework for compliance status
    const soc2Element = frameworks.find((el) =>
      el.textContent?.includes("SOC 2")
    );
    const nistElement = frameworks.find((el) =>
      el.textContent?.includes("NIST 800-53")
    );

    // Check parent elements for compliance indicators
    expect(soc2Element?.closest("div")?.textContent).toContain("✓");
    expect(nistElement?.closest("div")?.textContent).toContain("✗");
  });
});
