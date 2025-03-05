import React from "react";
import { render, screen } from "@testing-library/react";
import KeyValuePair from "./KeyValuePair";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("KeyValuePair", () => {
  it("renders with custom testId", () => {
    const customTestId = "custom-key-value";
    render(<KeyValuePair label="Test" value="Value" testId={customTestId} />);

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-label`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-value`)).toBeInTheDocument();
  });

  it("renders with default testId", () => {
    render(<KeyValuePair label="Test" value="Value" />);

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_LABEL)
    ).toHaveTextContent("Test");
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_VALUE)
    ).toHaveTextContent("Value");
  });

  it("renders with highlighted prop", () => {
    const testId = "highlighted-test";
    render(
      <KeyValuePair label="Test" value="Value" highlighted testId={testId} />
    );

    const highlightedElement = screen.getByTestId(testId);
    expect(highlightedElement).toHaveClass("bg-gray-50");
    expect(highlightedElement).toHaveClass("dark:bg-gray-700");
  });

  it("renders with justified prop", () => {
    render(
      <KeyValuePair label="Test" value="Value" justified testId="test-kv" />
    );

    const highlightedElement = screen.getByTestId("test-kv");
    expect(highlightedElement).toHaveClass("justify-between");
  });

  it("renders with neither highlighted nor justified props", () => {
    render(
      <KeyValuePair
        label="Test"
        value="Value"
        highlighted={false}
        justified={false}
        testId="test-kv"
      />
    );

    const nonHighlightedElement = screen.getByTestId("test-kv");
    expect(nonHighlightedElement).not.toHaveClass("bg-gray-50");
    expect(nonHighlightedElement).not.toHaveClass("justify-between");
  });
});
