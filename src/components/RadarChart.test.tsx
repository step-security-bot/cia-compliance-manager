import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadarChart from "./RadarChart";

// Jest hoists mocks to the top of the file, so we need to use a different approach
jest.mock("chart.js/auto", () => {
  // Define the mock implementation inline to avoid hoisting issues
  return {
    __esModule: true, // Handle ESM modules
    default: class MockChart {
      static defaults: { color: string } = { color: "#666" }; // Add type annotation
      static register = jest.fn();
      destroy = jest.fn();
      update = jest.fn();
      constructor() {
        return this;
      }
    },
  };
});

describe("RadarChart component", () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      canvas: {
        width: 100,
        height: 100,
      },
    });
  });

  it("renders the component correctly", () => {
    const { container, getByTestId } = render(
      <RadarChart
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
      />
    );

    expect(getByTestId("radar-chart")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it('handles "None" level selections properly', () => {
    const { container, getByTestId } = render(
      <RadarChart availability="None" integrity="None" confidentiality="None" />
    );

    expect(getByTestId("radar-chart")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it('handles "Very High" level selections properly', () => {
    const { container, getByTestId } = render(
      <RadarChart
        availability="Very High"
        integrity="Very High"
        confidentiality="Very High"
      />
    );

    expect(getByTestId("radar-chart")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("handles mixed level selections properly", () => {
    const { container, getByTestId } = render(
      <RadarChart
        availability="Low"
        integrity="High"
        confidentiality="Moderate"
      />
    );

    expect(getByTestId("radar-chart")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
