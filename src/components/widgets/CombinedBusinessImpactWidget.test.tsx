import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest"; // Import vi from vitest instead of using jest
import CombinedBusinessImpactWidget from "./CombinedBusinessImpactWidget";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../../hooks/useCIAOptions";

// Mock the BusinessImpactAnalysisWidget component using Vitest's vi.mock
vi.mock("./BusinessImpactAnalysisWidget", () => ({
  default: ({ category, level }: { category: string; level: string }) => (
    <div data-testid={`mock-business-impact-${category.toLowerCase()}`}>
      {category} - {level} Impact Analysis
    </div>
  ),
}));

describe("CombinedBusinessImpactWidget", () => {
  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
  };

  it("renders all three impact sections", () => {
    render(<CombinedBusinessImpactWidget {...defaultProps} />);

    // Check for section headers
    expect(screen.getByText("Availability Impact")).toBeInTheDocument();
    expect(screen.getByText("Integrity Impact")).toBeInTheDocument();
    expect(screen.getByText("Confidentiality Impact")).toBeInTheDocument();
  });

  it("displays correct security levels for each component", () => {
    const props = {
      ...defaultProps,
      availability: "Moderate",
      integrity: "High",
      confidentiality: "Low",
    };

    render(<CombinedBusinessImpactWidget {...props} />);

    expect(screen.getByText("Moderate Availability")).toBeInTheDocument();
    expect(screen.getByText("High Integrity")).toBeInTheDocument();
    expect(screen.getByText("Low Confidentiality")).toBeInTheDocument();
  });

  it("shows the introduction text", () => {
    render(<CombinedBusinessImpactWidget {...defaultProps} />);

    expect(
      screen.getByText(/Business Impact Analysis \(BIA\) helps identify/)
    ).toBeInTheDocument();
    expect(screen.getByText("Key Benefits")).toBeInTheDocument();
    expect(screen.getByText("Business Considerations")).toBeInTheDocument();
  });

  it("renders child BusinessImpactAnalysisWidget components", () => {
    render(<CombinedBusinessImpactWidget {...defaultProps} />);

    expect(
      screen.getByTestId("mock-business-impact-availability")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-business-impact-integrity")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-business-impact-confidentiality")
    ).toBeInTheDocument();
  });

  // Add these tests to improve branch coverage
  it("renders with different levels of confidentiality to test branch coverage", () => {
    // Test Very High confidentiality case for regulatory risk conditional
    const veryHighProps = {
      ...defaultProps,
      confidentiality: "Very High",
    };

    const { rerender } = render(
      <CombinedBusinessImpactWidget {...veryHighProps} />
    );

    // Find the regulatory risk text and verify it shows "Minimal"
    const riskText = screen.getByText(/regulatory risk:/i);
    expect(riskText).toBeInTheDocument();
    expect(riskText.textContent).toContain("Minimal");

    // Test Low confidentiality case
    const lowProps = {
      ...defaultProps,
      confidentiality: "Low",
    };

    rerender(<CombinedBusinessImpactWidget {...lowProps} />);

    // Verify it now shows "Significant"
    expect(screen.getByText(/regulatory risk:/i).textContent).toContain(
      "Significant"
    );
  });

  it("renders with different levels of availability to test branch coverage", () => {
    // Test Very High availability branch
    const veryHighProps = {
      ...defaultProps,
      availability: "Very High",
    };

    const { rerender } = render(
      <CombinedBusinessImpactWidget {...veryHighProps} />
    );

    // Find the revenue impact text and verify it shows "Minimal"
    const impactText = screen.getByText(/revenue impact:/i);
    expect(impactText).toBeInTheDocument();
    expect(impactText.textContent).toContain("Minimal");

    // Test other branches (High, Moderate, Low)
    const testCases = [
      { level: "High", expected: "Low" },
      { level: "Moderate", expected: "Moderate" },
      { level: "Low", expected: "High" },
    ];

    testCases.forEach(({ level, expected }) => {
      rerender(
        <CombinedBusinessImpactWidget {...defaultProps} availability={level} />
      );
      expect(screen.getByText(/revenue impact:/i).textContent).toContain(
        expected
      );
    });
  });
});
