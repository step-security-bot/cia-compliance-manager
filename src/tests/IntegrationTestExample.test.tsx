/// <reference types="vitest" />

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest"; // Explicit imports

// Import the component you want to test
import SecurityLevelWidget from "../components/widgets/SecurityLevelWidget";
import { createMockOptions } from "./mockFactory";

// Sample mock for useCIAOptions hook
vi.mock("../hooks/useCIAOptions", () => {
  const mockAvailabilityOptions = {
    None: {
      description: "No guaranteed uptime",
      impact: "Complete business disruption",
      technical: "No redundancy",
      businessImpact: "Critical operations halt",
      capex: 0,
      opex: 0,
      bg: "#ffcccc",
      text: "#800000",
      recommendations: ["Implement basic monitoring"],
    },
    Low: {
      description: "Basic availability",
      impact: "Extended outages may occur",
      technical: "Minimal backup systems",
      businessImpact: "Frequent disruptions",
      capex: 5,
      opex: 5,
      bg: "#ffe0cc",
      text: "#804000",
      recommendations: ["Implement automated alerts"],
    },
  };

  const mockIntegrityOptions = {
    None: {
      description: "No data integrity controls",
      impact: "Data corruption may go undetected",
      technical: "No validation processes",
      businessImpact: "Decisions based on corrupt data",
      capex: 0,
      opex: 0,
      bg: "#ffcccc",
      text: "#800000",
      recommendations: ["Implement basic validation"],
    },
  };

  const mockConfidentialityOptions = {
    None: {
      description: "No confidentiality controls",
      impact: "Data accessible to anyone",
      technical: "No access control",
      businessImpact: "No protection for information",
      capex: 0,
      opex: 0,
      bg: "#ffcccc",
      text: "#800000",
      recommendations: ["Implement access controls"],
    },
  };

  return {
    useCIAOptions: () => ({
      availabilityOptions: mockAvailabilityOptions,
      integrityOptions: mockIntegrityOptions,
      confidentialityOptions: mockConfidentialityOptions,
    }),
  };
});

describe("SecurityLevelWidget Integration Test", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  // Create complete props with all required properties
  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    setAvailability: mockSetAvailability,
    setIntegrity: mockSetIntegrity,
    setConfidentiality: mockSetConfidentiality,
    // Add the missing required properties
    availabilityOptions: createMockOptions(["None", "Low"]),
    integrityOptions: createMockOptions(["None"]),
    confidentialityOptions: createMockOptions(["None"]),
  };

  it("renders with data from useCIAOptions hook", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Verify descriptions from mocked hook data are displayed
    expect(screen.getByText("No guaranteed uptime")).toBeInTheDocument();
    expect(screen.getByText("No data integrity controls")).toBeInTheDocument();
    expect(screen.getByText("No confidentiality controls")).toBeInTheDocument();
  });

  it("handles security level changes", async () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Set up userEvent
    const user = userEvent.setup();

    // Change availability to Low
    await user.selectOptions(screen.getByTestId("availability-select"), "Low");

    // Verify the setter was called with the new value
    expect(mockSetAvailability).toHaveBeenCalledWith("Low");
  });
});
