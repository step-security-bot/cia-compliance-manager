import React from "react";
import { render, screen } from "@testing-library/react";
import SecuritySummaryWidget from "./SecuritySummaryWidget";
import {
  SECURITY_SUMMARY_TITLES,
  UI_ICONS,
  SECURITY_DESCRIPTIONS,
  TEST_MATCHERS,
} from "../../constants/appConstants";

describe("SecuritySummaryWidget", () => {
  it("renders None level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="None" />);

    // Use a custom matcher that can handle the title format
    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.NONE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    // Use test matcher for description
    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Low level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Low" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.LOW)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_LOW_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Moderate level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Moderate" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.MODERATE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_MODERATE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="High" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Very High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Very High" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.VERY_HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_VERY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(<SecuritySummaryWidget securityLevel="Low" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_LOW
    );

    rerender(<SecuritySummaryWidget securityLevel="Moderate" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_MODERATE
    );

    rerender(<SecuritySummaryWidget securityLevel="High" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_HIGH
    );

    rerender(<SecuritySummaryWidget securityLevel="Very High" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_VERY_HIGH
    );

    rerender(<SecuritySummaryWidget securityLevel="None" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_NONE
    );
  });

  it("falls back to None when invalid security level is provided", () => {
    render(<SecuritySummaryWidget securityLevel="Invalid" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.NONE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });
});
