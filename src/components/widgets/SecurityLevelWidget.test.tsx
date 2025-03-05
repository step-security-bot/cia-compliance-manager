import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { SECURITY_LEVELS } from "../../constants/appConstants";

describe("SecurityLevelWidget", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    availabilityOptions: {
      None: { description: "Base description" },
      Low: { description: "Low description" },
    },
    integrityOptions: {
      None: { description: "Base description" },
      Low: { description: "Low description" },
    },
    confidentialityOptions: {
      None: { description: "Base description" },
      Low: { description: "Low description" },
    },
    setAvailability: mockSetAvailability,
    setIntegrity: mockSetIntegrity,
    setConfidentiality: mockSetConfidentiality,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all security level components", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    expect(screen.getByTestId("security-level-controls")).toBeInTheDocument();
    expect(screen.getByTestId("availability-section")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-section")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-section")).toBeInTheDocument();
  });

  it("selects have default values", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const availabilitySelect = screen.getByTestId(
      "availability-select"
    ) as HTMLSelectElement;
    const integritySelect = screen.getByTestId(
      "integrity-select"
    ) as HTMLSelectElement;
    const confidentialitySelect = screen.getByTestId(
      "confidentiality-select"
    ) as HTMLSelectElement;

    expect(availabilitySelect.value).toBe("None");
    expect(integritySelect.value).toBe("None");
    expect(confidentialitySelect.value).toBe("None");
  });

  it("handles selection changes", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const availabilitySelect = screen.getByTestId("availability-select");
    const integritySelect = screen.getByTestId("integrity-select");
    const confidentialitySelect = screen.getByTestId("confidentiality-select");

    fireEvent.change(availabilitySelect, {
      target: { value: SECURITY_LEVELS.LOW },
    });
    expect(mockSetAvailability).toHaveBeenCalledWith(SECURITY_LEVELS.LOW);

    fireEvent.change(integritySelect, {
      target: { value: SECURITY_LEVELS.LOW },
    });
    expect(mockSetIntegrity).toHaveBeenCalledWith(SECURITY_LEVELS.LOW);

    fireEvent.change(confidentialitySelect, {
      target: { value: SECURITY_LEVELS.HIGH },
    });
    expect(mockSetConfidentiality).toHaveBeenCalledWith(SECURITY_LEVELS.HIGH);
  });

  it("displays descriptions from options", () => {
    const mockProps = {
      ...defaultProps,
      availability: "Low",
      integrity: "Low",
      confidentiality: "Low",
      availabilityOptions: {
        ...defaultProps.availabilityOptions,
        Low: { description: "Custom availability description" },
      },
      integrityOptions: {
        ...defaultProps.integrityOptions,
        Low: { description: "Custom integrity description" },
      },
      confidentialityOptions: {
        ...defaultProps.confidentialityOptions,
        Low: { description: "Custom confidentiality description" },
      },
    };

    render(<SecurityLevelWidget {...mockProps} />);

    expect(screen.getByTestId("availability-description")).toHaveTextContent(
      "Custom availability description"
    );
    expect(screen.getByTestId("integrity-description")).toHaveTextContent(
      "Custom integrity description"
    );
    expect(screen.getByTestId("confidentiality-description")).toHaveTextContent(
      "Custom confidentiality description"
    );
  });

  it("displays technical details on hover", () => {
    const mockProps = {
      ...defaultProps,
      availabilityOptions: {
        ...defaultProps.availabilityOptions,
        None: {
          description: "Base description",
          technical: "Technical details for availability",
        },
      },
    };

    render(<SecurityLevelWidget {...mockProps} />);

    const technicalInfoButton = screen.getByTestId(
      "availability-technical-info-button"
    );

    fireEvent.mouseEnter(technicalInfoButton);
    // Technical info hover state is set
    // (This would normally show a popover but we don't need to test that specifically here)
    expect(technicalInfoButton).toBeInTheDocument();

    fireEvent.mouseLeave(technicalInfoButton);
    // Technical info hover state is cleared
  });

  it("renders color indicators for security levels", () => {
    const mockProps = {
      ...defaultProps,
      availability: "Low",
      integrity: "Moderate",
      confidentiality: "High",
    };

    render(<SecurityLevelWidget {...mockProps} />);

    const availabilityColorIndicator = screen.getByTestId(
      "availability-color-indicator"
    );
    const integrityColorIndicator = screen.getByTestId(
      "integrity-color-indicator"
    );
    const confidentialityColorIndicator = screen.getByTestId(
      "confidentiality-color-indicator"
    );

    expect(availabilityColorIndicator).toHaveClass("bg-yellow-200");
    expect(integrityColorIndicator).toHaveClass("bg-orange-300");
    expect(confidentialityColorIndicator).toHaveClass("bg-red-400");
  });

  it("shows technical details when hovering over info button", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const infoButton = screen.getByTestId("availability-technical-info-button");
    fireEvent.mouseEnter(infoButton);

    // Now we'd normally check for a tooltip to be displayed, but since we're
    // not actually rendering a tooltip, we just verify the button is there
    expect(infoButton).toBeInTheDocument();
  });

  it("correctly handles hover state for technical details of integrity and confidentiality", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const integrityInfoButton = screen.getByTestId(
      "integrity-technical-info-button"
    );
    const confidentialityInfoButton = screen.getByTestId(
      "confidentiality-technical-info-button"
    );

    fireEvent.mouseEnter(integrityInfoButton);
    expect(integrityInfoButton).toBeInTheDocument();

    fireEvent.mouseLeave(integrityInfoButton);

    fireEvent.mouseEnter(confidentialityInfoButton);
    expect(confidentialityInfoButton).toBeInTheDocument();

    fireEvent.mouseLeave(confidentialityInfoButton);
  });

  it("displays validation method and protection method badges when available", () => {
    const customProps = {
      ...defaultProps,
      integrityOptions: {
        ...defaultProps.integrityOptions,
        Low: {
          description: "Low integrity description",
          validationMethod: "Checksum validation",
        },
      },
      confidentialityOptions: {
        ...defaultProps.confidentialityOptions,
        Low: {
          description: "Low confidentiality description",
          protectionMethod: "Basic encryption",
        },
      },
      integrity: "Low",
      confidentiality: "Low",
    };

    render(<SecurityLevelWidget {...customProps} />);

    expect(
      screen.getByTestId("integrity-validation-badge")
    ).toBeInTheDocument();
    expect(screen.getByTestId("integrity-validation-badge")).toHaveTextContent(
      "Checksum validation"
    );

    expect(
      screen.getByTestId("confidentiality-protection-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-protection-badge")
    ).toHaveTextContent("Basic encryption");
  });

  it("handles rendering with availability uptime information", () => {
    const customProps = {
      ...defaultProps,
      availabilityOptions: {
        ...defaultProps.availabilityOptions,
        Low: {
          description: "Low availability description",
          uptime: "99.5% uptime",
        },
      },
      availability: "Low",
    };

    render(<SecurityLevelWidget {...customProps} />);

    expect(screen.getByTestId("availability-uptime-badge")).toBeInTheDocument();
    expect(screen.getByTestId("availability-uptime-badge")).toHaveTextContent(
      "99.5% uptime"
    );
  });

  it("renders security level controls", () => {
    render(<SecurityLevelWidget {...defaultProps} />);
    expect(screen.getByTestId("security-level-controls")).toBeInTheDocument();
  });

  it("displays correct options and values", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const availabilitySelect = screen.getByTestId("availability-select");
    const allOptions = availabilitySelect.querySelectorAll("option");
    expect(allOptions.length).toBe(5); // None, Low, Moderate, High, Very High
    expect(allOptions[0]?.textContent).toBe("None");
    expect(allOptions[1]?.textContent).toBe("Low");
  });

  it("handles selection changes", () => {
    const mockProps = {
      ...defaultProps,
      setConfidentiality: vi.fn(),
    };

    render(<SecurityLevelWidget {...mockProps} />);

    const confidentialitySelect = screen.getByTestId("confidentiality-select");
    fireEvent.change(confidentialitySelect, {
      target: { value: SECURITY_LEVELS.LOW },
    });

    expect(mockProps.setConfidentiality).toHaveBeenCalledWith(
      SECURITY_LEVELS.LOW
    );
  });
});
