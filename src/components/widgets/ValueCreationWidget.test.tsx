import React from "react";
import { render, screen } from "@testing-library/react";
import ValueCreationWidget from "./ValueCreationWidget";

describe("ValueCreationWidget", () => {
  it("renders None level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="None" />);

    // Adjust expectations to match actual implementation
    expect(
      screen.getByText(
        /No security investment means all budget can go to other areas/
      )
    ).toBeInTheDocument();
  });

  it("renders Low level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Low" />);

    // Updated assertions that match the current implementation
    expect(
      screen.getByText(
        /Satisfies minimum viable security for non-critical systems/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Minimal upfront costs/)).toBeInTheDocument();
    expect(screen.getByText(/Appropriate for public data/)).toBeInTheDocument();
  });

  it("renders Moderate level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Moderate" />);

    expect(
      screen.getByText(/Demonstrates security diligence/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Reduces operational disruptions by 80%/)
    ).toBeInTheDocument();
  });

  it("renders High level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="High" />);

    expect(
      screen.getByText(/Enables expansion into regulated markets/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Provides assurance to high-value customers/)
    ).toBeInTheDocument();
  });

  it("renders Very High level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Very High" />);

    expect(
      screen.getByText(/Enables participation in classified/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Protects irreplaceable intellectual property/)
    ).toBeInTheDocument();
  });

  it("shows estimated ROI for each level", () => {
    const { rerender } = render(<ValueCreationWidget securityLevel="Low" />);
    expect(screen.getByText(/1-2x/)).toBeInTheDocument();

    rerender(<ValueCreationWidget securityLevel="High" />);
    expect(screen.getByText(/3-5x/)).toBeInTheDocument();
  });
});
