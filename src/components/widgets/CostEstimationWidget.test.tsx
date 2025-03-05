import React from "react";
import { render, screen } from "@testing-library/react";
import CostEstimationWidget from "./CostEstimationWidget";
import { COST_TEST_IDS } from "../../constants/testIds";
import { SECURITY_LEVELS } from "../../constants/appConstants";

// Simple mock options for the tests
const mockOptions = {
  availability: {
    None: { capex: 0, opex: 0 },
    Low: { capex: 10, opex: 5 },
    Moderate: { capex: 30, opex: 15 },
    High: { capex: 50, opex: 30 },
  },
  integrity: {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 5 },
    Moderate: { capex: 20, opex: 10 },
    High: { capex: 40, opex: 25 },
  },
  confidentiality: {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 5 },
    Moderate: { capex: 20, opex: 10 },
    High: { capex: 40, opex: 25 },
  },
};

describe("CostEstimationWidget", () => {
  it("renders with default props", () => {
    render(
      <CostEstimationWidget
        totalCapex={0}
        totalOpex={0}
        capexEstimate="$0"
        opexEstimate="$0"
        isSmallSolution={true}
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    // Verify the component renders
    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ESTIMATION_CONTENT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.ESTIMATED_COST_HEADING)
    ).toBeInTheDocument();
  });

  it("calculates costs correctly for None security levels", () => {
    render(
      <CostEstimationWidget
        totalCapex={0}
        totalOpex={0}
        capexEstimate="$0"
        opexEstimate="$0"
        isSmallSolution={true}
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    // For None levels, the values should be $0 not 0%
    expect(
      screen.getByTestId(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE).textContent
    ).toBe("$0"); // Changed from .toMatch(/0%/)
    expect(
      screen.getByTestId(COST_TEST_IDS.OPEX_ESTIMATE_VALUE).textContent
    ).toBe("$0"); // Changed from .toMatch(/0%/)
  });

  it("calculates costs correctly for mixed security levels", () => {
    render(
      <CostEstimationWidget
        totalCapex={75}
        totalOpex={45}
        capexEstimate="$375000"
        opexEstimate="$90000"
        isSmallSolution={false}
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.LOW}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    // Check calculated totals
    expect(
      screen.getByTestId(COST_TEST_IDS.TOTAL_COST_SUMMARY)
    ).toBeInTheDocument();

    // Verify the progress bars are displaying
    expect(
      screen.getByTestId(COST_TEST_IDS.CAPEX_PROGRESS_BAR)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.OPEX_PROGRESS_BAR)
    ).toBeInTheDocument();
  });

  it("renders cost analysis section", () => {
    render(
      <CostEstimationWidget
        totalCapex={130}
        totalOpex={80}
        capexEstimate="$650000"
        opexEstimate="$160000"
        isSmallSolution={false}
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ANALYSIS_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ANALYSIS_HEADING)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ANALYSIS_TEXT)
    ).toBeInTheDocument();
  });

  it("displays implementation time estimate", () => {
    render(
      <CostEstimationWidget
        totalCapex={70}
        totalOpex={35}
        capexEstimate="$350000"
        opexEstimate="$70000"
        isSmallSolution={false}
        implementationTime="3-6 months"
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.MODERATE}
        confidentialityLevel={SECURITY_LEVELS.MODERATE}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    expect(
      screen.getByTestId(COST_TEST_IDS.IMPLEMENTATION_TIME)
    ).toBeInTheDocument();
  });

  it("shows three-year cost projection", () => {
    render(
      <CostEstimationWidget
        totalCapex={20}
        totalOpex={15}
        capexEstimate="$100000"
        opexEstimate="$30000"
        isSmallSolution={true}
        availabilityLevel={SECURITY_LEVELS.LOW}
        integrityLevel={SECURITY_LEVELS.LOW}
        confidentialityLevel={SECURITY_LEVELS.LOW}
        availabilityOptions={mockOptions.availability}
        integrityOptions={mockOptions.integrity}
        confidentialityOptions={mockOptions.confidentiality}
      />
    );

    expect(
      screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL)
    ).toBeInTheDocument();
  });
});
