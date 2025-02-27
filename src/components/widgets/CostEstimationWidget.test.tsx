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

  it("renders CAPEX and OPEX percentages", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText("Total CAPEX")).toBeInTheDocument();
    expect(screen.getByText("15%")).toBeInTheDocument();

    expect(screen.getByText("Total OPEX")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("renders cost estimates", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText("Estimated CAPEX:")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();

    expect(screen.getByText("Estimated OPEX:")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("displays correct message for small solutions", () => {
    render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText(/Small solution estimation/)).toBeInTheDocument();
  });

  it("displays correct message for large solutions", () => {
    render(<CostEstimationWidget {...mockPropsLarge} />);

    expect(screen.getByText(/Enterprise-grade solution/)).toBeInTheDocument();
  });

  it("updates correctly when props change", () => {
    const { rerender } = render(<CostEstimationWidget {...mockPropsSmall} />);

    expect(screen.getByText("15%")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();

    rerender(<CostEstimationWidget {...mockPropsLarge} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("$1,000,000")).toBeInTheDocument();
    expect(screen.getByText(/Enterprise-grade solution/)).toBeInTheDocument();
  });
});
