import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WidgetContainer from "./WidgetContainer";
import { createDynamicTestId } from "../../constants/testIds";

describe("WidgetContainer", () => {
  it("renders with title and children", () => {
    const testTitle = "Test Widget";
    const testContent = "Widget content";

    render(
      <WidgetContainer title={testTitle}>
        <div>{testContent}</div>
      </WidgetContainer>
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();

    // Check if the children are rendered
    const contentElement = screen.getByText(testContent);
    expect(contentElement).toBeInTheDocument();
  });

  it("renders with custom testId", () => {
    const testId = "custom-widget";
    render(
      <WidgetContainer title="Test" testId={testId}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <WidgetContainer title="Test" className="custom-class">
        <div>Content</div>
      </WidgetContainer>
    );

    const container = screen.getByRole("region");
    expect(container).toHaveClass("custom-class");
  });

  it("renders with subtitle", () => {
    const testTitle = "Test Widget";
    const testSubtitle = "This is a subtitle";

    render(
      <WidgetContainer title={testTitle} subtitle={testSubtitle}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText(testSubtitle)).toBeInTheDocument();
  });

  it("renders with actions", () => {
    const actionText = "Action Button";
    render(
      <WidgetContainer title="Test" actions={<button>{actionText}</button>}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText(actionText)).toBeInTheDocument();
  });
});
