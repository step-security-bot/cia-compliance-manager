import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { vi } from "vitest";
import { CIA_LABELS, TEST_DATA } from "../../constants/appConstants";

describe("SecurityLevelWidget", () => {
  const mockAvailabilityOptions = {
    None: TEST_DATA.MOCK_OPTIONS.BASE,
    Low: TEST_DATA.MOCK_OPTIONS.LOW,
  };

  const mockIntegrityOptions = {
    None: TEST_DATA.MOCK_OPTIONS.BASE,
    Low: {
      ...TEST_DATA.MOCK_OPTIONS.LOW,
      opex: 10,
    },
  };

  const mockConfidentialityOptions = {
    None: TEST_DATA.MOCK_OPTIONS.BASE,
    Low: TEST_DATA.MOCK_OPTIONS.LOW,
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

  it("renders all security level components", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    expect(screen.getByTestId("security-level-controls")).toBeInTheDocument();
    expect(screen.getByText(CIA_LABELS.AVAILABILITY)).toBeInTheDocument();
    expect(screen.getByText(CIA_LABELS.INTEGRITY)).toBeInTheDocument();
    expect(screen.getByText(CIA_LABELS.CONFIDENTIALITY)).toBeInTheDocument();
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

  it("displays descriptions from options", () => {
    const propsWithDescriptions = {
      ...mockProps,
      availabilityOptions: {
        ...mockAvailabilityOptions,
        None: {
          ...mockAvailabilityOptions.None,
          description: TEST_DATA.MOCK_DESCRIPTIONS.AVAILABILITY,
        },
      },
      integrityOptions: {
        ...mockIntegrityOptions,
        None: {
          ...mockIntegrityOptions.None,
          description: TEST_DATA.MOCK_DESCRIPTIONS.INTEGRITY,
        },
      },
      confidentialityOptions: {
        ...mockConfidentialityOptions,
        None: {
          ...mockConfidentialityOptions.None,
          description: TEST_DATA.MOCK_DESCRIPTIONS.CONFIDENTIALITY,
        },
      },
    };

    render(<SecurityLevelWidget {...propsWithDescriptions} />);

    expect(
      screen.getByText(TEST_DATA.MOCK_DESCRIPTIONS.AVAILABILITY)
    ).toBeInTheDocument();
    expect(
      screen.getByText(TEST_DATA.MOCK_DESCRIPTIONS.INTEGRITY)
    ).toBeInTheDocument();
    expect(
      screen.getByText(TEST_DATA.MOCK_DESCRIPTIONS.CONFIDENTIALITY)
    ).toBeInTheDocument();
  });
});
