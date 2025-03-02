import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Selection from "./Selection";
import { vi } from "vitest";

describe("Selection Component", () => {
  const mockOptions = {
    None: { description: "No security" },
    Low: { description: "Low security" },
    Moderate: { description: "Moderate security" },
    High: { description: "High security" },
  };

  const defaultProps = {
    id: "availability-select",
    label: "Availability",
    value: "None",
    options: mockOptions,
    onChange: vi.fn(),
    "data-testid": "availability-select",
  };

  beforeEach(() => {
    // Ensure cleanup before each test
    vi.clearAllMocks();
  });

  it("renders with correct label", () => {
    render(<Selection {...defaultProps} />);
    expect(screen.getByTestId("availability-select")).toBeInTheDocument();
  });

  it("contains all option values", () => {
    render(<Selection {...defaultProps} />);
    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(Object.keys(mockOptions).length);
  });

  it("handles changes correctly", () => {
    render(<Selection {...defaultProps} />);
    fireEvent.change(screen.getByTestId("availability-select"), {
      target: { value: "Moderate" },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith("Moderate");
  });

  it("handles options with no corresponding security icons", () => {
    const customProps = {
      ...defaultProps,
      value: "Custom",
      options: {
        ...mockOptions,
        Custom: { description: "Custom level" },
      },
    };
    render(<Selection {...customProps} />);
    // If no icon is found, it should use a default lock icon
    const select = screen.getByTestId("availability-select");
    expect(select).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("maintains label-input association", () => {
      render(<Selection {...defaultProps} />);
      const select = screen.getByTestId("availability-select");
      expect(select).toHaveAttribute("id", "availability-select");
    });

    // Update this test to match the new behavior that only adds aria-label if label exists
    it("has proper ARIA attributes", () => {
      // Use unique testid for this test
      const testProps = {
        ...defaultProps,
        "data-testid": "aria-test-select",
      };

      const { rerender } = render(<Selection {...testProps} />);
      const select = screen.getByTestId("aria-test-select");
      expect(select).toHaveAttribute("id");
      expect(select).toHaveAttribute("aria-label", "Availability Level");

      // Test with empty label (should not have aria-label)
      rerender(<Selection {...testProps} label="" />);
      const selectWithoutLabel = screen.getByTestId("aria-test-select");
      expect(selectWithoutLabel).not.toHaveAttribute("aria-label");
    });
  });

  describe("Option Handling", () => {
    it("displays correct number of options", () => {
      render(<Selection {...defaultProps} />);
      const optionElements = screen.getAllByRole("option");
      expect(optionElements).toHaveLength(Object.keys(mockOptions).length);
    });

    it("maintains option order", () => {
      render(<Selection {...defaultProps} />);
      const optionElements = screen.getAllByRole("option");
      const optionsArray = Object.keys(mockOptions);

      optionElements.forEach((element, index) => {
        expect(element.textContent).toBe(optionsArray[index]);
      });
    });
  });
});
