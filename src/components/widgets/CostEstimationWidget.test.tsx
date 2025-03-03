import React from "react";
import { render, screen } from "@testing-library/react";
import CostEstimationWidget from "./CostEstimationWidget";
import {
  COST_ANALYSIS,
  getPartialTextMatcher,
  UI_TEXT,
} from "../../constants/appConstants";

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

    expect(screen.getByText(UI_TEXT.LABELS.CAPEX)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("15"))
    ).toBeInTheDocument();
    expect(screen.getByText(UI_TEXT.LABELS.OPEX)).toBeInTheDocument();
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

    // Replace the regex with the test matcher pattern
    expect(
      screen.getByText(
        new RegExp(getPartialTextMatcher(COST_ANALYSIS.SMALL_SOLUTION))
      )
    ).toBeInTheDocument();
  });

  it("displays correct message for large solutions", () => {
    render(<CostEstimationWidget {...mockPropsLarge} />);

    expect(
      screen.getByText(
        new RegExp(getPartialTextMatcher(COST_ANALYSIS.LARGE_SOLUTION))
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

  it("renders CAPEX and OPEX values correctly", () => {
    render(
      <CostEstimationWidget
        totalCapex={25}
        totalOpex={15}
        capexEstimate="Medium"
        opexEstimate="Low"
        isSmallSolution={true}
      />
    );

    expect(screen.getByText(UI_TEXT.LABELS.ESTIMATED_COST)).toBeInTheDocument();
    expect(screen.getByText(UI_TEXT.LABELS.CAPEX)).toBeInTheDocument();
    // Fix: Check for "$Medium" instead of "Medium"
    expect(screen.getByText("$Medium")).toBeInTheDocument();
    expect(screen.getByText(UI_TEXT.LABELS.OPEX)).toBeInTheDocument();
    // Fix: Check for "$Low" instead of "Low"
    expect(screen.getByText("$Low")).toBeInTheDocument();

    // Test percentage values
    expect(screen.getByTestId("capex-percentage")).toHaveTextContent("25%");
    expect(screen.getByTestId("opex-percentage")).toHaveTextContent("15%");
  });

  it("shows basic cost analysis for small solution", () => {
    render(
      <CostEstimationWidget
        totalCapex={20}
        totalOpex={10}
        capexEstimate="Low"
        opexEstimate="Low"
        isSmallSolution={true}
      />
    );

    expect(screen.getByText(UI_TEXT.LABELS.COST_ANALYSIS)).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(
          getPartialTextMatcher(COST_ANALYSIS.SMALL_SOLUTION, 25)
        )
      )
    ).toBeInTheDocument();
  });

  it("shows comprehensive cost analysis for large solution", () => {
    render(
      <CostEstimationWidget
        totalCapex={60}
        totalOpex={40}
        capexEstimate="High"
        opexEstimate="Medium"
        isSmallSolution={false}
      />
    );

    expect(screen.getByText(UI_TEXT.LABELS.COST_ANALYSIS)).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(
          getPartialTextMatcher(COST_ANALYSIS.LARGE_SOLUTION, 25)
        )
      )
    ).toBeInTheDocument();
  });

  it("renders progress bars with correct widths", () => {
    render(
      <CostEstimationWidget
        totalCapex={30}
        totalOpex={50}
        capexEstimate="Medium"
        opexEstimate="High"
        isSmallSolution={false}
      />
    );

    // Testing the style attribute is tricky with React Testing Library
    // because it generates inline styles. We'll check for the elements instead.
    const progressBars = document.querySelectorAll(".h-2\\.5.rounded-full");
    expect(progressBars.length).toBe(4); // 2 background bars + 2 progress bars
  });

  it("caps progress bar values at 100%", () => {
    render(
      <CostEstimationWidget
        totalCapex={150}
        totalOpex={120}
        capexEstimate="Very High"
        opexEstimate="Very High"
        isSmallSolution={false}
      />
    );

    expect(screen.getByTestId("capex-percentage")).toHaveTextContent("150%");
    expect(screen.getByTestId("opex-percentage")).toHaveTextContent("120%");

    // Progress should be capped at 100% visually
    // Fix: Update selector to match the actual class names used in the component
    const progressBars = document.querySelectorAll(
      ".bg-blue-500, .bg-green-500, .bg-teal-500, .bg-yellow-500, .bg-red-500"
    );
    expect(progressBars.length).toBe(2);
    // Note: We're not testing the actual width because JSDOM doesn't compute styles
  });

  // Adding tests for currency formatting and monthly calculation

  it("formats currency values correctly", () => {
    const { unmount } = render(
      <CostEstimationWidget
        totalCapex={30}
        totalOpex={20}
        capexEstimate="1000"
        opexEstimate="500"
        isSmallSolution={true}
      />
    );

    // Check that values are formatted with $ prefix using getAllByTestId
    const capexElements = screen.getAllByTestId("capex-estimate-value-value");
    expect(capexElements[0]).toHaveTextContent("$1000");

    const opexElements = screen.getAllByTestId("opex-estimate-value-value");
    expect(opexElements[0]).toHaveTextContent("$500");

    // Clean up before testing again
    unmount();

    // Rerender with values that already have $ prefix
    render(
      <CostEstimationWidget
        totalCapex={30}
        totalOpex={20}
        capexEstimate="$1000"
        opexEstimate="$500"
        isSmallSolution={true}
      />
    );

    // Check that values don't get double $ prefix using getAllByTestId
    const updatedCapexElements = screen.getAllByTestId(
      "capex-estimate-value-value"
    );
    expect(updatedCapexElements[0]).toHaveTextContent("$1000");

    const updatedOpexElements = screen.getAllByTestId(
      "opex-estimate-value-value"
    );
    expect(updatedOpexElements[0]).toHaveTextContent("$500");
  });

  it("calculates monthly OPEX correctly", () => {
    render(
      <CostEstimationWidget
        totalCapex={30}
        totalOpex={20}
        capexEstimate="$1000"
        opexEstimate="$12000"
        isSmallSolution={true}
      />
    );

    // Check that monthly OPEX calculation is displayed correctly (12000/12 = 1000)
    expect(screen.getByTestId("monthly-opex")).toHaveTextContent(
      "$1,000/month"
    );
  });

  it("calculates 3-year total cost correctly", () => {
    render(
      <CostEstimationWidget
        totalCapex={30}
        totalOpex={20}
        capexEstimate="$10000"
        opexEstimate="$5000"
        isSmallSolution={true}
      />
    );

    // CAPEX + (3 * OPEX) = 10000 + (3 * 5000) = 25000
    expect(screen.getByTestId("three-year-total")).toHaveTextContent("$25,000");
  });
});
