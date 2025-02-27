import React from "react";
import { render, screen } from "@testing-library/react";
import ValueCreationWidget from "./ValueCreationWidget";

describe("ValueCreationWidget", () => {
  it("renders None level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="None" />);

    expect(
      screen.getByText("No specific value creation from security investments")
    ).toBeInTheDocument();
  });

  it("renders Basic level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="Basic" />);

    expect(
      screen.getByText(
        "Satisfies minimum viable security for non-critical systems"
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
    expect(
      screen.getByText(/Prevents common security incidents/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Provides competitive advantage/)
    ).toBeInTheDocument();
  });

  it("renders High level value points correctly", () => {
    render(<ValueCreationWidget securityLevel="High" />);

    expect(
      screen.getByText(/Enables expansion into highly regulated markets/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Provides assurance to high-value customers/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Reduces insurance premiums/)).toBeInTheDocument();
    expect(
      screen.getByText(/Minimizes breach-related costs/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Supports premium service offerings/)
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
    expect(screen.getByText(/Creates long-term trust/)).toBeInTheDocument();
    expect(
      screen.getByText(/Provides resilience against catastrophic events/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Supports premium pricing models/)
    ).toBeInTheDocument();
  });

  it("falls back to None when invalid security level is provided", () => {
    render(<ValueCreationWidget securityLevel="Invalid" />);

    expect(
      screen.getByText("No specific value creation from security investments")
    ).toBeInTheDocument();
  });

  it("displays introductory text", () => {
    render(<ValueCreationWidget securityLevel="Basic" />);

    expect(
      screen.getByText(/Security investments create value through/)
    ).toBeInTheDocument();
  });
});
