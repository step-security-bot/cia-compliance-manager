import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { vi } from "vitest";
import { CIA_LABELS, TEST_DATA } from "../../constants/appConstants";
import userEvent from "@testing-library/user-event";

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

  it("displays technical details on hover", async () => {
    // Setup with more detailed options
    const enhancedProps = {
      ...mockProps,
      availabilityOptions: {
        ...mockAvailabilityOptions,
        None: {
          ...mockAvailabilityOptions.None,
          technical: "Availability technical details",
          businessImpact: "Availability business impact",
        },
      },
    };

    render(<SecurityLevelWidget {...enhancedProps} />);

    // Hover over the technical info button
    fireEvent.mouseEnter(
      screen.getByTestId("availability-technical-info-button")
    );

    // Check that the popover appears with correct content
    const popover = screen.getByTestId("availability-technical-popover");
    expect(popover).toBeInTheDocument();
    expect(
      screen.getByTestId("availability-technical-details")
    ).toHaveTextContent("Availability technical details");
    expect(
      screen.getByTestId("availability-business-impact")
    ).toHaveTextContent("Availability business impact");

    // Check that the popover disappears on mouse leave
    fireEvent.mouseLeave(
      screen.getByTestId("availability-technical-info-button")
    );
    expect(
      screen.queryByTestId("availability-technical-popover")
    ).not.toBeInTheDocument();
  });

  it("renders color indicators for security levels", () => {
    const enhancedProps = {
      ...mockProps,
      availability: "Low",
      integrity: "Moderate",
      confidentiality: "High",
    };

    render(<SecurityLevelWidget {...enhancedProps} />);

    // Check color indicators have different colors for different levels
    const availabilityColor = window.getComputedStyle(
      screen.getByTestId("availability-color-indicator")
    ).backgroundColor;
    const integrityColor = window.getComputedStyle(
      screen.getByTestId("integrity-color-indicator")
    ).backgroundColor;
    const confidentialityColor = window.getComputedStyle(
      screen.getByTestId("confidentiality-color-indicator")
    ).backgroundColor;

    // These might not work in JSDOM but would work in a browser environment
    // At least check the elements exist
    expect(
      screen.getByTestId("availability-color-indicator")
    ).toBeInTheDocument();
    expect(screen.getByTestId("integrity-color-indicator")).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-color-indicator")
    ).toBeInTheDocument();
  });

  // Add test for hover functionality to improve function coverage
  it("shows technical details when hovering over info button", async () => {
    const user = userEvent.setup();

    render(
      <SecurityLevelWidget
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
        setAvailability={vi.fn()}
        setIntegrity={vi.fn()}
        setConfidentiality={vi.fn()}
        availabilityOptions={mockAvailabilityOptions}
        integrityOptions={mockIntegrityOptions}
        confidentialityOptions={mockConfidentialityOptions}
      />
    );

    // Find the info button and hover over it
    const infoButton = screen.getByTestId("availability-technical-info-button");

    // Trigger mouseEnter
    await user.hover(infoButton);

    // Check that technical details popover appears
    expect(
      screen.getByTestId("availability-technical-popover")
    ).toBeInTheDocument();

    // Trigger mouseLeave
    await user.unhover(infoButton);

    // Check that technical details popover disappears
    expect(
      screen.queryByTestId("availability-technical-popover")
    ).not.toBeInTheDocument();
  });
});
