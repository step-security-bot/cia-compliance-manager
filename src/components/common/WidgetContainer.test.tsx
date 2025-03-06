import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WidgetContainer from "./WidgetContainer";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

describe("WidgetContainer Component", () => {
  const defaultProps = {
    title: "Test Widget",
    children: <div>Widget Content</div>,
  };

  it("renders with title and content", () => {
    const customTestId = "test-widget-container";
    render(<WidgetContainer {...defaultProps} testId={customTestId} />);

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText("Widget Content")).toBeInTheDocument();
  });

  it("renders with loading state", () => {
    render(
      <WidgetContainer {...defaultProps}>
        <div data-testid={WIDGET_TEST_IDS.LOADING_INDICATOR}>Loading...</div>
      </WidgetContainer>
    );

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.LOADING_INDICATOR)
    ).toBeInTheDocument();
  });

  it("renders with error state", () => {
    const errorMessage = "Test error message";
    render(
      <WidgetContainer {...defaultProps}>
        <div role="alert">{errorMessage}</div>
      </WidgetContainer>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders with custom header content", () => {
    const customProps = {
      ...defaultProps,
      header: <button>Custom Action</button>,
    };

    render(<WidgetContainer {...customProps} />);

    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("renders content title when provided", () => {
    const contentTitle = "Content Section";
    render(
      <WidgetContainer {...defaultProps}>
        <h3 data-testid={WIDGET_TEST_IDS.CONTENT_TITLE}>{contentTitle}</h3>
        <div>Widget Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(WIDGET_TEST_IDS.CONTENT_TITLE)).toHaveTextContent(
      contentTitle
    );
  });
});
