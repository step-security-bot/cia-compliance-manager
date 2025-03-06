import React from "react";
import { render, screen } from "@testing-library/react";
import ValueDisplay from "./ValueDisplay";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("ValueDisplay", () => {
  it("renders with default styling", () => {
    render(<ValueDisplay value="Test Value" />);

    const display = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY);
    expect(display).toBeInTheDocument();
    expect(display).toHaveTextContent("Test Value");

    const value = screen.getByText("Test Value");
    expect(value).toBeInTheDocument();
  });

  it("renders with primary variant", () => {
    render(<ValueDisplay value="Primary" variant="primary" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("text-blue-700");
    expect(element).toHaveClass("bg-blue-100");
  });

  it("renders with success variant", () => {
    render(<ValueDisplay value="Success" variant="success" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("text-green-700");
    expect(element).toHaveClass("bg-green-100");
  });

  it("renders with warning variant", () => {
    render(<ValueDisplay value="Warning" variant="warning" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("text-yellow-700");
    expect(element).toHaveClass("bg-yellow-100");
  });

  it("renders with danger variant", () => {
    render(<ValueDisplay value="Danger" variant="danger" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("text-red-700");
    expect(element).toHaveClass("bg-red-100");
  });

  it("renders with info variant", () => {
    render(<ValueDisplay value="Info" variant="info" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("text-blue-700");
    expect(element).toHaveClass("bg-blue-100");
  });

  it("renders with small size", () => {
    render(<ValueDisplay value="Small" size="sm" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("py-0.5");
    expect(element).toHaveClass("px-2");
    expect(element).toHaveClass("text-xs");
  });

  it("renders with medium size", () => {
    render(<ValueDisplay value="Medium" size="md" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("py-1");
    expect(element).toHaveClass("px-2");
    expect(element).toHaveClass("text-sm");
  });

  it("renders with large size", () => {
    render(<ValueDisplay value="Large" size="lg" />);

    const element = screen.getByTestId(
      `${COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY}-value`
    );
    expect(element).toHaveClass("py-1");
    expect(element).toHaveClass("px-2.5");
    expect(element).toHaveClass("text-base");
  });

  it("renders with custom testId", () => {
    render(<ValueDisplay value="Custom ID" testId="custom-value" />);

    expect(screen.getByTestId("custom-value")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(<ValueDisplay value="Labeled" label="Label" />);

    const display = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY);
    expect(display.textContent).toMatch(/Label/);
    expect(display.textContent).toMatch(/Labeled/);
  });
});
