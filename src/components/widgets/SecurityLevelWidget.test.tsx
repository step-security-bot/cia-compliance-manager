import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  CIA_DESCRIPTIONS,
} from "../../constants/appConstants";
import { CIA_TEST_IDS } from "../../constants/testIds";

// Mock the SecurityLevelSelector component that's used internally
vi.mock("../SecurityLevelSelector", () => ({
  default: ({
    initialAvailability,
    initialIntegrity,
    initialConfidentiality,
    onAvailabilityChange,
    onIntegrityChange,
    onConfidentialityChange,
    testId,
  }: {
    initialAvailability: string;
    initialIntegrity: string;
    initialConfidentiality: string;
    onAvailabilityChange?: (value: string) => void;
    onIntegrityChange?: (value: string) => void;
    onConfidentialityChange?: (value: string) => void;
    testId?: string;
  }) => (
    <div data-testid={testId || "security-level-selector"}>
      <div>
        <label htmlFor="availabilitySelect">Availability</label>
        <select
          data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
          value={initialAvailability}
          onChange={(e) =>
            onAvailabilityChange && onAvailabilityChange(e.target.value)
          }
        >
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
        <div data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}>
          Availability Description
        </div>
      </div>
      <div>
        <label htmlFor="integritySelect">Integrity</label>
        <select
          data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          value={initialIntegrity}
          onChange={(e) =>
            onIntegrityChange && onIntegrityChange(e.target.value)
          }
        >
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
        <div data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}>
          Integrity Description
        </div>
      </div>
      <div>
        <label htmlFor="confidentialitySelect">Confidentiality</label>
        <select
          data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          value={initialConfidentiality}
          onChange={(e) =>
            onConfidentialityChange && onConfidentialityChange(e.target.value)
          }
        >
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
        <div data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}>
          Confidentiality Description
        </div>
      </div>
      <button data-testid={CIA_TEST_IDS.AVAILABILITY_TECHNICAL_INFO_BUTTON}>
        Info
      </button>
      <button data-testid={CIA_TEST_IDS.INTEGRITY_TECHNICAL_INFO_BUTTON}>
        Info
      </button>
      <button data-testid={CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON}>
        Info
      </button>
    </div>
  ),
}));

describe("SecurityLevelWidget", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all security level components", () => {
    render(
      <SecurityLevelWidget
        availability="None"
        integrity="None"
        confidentiality="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    expect(
      screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)
    ).toBeInTheDocument();
  });

  it("selects have default values", () => {
    render(
      <SecurityLevelWidget
        availability="Low"
        integrity="Moderate"
        confidentiality="High"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "Low"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "Moderate"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "High"
    );
  });

  it("handles selection changes", () => {
    render(
      <SecurityLevelWidget
        availability="None"
        integrity="None"
        confidentiality="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: SECURITY_LEVELS.HIGH },
    });
    expect(mockSetConfidentiality).toHaveBeenCalledWith(SECURITY_LEVELS.HIGH);
  });

  // Remaining tests still work with our mock

  it("displays correct options and values", () => {
    render(
      <SecurityLevelWidget
        availability="None"
        integrity="None"
        confidentiality="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    const availabilitySelect = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SELECT
    );
    const allOptions = availabilitySelect.querySelectorAll("option");
    expect(allOptions.length).toBe(5); // None, Low, Moderate, High, Very High
    expect(allOptions[0]?.textContent).toBe("None");
    expect(allOptions[1]?.textContent).toBe("Low");
  });

  // ... other tests ...
});
