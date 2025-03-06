import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import KeyValuePair from "./KeyValuePair";

describe("KeyValuePair", () => {
  it("renders label and value", () => {
    render(<KeyValuePair label="Test Label" value="Test Value" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders with custom testId", () => {
    const testId = "test-key-value";
    render(
      <KeyValuePair label="Test Label" value="Test Value" testId={testId} />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-label`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-value`)).toBeInTheDocument();
  });

  it("applies highlighted styling when highlighted prop is true", () => {
    const testId = "test-highlight";
    render(
      <KeyValuePair label="Test" value="Value" highlighted testId={testId} />
    );

    const valueElement = screen.getByTestId(`${testId}-value`);
    expect(valueElement).toHaveClass("font-bold");
    expect(valueElement).toHaveClass("text-blue-600");
  });

  it("applies justified styling when justified prop is true", () => {
    const testId = "test-kv";
    render(
      <KeyValuePair label="Test" value="Value" justified testId="test-kv" />
    );

    const labelElement = screen.getByTestId(`${testId}-label`);
    const valueElement = screen.getByTestId(`${testId}-value`);

    expect(labelElement).toHaveClass("text-right");
    expect(valueElement).toHaveClass("text-right");
  });

  it("applies custom label and value classes", () => {
    const testId = "custom-classes";
    render(
      <KeyValuePair
        label="Test"
        value="Value"
        labelClassName="label-class"
        valueClassName="value-class"
        highlighted={false}
        justified={false}
        testId={testId}
      />
    );

    expect(screen.getByTestId(`${testId}-label`)).toHaveClass("label-class");
    expect(screen.getByTestId(`${testId}-value`)).toHaveClass("value-class");
  });

  it("renders ReactNode values", () => {
    render(
      <KeyValuePair
        label="Complex"
        value={<span data-testid="complex-value-content">Complex Value</span>}
        testId="complex"
      />
    );

    // Use a more specific testId that won't conflict
    expect(screen.getByTestId("complex-value-content")).toBeInTheDocument();
    expect(screen.getByTestId("complex-value-content")).toHaveTextContent(
      "Complex Value"
    );
  });
});
