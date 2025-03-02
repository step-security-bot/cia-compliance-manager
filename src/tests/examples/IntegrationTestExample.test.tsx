import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";

import SecurityLevelWidget from "../../components/widgets/SecurityLevelWidget";
import { createMockOptions } from "../mockFactory";

/**
 * EXAMPLE: Integration Test with Hook Mocking
 *
 * This file demonstrates how to test components that depend on the useCIAOptions hook
 * by properly mocking the hook's implementation and testing component interactions.
 */

// Sample mock for useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => {
  const mockOptions = {
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

  return {
    useCIAOptions: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
    }),
  };
});

describe("SecurityLevelWidget Integration Test", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  // Create complete props including the mock options
  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    setAvailability: mockSetAvailability,
    setIntegrity: mockSetIntegrity,
    setConfidentiality: mockSetConfidentiality,
    availabilityOptions: createMockOptions(["None", "Low"]),
    integrityOptions: createMockOptions(["None"]),
    confidentialityOptions: createMockOptions(["None"]),
  };

  it("renders with appropriate descriptions", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Use test IDs instead of exact text for more reliable testing
    const availabilityDesc = screen.getByTestId("availability-description");
    const integrityDesc = screen.getByTestId("integrity-description");
    const confidentialityDesc = screen.getByTestId(
      "confidentiality-description"
    );

    // Verify the descriptions are rendered (based on the mocked createMockOptions)
    expect(availabilityDesc).toHaveTextContent("None description");
    expect(integrityDesc).toHaveTextContent("None description");
    expect(confidentialityDesc).toHaveTextContent("None description");
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
