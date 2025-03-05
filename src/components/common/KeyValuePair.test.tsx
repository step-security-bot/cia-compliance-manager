import React from "react";
import { render, screen } from "@testing-library/react";
import KeyValuePair from "./KeyValuePair";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("KeyValuePair Component", () => {
  it("renders basic key-value pair correctly", () => {
    const customTestId = "custom-kv";
    render(<KeyValuePair label="Test" value="Value" testId={customTestId} />);

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-label`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-value`)).toBeInTheDocument();
  });

  it("renders with default test IDs when testId not provided", () => {
    render(<KeyValuePair label="Test" value="Value" />);

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_LABEL)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_VALUE)
    ).toBeInTheDocument();
  });

  it("applies highlight styling when highlighted", () => {
    const testId = "test-kv";
    render(
      <KeyValuePair
        label="Test"
        value="Value"
        highlighted={true}
        testId={testId}
      />
    );

    const highlightedElement = screen.getByTestId(testId);
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement.className).toContain("bg-blue-50");
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
    expect(highlightedElement.className).toContain("bg-blue-50");

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
    expect(nonHighlightedElement.className).not.toContain("bg-blue-50");
    expect(nonHighlightedElement.className).toContain("custom-class");
  });
});
