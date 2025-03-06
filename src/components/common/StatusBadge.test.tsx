import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusBadge from "./StatusBadge";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("StatusBadge Component", () => {
  it("renders with status text", () => {
    render(<StatusBadge status="info">Active</StatusBadge>);
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.STATUS_BADGE)
    ).toHaveTextContent("Active");
  });

  it("renders with custom test ID", () => {
    const customTestId = "custom-status-badge";
    render(
      <StatusBadge status="info" testId={customTestId}>
        Active
      </StatusBadge>
    );
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("applies variant styling", () => {
    render(<StatusBadge status="success">Success</StatusBadge>);
    const badge = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.STATUS_BADGE);
    expect(badge.className).toContain("bg-green");
  });

  it("applies size styling", () => {
    render(
      <StatusBadge status="info" size="lg">
        Large Badge
      </StatusBadge>
    );
    const badge = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.STATUS_BADGE);
    expect(badge.className).toContain("text-lg");
  });
});
