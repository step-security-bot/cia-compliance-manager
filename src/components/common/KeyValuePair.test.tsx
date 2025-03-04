import React from "react";
import { render, screen } from "@testing-library/react";
import KeyValuePair from "./KeyValuePair";

describe("KeyValuePair component", () => {
  it("renders label and value correctly", () => {
    render(<KeyValuePair label="Test Label" value="Test Value" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("applies test ID correctly", () => {
    render(<KeyValuePair label="Test" value="Value" testId="custom-kv" />);

    expect(screen.getByTestId("custom-kv")).toBeInTheDocument();
    expect(screen.getByTestId("custom-kv-label")).toBeInTheDocument();
    expect(screen.getByTestId("custom-kv-value")).toBeInTheDocument();
  });

  it("handles various prop combinations for branch coverage", () => {
    // Test with highlighted=true
    const { rerender } = render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        highlighted={true}
        testId="test-kv"
      />
    );

    // Verify highlighted styling
    const highlightedElement = screen.getByTestId("test-kv");
    expect(highlightedElement.className).toContain("bg-gray-50");

    // Test with highlighted=false but with className
    rerender(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        highlighted={false}
        className="custom-class"
        testId="test-kv"
      />
    );

    // Verify no highlighted classes but has custom class
    const nonHighlightedElement = screen.getByTestId("test-kv");
    expect(nonHighlightedElement.className).not.toContain("bg-gray-50");
    expect(nonHighlightedElement.className).toContain("custom-class");

    // Test with both labelClassName and valueClassName
    rerender(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        labelClassName="test-label-class"
        valueClassName="test-value-class"
        testId="test-kv"
      />
    );

    // Verify classes applied to label and value
    expect(screen.getByTestId("test-kv-label").className).toContain(
      "test-label-class"
    );
    expect(screen.getByTestId("test-kv-value").className).toContain(
      "test-value-class"
    );
  });
});
