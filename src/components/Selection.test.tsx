import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Selection from "./Selection";

describe("Selection", () => {
  const mockOptions = {
    None: { description: "No req" },
    Low: { description: "Low req" },
    "Very High": { description: "Very high req" },
  };

  it("renders correctly with options", () => {
    render(
      <Selection
        label="Test Label"
        options={mockOptions}
        value="None"
        onChange={jest.fn()}
        id="test"
        data-testid="test-select"
      />
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByTestId("test-select")).toHaveValue("None");

    // Check for options by partial match to account for icons
    expect(screen.getByRole("option", { name: /^None/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /^Low/ })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /^Very High/ })
    ).toBeInTheDocument();
  });

  it("calls onChange handler when selection changes", () => {
    const mockOnChange = jest.fn();
    render(
      <Selection
        label="Test Label"
        options={mockOptions}
        value="None"
        onChange={mockOnChange}
        id="test"
        data-testid="test-select"
      />
    );

    fireEvent.change(screen.getByTestId("test-select"), {
      target: { value: "Low" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("Low");
  });

  it("shows security icons on options", () => {
    render(
      <Selection
        label="Test Label"
        options={mockOptions}
        value="None"
        onChange={jest.fn()}
        id="test"
      />
    );

    // Use regex to find an option containing "Very High" followed by any characters
    const veryHighOption = screen.getByRole("option", { name: /Very High/ });
    expect(veryHighOption).toBeInTheDocument();
    expect(veryHighOption.textContent).toContain("🔒");
  });
});
