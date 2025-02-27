import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { vi } from "vitest";

describe("SecurityLevelWidget", () => {
  const mockAvailabilityOptions = {
    None: {
      description: "None",
      impact: "None",
      technical: "None",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    Low: {
      description: "Low",
      impact: "Low",
      technical: "Low",
      capex: 5,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
    },
  };

  const mockIntegrityOptions = {
    None: {
      description: "None",
      impact: "None",
      technical: "None",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    Low: {
      description: "Low",
      impact: "Low",
      technical: "Low",
      capex: 5,
      opex: 10,
      bg: "#ffffff",
      text: "#000000",
    },
  };

  const mockConfidentialityOptions = {
    None: {
      description: "None",
      impact: "None",
      technical: "None",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    Low: {
      description: "Low",
      impact: "Low",
      technical: "Low",
      capex: 5,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
    },
  };

  const mockProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    setAvailability: vi.fn(),
    setIntegrity: vi.fn(),
    setConfidentiality: vi.fn(),
    availabilityOptions: mockAvailabilityOptions,
    integrityOptions: mockIntegrityOptions,
    confidentialityOptions: mockConfidentialityOptions,
  };

  it("renders all select components", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    expect(screen.getByTestId("availability-select")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-select")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-select")).toBeInTheDocument();
  });

  it("selects have default values", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    expect(screen.getByTestId("availability-select")).toHaveValue("None");
    expect(screen.getByTestId("integrity-select")).toHaveValue("None");
    expect(screen.getByTestId("confidentiality-select")).toHaveValue("None");
  });

  it("handles selection changes", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    fireEvent.change(screen.getByTestId("availability-select"), {
      target: { value: "Low" },
    });
    expect(mockProps.setAvailability).toHaveBeenCalledWith("Low");

    fireEvent.change(screen.getByTestId("integrity-select"), {
      target: { value: "Low" },
    });
    expect(mockProps.setIntegrity).toHaveBeenCalledWith("Low");

    fireEvent.change(screen.getByTestId("confidentiality-select"), {
      target: { value: "Low" },
    });
    expect(mockProps.setConfidentiality).toHaveBeenCalledWith("Low");
  });

  it("displays informative text about selecting security levels", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    expect(
      screen.getByText(
        /Select security levels for each component of the CIA triad/
      )
    ).toBeInTheDocument();
  });
});
