import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelSelector from "./SecurityLevelSelector";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  UI_TEXT,
} from "../constants/appConstants";
import { CIA_TEST_IDS, COMMON_COMPONENT_TEST_IDS } from "../constants/testIds";

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

  it("renders with correct title", () => {
    render(<SecurityLevelSelector />);

    // Check if the title matches with what's in UI_TEXT constants
    expect(
      screen.getByText(UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL)
    ).toBeInTheDocument();
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
  });

  it("uses custom options when provided", () => {
    const customAvailabilityOptions = {
      None: { description: "Custom none description" },
      Low: { description: "Custom low description" },
    };

    render(
      <SecurityLevelSelector availabilityOptions={customAvailabilityOptions} />
    );

    // Change to Low and verify the description is shown
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

  it("shows technical details on info button hover", () => {
    render(<SecurityLevelSelector />);

    // Trigger mouseEnter on the confidentiality info button
    fireEvent.mouseEnter(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON)
    );

    // Check if technical details appear
    expect(screen.getByText("Technical Details:")).toBeInTheDocument();

    // Hide details
    fireEvent.mouseLeave(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON)
    );
  });

  it("displays badges when available in options", () => {
    const optionsWithBadges = {
      None: { description: "No controls", uptime: "< 90%" },
      Low: { description: "Basic controls", uptime: "95%" },
    };

    render(<SecurityLevelSelector availabilityOptions={optionsWithBadges} />);

    // Change to Low level and check for badge
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: SECURITY_LEVELS.LOW },
    });

    const uptimeBadge = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_UPTIME_BADGE
    );
    expect(uptimeBadge).toBeInTheDocument();
    expect(uptimeBadge).toHaveTextContent("95%");
  });

  it("has components in correct order: Confidentiality, Integrity, Availability", () => {
    render(<SecurityLevelSelector />);

    // Get all sections
    const confidentialitySection = screen.getByTestId(
      CIA_TEST_IDS.CONFIDENTIALITY_SECTION
    );
    const integritySection = screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SECTION);
    const availabilitySection = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SECTION
    );

    // Check that they appear in the DOM in the expected order
    // This assertion works because elements in the DOM are compared by their
    // position in the document, not by reference equality
    expect(
      confidentialitySection.compareDocumentPosition(integritySection) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(
      integritySection.compareDocumentPosition(availabilitySection) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
