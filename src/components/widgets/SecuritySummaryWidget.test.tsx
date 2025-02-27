import React from "react";
import { render, screen } from "@testing-library/react";
import SecuritySummaryWidget from "./SecuritySummaryWidget";

describe("SecuritySummaryWidget", () => {
  it("renders None level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="None" />);

    expect(screen.getByText("No Security")).toBeInTheDocument();
    expect(
      screen.getByText(/No security controls implemented/)
    ).toBeInTheDocument();
  });

  it("renders Low level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Low" />);

    expect(screen.getByText("Low Security")).toBeInTheDocument();
    expect(
      screen.getByText(/Basic protection with minimal controls/)
    ).toBeInTheDocument();
  });

  it("renders Moderate level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Moderate" />);

    expect(screen.getByText("Moderate Security")).toBeInTheDocument();
    expect(
      screen.getByText(/Balanced protection with automated recovery/)
    ).toBeInTheDocument();
  });

  it("renders High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="High" />);

    expect(screen.getByText("High Security")).toBeInTheDocument();
    expect(screen.getByText(/Robust protection/)).toBeInTheDocument();
  });

  it("renders Very High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Very High" />);

    expect(screen.getByText("Very High Security")).toBeInTheDocument();
    expect(screen.getByText(/Maximum protection/)).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(<SecuritySummaryWidget securityLevel="Low" />);
    expect(screen.getByText("🔓")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="Moderate" />);
    expect(screen.getByText("🔐")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="High" />);
    expect(screen.getByText("🛡️")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="Very High" />);
    expect(screen.getByText("🔒")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="None" />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("falls back to None when invalid security level is provided", () => {
    render(<SecuritySummaryWidget securityLevel="Invalid" />);

    expect(screen.getByText("No Security")).toBeInTheDocument();
    expect(
      screen.getByText(/No security controls implemented/)
    ).toBeInTheDocument();
  });
});
