import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event"; // Import userEvent
import SecurityLevelWidget from "../../components/widgets/SecurityLevelWidget";
import { createMockOptions } from "../mockFactory";

describe("SecurityLevelWidget Integration Test", () => {
  // Mock the handlers
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  // Create mock options
  const mockOptions = createMockOptions(["None", "Low"]);

  // Setup the component props
  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    setAvailability: mockSetAvailability,
    setIntegrity: mockSetIntegrity,
    setConfidentiality: mockSetConfidentiality,
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with appropriate descriptions", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Get the description elements
    const availabilityDesc = screen.getByTestId("availability-description");
    const integrityDesc = screen.getByTestId("integrity-description");
    const confidentialityDesc = screen.getByTestId(
      "confidentiality-description"
    );

    // Update the expected text to match the actual text content that includes "level description"
    expect(availabilityDesc).toHaveTextContent("None level description");
    expect(integrityDesc).toHaveTextContent("None level description");
    expect(confidentialityDesc).toHaveTextContent("None level description");

    // Verify select elements are rendered
    expect(screen.getByTestId("availability-select")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-select")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-select")).toBeInTheDocument();
  });

  it("handles security level changes", async () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Set up userEvent
    const user = userEvent.setup();

    // Change availability to Low
    await user.selectOptions(screen.getByTestId("availability-select"), "Low");

    // Verify the handler was called
    expect(mockSetAvailability).toHaveBeenCalledWith("Low");

    // Change integrity to Low
    await user.selectOptions(screen.getByTestId("integrity-select"), "Low");

    // Verify the handler was called
    expect(mockSetIntegrity).toHaveBeenCalledWith("Low");

    // Change confidentiality to Low
    await user.selectOptions(
      screen.getByTestId("confidentiality-select"),
      "Low"
    );

    // Verify the handler was called
    expect(mockSetConfidentiality).toHaveBeenCalledWith("Low");
  });
});
