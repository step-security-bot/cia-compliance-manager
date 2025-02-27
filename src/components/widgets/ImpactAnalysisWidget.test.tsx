import React from "react";
import { render, screen } from "@testing-library/react";
import ImpactAnalysisWidget from "./ImpactAnalysisWidget";

describe("ImpactAnalysisWidget", () => {
  it("renders Availability impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Availability" level="None" />
    );
    expect(screen.getByText(/No availability guarantees/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Low" />);
    expect(screen.getByText(/95% uptime/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="Moderate" />);
    expect(screen.getByText(/99% uptime/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Availability" level="High" />);
    expect(screen.getByText(/99.9% uptime/)).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Availability" level="Very High" />
    );
    expect(screen.getByText(/99.99% uptime/)).toBeInTheDocument();
  });

  it("renders Integrity impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Integrity" level="None" />
    );
    expect(screen.getByText(/No data integrity controls/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Low" />);
    expect(screen.getByText(/Basic data checks/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Moderate" />);
    expect(screen.getByText(/Automated validation/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="High" />);
    expect(screen.getByText(/Immutable data records/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Integrity" level="Very High" />);
    expect(screen.getByText(/Complete data accuracy/)).toBeInTheDocument();
  });

  it("renders Confidentiality impacts correctly", () => {
    const { rerender } = render(
      <ImpactAnalysisWidget category="Confidentiality" level="None" />
    );
    expect(screen.getByText(/No confidentiality controls/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="Low" />);

    // Use getAllByText and check the first element instead
    const protectionElements = screen.getAllByText((content, element) => {
      return (
        content.includes("Minimal protection") &&
        element?.tagName.toLowerCase() === "p"
      );
    });

    // Verify we found at least one element
    expect(protectionElements.length).toBeGreaterThan(0);

    // And check that one has the description we're looking for
    const mainDescription = protectionElements.find((el) =>
      el.textContent.includes("suitable only for non-sensitive information")
    );
    expect(mainDescription).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Moderate" />
    );
    expect(screen.getByText(/Standard protection/)).toBeInTheDocument();

    rerender(<ImpactAnalysisWidget category="Confidentiality" level="High" />);
    expect(screen.getByText(/Strong protection/)).toBeInTheDocument();

    rerender(
      <ImpactAnalysisWidget category="Confidentiality" level="Very High" />
    );
    expect(screen.getByText(/Military-grade protection/)).toBeInTheDocument();
  });

  it("displays business impact for each level and category", () => {
    render(<ImpactAnalysisWidget category="Availability" level="High" />);

    // Check for business impact section
    expect(screen.getByText("Business Impact:")).toBeInTheDocument();
    expect(
      screen.getByText(/Maintains customer satisfaction/)
    ).toBeInTheDocument();
  });

  it("falls back to None level when invalid level is provided", () => {
    render(<ImpactAnalysisWidget category="Availability" level="Invalid" />);
    expect(screen.getByText(/No availability guarantees/)).toBeInTheDocument();
  });
});
