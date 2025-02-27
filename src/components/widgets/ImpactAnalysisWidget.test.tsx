import React from "react";
import { render, screen } from "@testing-library/react";
import ImpactAnalysisWidget from "./ImpactAnalysisWidget";

describe("ImpactAnalysisWidget", () => {
  it("renders Availability impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Availability" level="None" />
    );
    expect(screen.getByText(/No availability controls/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Basic" />);
    expect(screen.getByText(/Frequent outages/)).toBeInTheDocument();
    expect(screen.getByText(/up to 5% downtime/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Moderate" />);
    expect(screen.getByText(/Improved uptime/)).toBeInTheDocument();
    expect(screen.getByText(/99% availability/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="High" />);
    expect(screen.getByText(/Near-continuous service/)).toBeInTheDocument();
    expect(screen.getByText(/99.9% uptime/)).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Availability" level="Very High" />
    );
    expect(screen.getByText(/Continuous operation/)).toBeInTheDocument();
    expect(screen.getByText(/99.99% uptime/)).toBeInTheDocument();
  });

  it("renders Integrity impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Integrity" level="None" />
    );
    expect(screen.getByText(/No data integrity controls/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Basic" />);
    expect(screen.getByText(/Risk of data corruption/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Moderate" />);
    expect(screen.getByText(/Automated validation/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="High" />);
    expect(screen.getByText(/Immutable records/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Very High" />);
    expect(
      screen.getByText(/Advanced cryptographic validation/)
    ).toBeInTheDocument();
  });

  it("renders Confidentiality impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Confidentiality" level="None" />
    );
    expect(screen.getByText(/No confidentiality controls/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="Basic" />);
    expect(screen.getByText(/Limited protection/)).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Moderate" />
    );
    expect(screen.getByText(/Standard encryption/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="High" />);
    expect(screen.getByText(/Robust protection/)).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Very High" />
    );
    expect(screen.getByText(/Military-grade protection/)).toBeInTheDocument();
  });

  it("displays appropriate icon for each category", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Availability" level="Basic" />
    );
    expect(screen.getByText("🕒")).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Basic" />);
    expect(screen.getByText("🛡️")).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="Basic" />);
    expect(screen.getByText("🔐")).toBeInTheDocument();
  });

  it("applies appropriate color styles for each category", () => {
    render(<ImpactAnalysisWidget category="Availability" level="Basic" />);

    const availabilityContainer = screen
      .getByText(/Frequent outages/)
      .closest("div");
    expect(availabilityContainer).toHaveClass("bg-blue-50");
  });

  it("falls back to None level when invalid level is provided", () => {
    render(<ImpactAnalysisWidget category="Availability" level="Invalid" />);

    expect(screen.getByText(/No availability controls/)).toBeInTheDocument();
  });
});
