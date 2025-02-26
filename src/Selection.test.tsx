import React from "react";
import { render, screen, fireEvent } from "./utils/test-utils";
import "@testing-library/jest-dom";
import Selection from "./components/Selection";
import { availabilityOptions } from "./hooks/useCIAOptions";

describe("Selection Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <Selection
        label="Availability Level"
        options={availabilityOptions}
        value="None"
        onChange={mockOnChange}
        id="availability"
        data-testid="availability-select"
      />
    );
  });

  it("renders with correct label", () => {
    expect(screen.getByText("Availability Level")).toBeInTheDocument();
  });

  it("contains all option values", () => {
    const select = screen.getByTestId("availability-select");
    const options = Array.from(select.getElementsByTagName("option"));
    expect(options).toHaveLength(Object.keys(availabilityOptions).length);
    expect(options[0]).toHaveValue("None");
  });

  it("handles changes correctly", () => {
    fireEvent.change(screen.getByTestId("availability-select"), {
      target: { value: "High" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("High");
  });

  it("displays security icons for different levels", () => {
    // Check if all options with security levels have their corresponding icons
    const options = screen.getAllByRole("option");
    expect(options[1].textContent).toContain("ℹ️"); // Low
    expect(options[2].textContent).toContain("⚠️"); // Moderate
    expect(options[3].textContent).toContain("🔐"); // High
    expect(options[4].textContent).toContain("🔒"); // Very High
  });

  describe("Accessibility", () => {
    it("maintains label-input association", () => {
      const label = screen.getByText("Availability Level");
      const select = screen.getByTestId("availability-select");
      expect(label).toHaveAttribute("for", select.id);
    });

    it("has proper ARIA attributes", () => {
      const select = screen.getByTestId("availability-select");
      expect(select).toHaveAttribute("id");
      expect(select).toHaveAttribute("aria-label", "Availability Level");
    });
  });

  describe("Option Handling", () => {
    it("displays correct number of options", () => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(Object.keys(availabilityOptions).length);
    });

    it("maintains option order", () => {
      const options = screen.getAllByRole("option");
      const expectedOrder = ["None", "Low", "Moderate", "High", "Very High"];
      options.forEach((option, index) => {
        expect(option).toHaveValue(expectedOrder[index]);
      });
    });
  });

  describe("Event Handling", () => {
    it("calls onChange with correct value", () => {
      const select = screen.getByTestId("availability-select");
      fireEvent.change(select, { target: { value: "High" } });
      expect(mockOnChange).toHaveBeenCalledWith("High");
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
