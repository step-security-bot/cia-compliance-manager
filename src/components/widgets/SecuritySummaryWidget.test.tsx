import React from "react";
import { render, screen } from "@testing-library/react";
import SecuritySummaryWidget from "./SecuritySummaryWidget";

describe("SecuritySummaryWidget", () => {
  it("renders None level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="None" />);

    expect(screen.getByText("No Security Controls")).toBeInTheDocument();
    expect(
      screen.getByText("No specific security controls implemented.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Not recommended for production systems")
    ).toBeInTheDocument();
  });

  it("renders Basic level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Basic" />);

    expect(screen.getByText("Basic Security")).toBeInTheDocument();
    expect(
      screen.getByText(/Minimal investment, low protection/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Non-critical or public-facing systems")
    ).toBeInTheDocument();
    expect(screen.getByText(/Up to 5% downtime annually/)).toBeInTheDocument();
  });

  it("renders Moderate level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Moderate" />);

    expect(screen.getByText("Moderate Security")).toBeInTheDocument();
    expect(
      screen.getByText(/Balanced approach to cost and protection/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Standard business operations/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Around 99% uptime/)).toBeInTheDocument();
  });

  it("renders High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="High" />);

    expect(screen.getByText("High Security")).toBeInTheDocument();
    expect(screen.getByText(/Enhanced protection/)).toBeInTheDocument();
    expect(
      screen.getByText(/Regulated industries like finance/)
    ).toBeInTheDocument();
    expect(screen.getByText(/99.9% uptime/)).toBeInTheDocument();
  });

  it("renders Very High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Very High" />);

    expect(screen.getByText("Very High Security")).toBeInTheDocument();
    expect(screen.getByText(/Maximum protection/)).toBeInTheDocument();
    expect(screen.getByText(/Defense, financial markets/)).toBeInTheDocument();
    expect(screen.getByText(/99.99% uptime/)).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(
      <SecuritySummaryWidget securityLevel="Basic" />
    );
    expect(screen.getByText("ℹ️")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="Moderate" />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="High" />);
    expect(screen.getByText("🔐")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="Very High" />);
    expect(screen.getByText("🔒")).toBeInTheDocument();

    rerender(<SecuritySummaryWidget securityLevel="None" />);
    expect(screen.getByText("📋")).toBeInTheDocument();
  });

  it("falls back to None when invalid security level is provided", () => {
    render(<SecuritySummaryWidget securityLevel="Invalid" />);

    expect(screen.getByText("No Security Controls")).toBeInTheDocument();
  });
});
