import React from "react";
import { render, screen } from "@testing-library/react";
import ValueCreationWidget from "./ValueCreationWidget";
import {
  VALUE_CREATION_POINTS,
  ROI_ESTIMATES,
  createValuePointMatcher,
} from "../../constants/appConstants";

describe("ValueCreationWidget", () => {
  it("renders None level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="None" />);

    expect(
      screen.getByText(new RegExp(VALUE_CREATION_POINTS.NONE))
    ).toBeInTheDocument();
  });

  it("renders Low level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Low" />);

    expect(
      screen.getByText(new RegExp(VALUE_CREATION_POINTS.LOW))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        createValuePointMatcher(
          "Minimal upfront costs allow budget allocation elsewhere"
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(createValuePointMatcher("Appropriate for public data"))
    ).toBeInTheDocument();
  });

  it("renders Moderate level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Moderate" />);

    expect(
      screen.getByText(new RegExp(VALUE_CREATION_POINTS.MODERATE))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        createValuePointMatcher("Reduces operational disruptions by 80%")
      )
    ).toBeInTheDocument();
  });

  it("renders High level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="High" />);

    expect(
      screen.getByText(new RegExp(VALUE_CREATION_POINTS.HIGH))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        createValuePointMatcher("Provides assurance to high-value customers")
      )
    ).toBeInTheDocument();
  });

  it("renders Very High level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Very High" />);

    expect(
      screen.getByText(new RegExp(VALUE_CREATION_POINTS.VERY_HIGH))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        createValuePointMatcher("Protects irreplaceable intellectual property")
      )
    ).toBeInTheDocument();
  });

  it("shows estimated ROI for each level", () => {
    const { rerender } = render(<ValueCreationWidget securityLevel="Low" />);
    expect(screen.getByText(new RegExp(ROI_ESTIMATES.LOW))).toBeInTheDocument();

    rerender(<ValueCreationWidget securityLevel="High" />);
    expect(
      screen.getByText(new RegExp(ROI_ESTIMATES.HIGH))
    ).toBeInTheDocument();
  });
});
