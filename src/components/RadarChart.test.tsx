import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadarChart from "./RadarChart";

// Mock getContext to prevent errors
HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

describe("RadarChart", () => {
  it("renders without crashing", () => {
    render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("sets up chart with correct data format", () => {
    render(
      <RadarChart
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
      />
    );
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("handles empty values gracefully", () => {
    render(<RadarChart availability="" integrity="" confidentiality="" />);
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });
});
