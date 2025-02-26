import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Selection from "./Selection";
import { vi } from "vitest";
import { availabilityOptions } from "../hooks/useCIAOptions";

describe("Selection Component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

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

  afterEach(() => {
    vi.clearAllMocks();
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

  // Add this test to cover options branch
  it("handles options with no corresponding security icons", () => {
    // Create custom options with a key not in the security icons mapping
    const customOptions = {
      "Custom Level": {
        description: "Custom description",
        impact: "Custom impact",
        technical: "Custom technical",
        capex: 10,
        opex: 5,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Custom recommendation"],
      },
      ...availabilityOptions,
    };

    // Re-render with custom options
    cleanup();
    render(
      <Selection
        label="Custom Selection"
        options={customOptions}
        value="Custom Level"
        onChange={vi.fn()}
        id="custom"
        data-testid="custom-select"
      />
    );

    // The option should render without the icon prefix
    const option = screen.getByRole("option", { name: /Custom Level/ });
    expect(option).toBeInTheDocument();
    expect(option).toHaveValue("Custom Level");
    expect(option.textContent).toBe("Custom Level");
  });
});
