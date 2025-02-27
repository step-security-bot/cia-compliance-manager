import React from "react";
import { render, screen } from "@testing-library/react";
import CostEstimationWidget from "./CostEstimationWidget";

describe("CostEstimationWidget", () => {
  const mockPropsSmall = {
    totalCapex: 15,
    totalOpex: 25,
    capexEstimate: "$10,000",
    opexEstimate: "$500",
    isSmallSolution: true,
  };

  const mockPropsLarge = {
    totalCapex: 75,
    totalOpex: 120,
    capexEstimate: "$1,000,000",
    opexEstimate: "$50,000",
    isSmallSolution: false,
  };

  it("renders CAPEX and OPEX labels", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText("CAPEX:")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("15"))
    ).toBeInTheDocument();
    expect(screen.getByText("OPEX:")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("25"))
    ).toBeInTheDocument();
  });

  it("renders cost estimates", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("displays correct message for small solutions", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    // Look for the actual text in the component
    expect(
      screen.getByText(/Basic security implementation with minimal investment/)
    ).toBeInTheDocument();
  });

  it("displays correct message for large solutions", () => {
    render(<CostEstimationWidget {...mockPropsLarge} />);

    expect(
      screen.getByText(
        /Comprehensive security solution requiring significant investment/
      )
    ).toBeInTheDocument();
  });

  it("updates correctly when props change", () => {
    const { rerender } = render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(
      screen.getByText((content) => content.includes("15"))
    ).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();

    rerender(<CostEstimationWidget {...mockPropsLarge} />);

    expect(
      screen.getByText((content) => content.includes("75"))
    ).toBeInTheDocument();
    expect(screen.getByText("$1,000,000")).toBeInTheDocument();
  });
});
