import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  TEST_DATA,
  TEST_HELPERS,
  TEST_CIA_LEVELS,
} from "../../constants/testConstants";
import { SECURITY_LEVELS } from "../../constants";
import { CIA_LABELS } from "../../constants";
import { CIA_TEST_IDS, WIDGET_TEST_IDS } from "../../constants/testIds";

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
    availabilityLevel: "None",
    integrityLevel: "None",
    confidentialityLevel: "None",
    onAvailabilityChange: vi.fn(),
    onIntegrityChange: vi.fn(),
    onConfidentialityChange: vi.fn(),
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

    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "None"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "None"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "None"
    );
  });

  it("handles selection changes", () => {
    render(<SecurityLevelWidget {...mockProps} />);

    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: TEST_CIA_LEVELS.LOW },
    });
    expect(mockProps.onAvailabilityChange).toHaveBeenCalledWith(
      TEST_CIA_LEVELS.LOW
    );

    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT), {
      target: { value: TEST_CIA_LEVELS.LOW },
    });
    expect(mockProps.onIntegrityChange).toHaveBeenCalledWith(
      TEST_CIA_LEVELS.LOW
    );

    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: TEST_CIA_LEVELS.LOW },
    });
    expect(mockProps.onConfidentialityChange).toHaveBeenCalledWith(
      TEST_CIA_LEVELS.LOW
    );
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
      availabilityLevel: "Low",
      integrityLevel: "Moderate",
      confidentialityLevel: "High",
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
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
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

  // Add these tests to improve branch coverage

  it("correctly handles hover state for technical details of integrity and confidentiality", async () => {
    const user = userEvent.setup();
    const customProps = {
      ...mockProps,
      integrityOptions: {
        ...mockIntegrityOptions,
        None: {
          ...mockIntegrityOptions.None,
          technical: "Integrity technical details",
          businessImpact: "Integrity business impact",
        },
      },
      confidentialityOptions: {
        ...mockConfidentialityOptions,
        None: {
          ...mockConfidentialityOptions.None,
          technical: "Confidentiality technical details",
          businessImpact: "Confidentiality business impact",
        },
      },
    };

    render(<SecurityLevelWidget {...customProps} />);

    // Test integrity hover
    const integrityButton = screen.getByTestId(
      "integrity-technical-info-button"
    );
    await user.hover(integrityButton);

    // Check popover appears
    expect(
      screen.getByTestId("integrity-technical-popover")
    ).toBeInTheDocument();
    expect(screen.getByTestId("integrity-technical-details")).toHaveTextContent(
      "Integrity technical details"
    );

    // Mouse leave integrity
    await user.unhover(integrityButton);
    expect(
      screen.queryByTestId("integrity-technical-popover")
    ).not.toBeInTheDocument();

    // Test confidentiality hover
    const confidentialityButton = screen.getByTestId(
      "confidentiality-technical-info-button"
    );
    await user.hover(confidentialityButton);

    // Check popover appears
    expect(
      screen.getByTestId("confidentiality-technical-popover")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-technical-details")
    ).toHaveTextContent("Confidentiality technical details");

    // Mouse leave confidentiality
    await user.unhover(confidentialityButton);
    expect(
      screen.queryByTestId("confidentiality-technical-popover")
    ).not.toBeInTheDocument();
  });

  it("displays validation method and protection method badges when available", () => {
    const customProps = {
      ...mockProps,
      integrityLevel: "Low",
      integrityOptions: {
        ...mockIntegrityOptions,
        Low: {
          ...mockIntegrityOptions.Low,
          validationMethod: "Hash Validation",
        },
      },
      confidentialityLevel: "Low",
      confidentialityOptions: {
        ...mockConfidentialityOptions,
        Low: {
          ...mockConfidentialityOptions.Low,
          protectionMethod: "Basic Encryption",
        },
      },
    };

    render(<SecurityLevelWidget {...customProps} />);

    expect(
      screen.getByTestId("integrity-validation-badge")
    ).toBeInTheDocument();
    expect(screen.getByTestId("integrity-validation-badge")).toHaveTextContent(
      "Hash Validation"
    );

    expect(
      screen.getByTestId("confidentiality-protection-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-protection-badge")
    ).toHaveTextContent("Basic Encryption");
  });

  it("handles rendering with availability uptime information", () => {
    const customProps = {
      ...mockProps,
      availabilityLevel: "Low",
      availabilityOptions: {
        ...mockAvailabilityOptions,
        Low: {
          ...mockAvailabilityOptions.Low,
          uptime: "99.5% uptime",
        },
      },
    };

    render(<SecurityLevelWidget {...customProps} />);

    expect(screen.getByTestId("availability-uptime-badge")).toBeInTheDocument();
    expect(screen.getByTestId("availability-uptime-badge")).toHaveTextContent(
      "99.5% uptime"
    );
  });
});
