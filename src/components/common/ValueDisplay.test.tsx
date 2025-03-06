import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueDisplay from "./ValueDisplay";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("ValueDisplay Component", () => {
  it("renders with value only", () => {
    render(<ValueDisplay value="Test Value" />);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`)
    ).toHaveTextContent("Test Value");
  });

  it("renders with label and value", () => {
    render(<ValueDisplay label="Test Label" value="Test Value" />);
    const component = screen.getByTestId(
      COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY
    );
    expect(component).toHaveTextContent("Test Label");
    expect(component).toHaveTextContent("Test Value");
  });

  it("renders with custom test ID", () => {
    const customTestId = "custom-value-display";
    render(<ValueDisplay value="Test Value" testId={customTestId} />);
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("applies variant styling", () => {
    render(<ValueDisplay value="Success" variant="success" />);
    const valueElement = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(valueElement.className).toContain("text-green");
  });

  it("applies size styling", () => {
    render(<ValueDisplay value="Large Text" size="lg" />);
    const valueElement = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(valueElement.className).toContain("text-lg");
  });
});
