import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";
import { CIADetails } from "../../types/cia";

// Enhanced mock options that satisfy the CIADetails interface
const createMockCIADetails = (
  technical: string,
  implementationSteps: string[]
): CIADetails => ({
  description: "Mock description",
  impact: "Mock impact",
  technical,
  implementationSteps,
  businessImpact: "Mock business impact",
  capex: 0,
  opex: 0,
  businessImpactDetails: {
    financialImpact: { description: "Financial impact", riskLevel: "LOW" },
    operationalImpact: { description: "Operational impact" },
  },
  bg: "#ffffff",
  text: "#000000",
  recommendations: ["Mock recommendation 1", "Mock recommendation 2"],
});

// Mock options for testing
const mockOptions = {
  None: createMockCIADetails("No redundancy or monitoring in place.", [
    "No implementation required",
    "No monitoring in place",
    "No recovery procedures",
  ]),
  Low: createMockCIADetails(
    "Basic monitoring with manual recovery procedures.",
    [
      "Set up basic monitoring",
      "Document manual recovery procedures",
      "Implement backup system",
    ]
  ),
  Moderate: createMockCIADetails(
    "Automated monitoring with scheduled backups.",
    [
      "Configure automated monitoring",
      "Set up scheduled backups",
      "Create recovery runbooks",
    ]
  ),
  High: createMockCIADetails(
    "High availability monitoring with redundant systems.",
    [
      "Implement high availability infrastructure",
      "Configure comprehensive monitoring",
      "Establish automated recovery",
    ]
  ),
};

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };

  it("renders without crashing", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    expect(screen.getByTestId("technical-details-widget")).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);

    // Default tab is availability
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No redundancy or monitoring in place."
    );
  });

  it("switches between tabs", async () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);

    // Click on integrity tab
    await userEvent.click(screen.getByTestId("integrity-tab"));

    // Should show integrity details
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No redundancy or monitoring in place."
    );

    // Verify active tab styling
    expect(screen.getByTestId("integrity-tab")).toHaveClass("border-b-2");
  });

  it("shows implementation steps", () => {
    render(<TechnicalDetailsWidget {...defaultProps} availability="Low" />);

    // Should show implementation steps for Low availability
    expect(screen.getByTestId("implementation-step-0")).toHaveTextContent(
      "Set up basic monitoring"
    );
    expect(screen.getByTestId("implementation-step-1")).toHaveTextContent(
      "Document manual recovery procedures"
    );
  });

  it("shows appropriate technologies based on level", () => {
    render(<TechnicalDetailsWidget {...defaultProps} availability="Low" />);

    // For Low availability, should show simple technologies
    expect(screen.getByText("Single server setup")).toBeInTheDocument();
    expect(screen.getByText("Scheduled backups")).toBeInTheDocument();
  });

  it("shows resource requirements", () => {
    render(
      <TechnicalDetailsWidget {...defaultProps} availability="Moderate" />
    );

    // Check if resource requirements are displayed
    expect(screen.getByTestId("development-effort")).toBeInTheDocument();
    expect(screen.getByTestId("maintenance-level")).toBeInTheDocument();
    expect(screen.getByTestId("required-expertise")).toBeInTheDocument();
  });

  it("handles different security levels", async () => {
    const props = {
      ...defaultProps,
      availability: "Moderate",
      integrity: "Low",
      confidentiality: "High",
    };

    render(<TechnicalDetailsWidget {...props} />);

    // Start with availability tab - this should be visible immediately
    expect(
      screen.getByTestId("availability-level-indicator")
    ).toHaveTextContent("Moderate");

    // Use fireEvent instead of userEvent to ensure synchronous execution
    // Click on integrity tab
    fireEvent.click(screen.getByTestId("integrity-tab"));

    // Now check for the integrity-level-indicator that should appear after tab change
    const integrityIndicator = screen.getByText(/Low/i, {
      selector: '[data-testid$="-level-indicator-value"]',
    });
    expect(integrityIndicator).toBeInTheDocument();

    // Click on confidentiality tab
    fireEvent.click(screen.getByTestId("confidentiality-tab"));

    // Check for confidentiality level indicator
    const confidentialityIndicator = screen.getByText(/High/i, {
      selector: '[data-testid$="-level-indicator-value"]',
    });
    expect(confidentialityIndicator).toBeInTheDocument();
  });
});
