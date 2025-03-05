import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelSelector from "./SecurityLevelSelector";
import { SECURITY_LEVELS, CIA_LABELS } from "../constants/appConstants";
import { COMMON_COMPONENT_TEST_IDS, CIA_TEST_IDS } from "../constants/testIds";

// Mock the useCIAOptions hook
vi.mock("../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "No availability controls" },
      Low: { description: "Basic availability controls" },
      Moderate: { description: "Standard availability controls" },
      High: { description: "Advanced availability controls" },
      "Very High": { description: "Maximum availability controls" },
    },
    integrityOptions: {
      None: { description: "No integrity controls" },
      Low: { description: "Basic integrity controls" },
      Moderate: { description: "Standard integrity controls" },
      High: { description: "Advanced integrity controls" },
      "Very High": { description: "Maximum integrity controls" },
    },
    confidentialityOptions: {
      None: { description: "No confidentiality controls" },
      Low: { description: "Basic confidentiality controls" },
      Moderate: { description: "Standard confidentiality controls" },
      High: { description: "Advanced confidentiality controls" },
      "Very High": { description: "Maximum confidentiality controls" },
    },
  }),
}));

describe("SecurityLevelSelector", () => {
  const mockOnAvailabilityChange = vi.fn();
  const mockOnIntegrityChange = vi.fn();
  const mockOnConfidentialityChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<SecurityLevelSelector />);

    expect(screen.getByTestId("security-level-selector")).toBeInTheDocument();
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

  it("renders with custom initial values", () => {
    render(
      <SecurityLevelSelector
        initialAvailability={SECURITY_LEVELS.MODERATE}
        initialIntegrity={SECURITY_LEVELS.HIGH}
        initialConfidentiality={SECURITY_LEVELS.LOW}
      />
    );

    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.MODERATE
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.HIGH
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.LOW
    );
  });

  it("displays the selection summary when showSelectionSummary is true", () => {
    render(<SecurityLevelSelector showSelectionSummary={true} />);

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY)
    ).toBeInTheDocument();

    // Check key-value pairs show correct labels from constants
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.AVAILABILITY_KV)
    ).toHaveTextContent(CIA_LABELS.AVAILABILITY);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.INTEGRITY_KV)
    ).toHaveTextContent(CIA_LABELS.INTEGRITY);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CONFIDENTIALITY_KV)
    ).toHaveTextContent(CIA_LABELS.CONFIDENTIALITY);
  });

  it("hides the selection summary when showSelectionSummary is false", () => {
    render(<SecurityLevelSelector showSelectionSummary={false} />);

    expect(
      screen.queryByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY)
    ).not.toBeInTheDocument();
  });

  it("calls onChange handlers when security levels are changed", () => {
    render(
      <SecurityLevelSelector
        onAvailabilityChange={mockOnAvailabilityChange}
        onIntegrityChange={mockOnIntegrityChange}
        onConfidentialityChange={mockOnConfidentialityChange}
      />
    );

    // Change availability level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: SECURITY_LEVELS.HIGH },
    });
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith(SECURITY_LEVELS.HIGH);

    // Change integrity level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT), {
      target: { value: SECURITY_LEVELS.MODERATE },
    });
    expect(mockOnIntegrityChange).toHaveBeenCalledWith(
      SECURITY_LEVELS.MODERATE
    );

    // Change confidentiality level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: SECURITY_LEVELS.LOW },
    });
    expect(mockOnConfidentialityChange).toHaveBeenCalledWith(
      SECURITY_LEVELS.LOW
    );

    // Verify the selection summary is updated
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.AVAILABILITY_KV)
    ).toHaveTextContent(SECURITY_LEVELS.HIGH);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.INTEGRITY_KV)
    ).toHaveTextContent(SECURITY_LEVELS.MODERATE);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CONFIDENTIALITY_KV)
    ).toHaveTextContent(SECURITY_LEVELS.LOW);
  });

  it("uses custom options when provided", () => {
    const customAvailabilityOptions = {
      None: { description: "Custom none description" },
      Low: { description: "Custom low description" },
    };

    render(
      <SecurityLevelSelector availabilityOptions={customAvailabilityOptions} />
    );

    // Change to Low and verify the description from custom options is shown
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: SECURITY_LEVELS.LOW },
    });

    // The description should be rendered by the SecurityLevelWidget
    expect(
      screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_DESCRIPTION)
    ).toHaveTextContent("Custom low description");
  });

  it("handles updates to initial props", () => {
    const { rerender } = render(
      <SecurityLevelSelector
        initialAvailability={SECURITY_LEVELS.NONE}
        initialIntegrity={SECURITY_LEVELS.NONE}
        initialConfidentiality={SECURITY_LEVELS.NONE}
      />
    );

    // Check initial values
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.NONE
    );

    // Update props
    rerender(
      <SecurityLevelSelector
        initialAvailability={SECURITY_LEVELS.HIGH}
        initialIntegrity={SECURITY_LEVELS.MODERATE}
        initialConfidentiality={SECURITY_LEVELS.LOW}
      />
    );

    // Verify new values are reflected
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.HIGH
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.MODERATE
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      SECURITY_LEVELS.LOW
    );
  });

  it("renders with custom test ID", () => {
    render(<SecurityLevelSelector testId="custom-selector-id" />);

    expect(screen.getByTestId("custom-selector-id")).toBeInTheDocument();
  });
});
