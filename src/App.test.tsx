import React from "react";
import { render, screen, cleanup } from "./utils/test-utils";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  // Clean up after each test to avoid duplicate elements
  afterEach(() => {
    cleanup();
  });

  it("renders app dashboard correctly", () => {
    render(<App />);

    // Check for the new app title
    expect(
      screen.getByText(/CIA Compliance Manager Dashboard/i)
    ).toBeInTheDocument();

    // Check for the main selection elements
    expect(screen.getByLabelText(/Availability/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Integrity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confidentiality/i)).toBeInTheDocument();
  });

  it("renders selection components with proper labels", () => {
    // Clean render for this test
    cleanup();
    render(<App />);

    // Check for label elements directly using the 'for' attribute to be specific
    const availabilityLabel = screen.getByLabelText("Availability");
    const integrityLabel = screen.getByLabelText("Integrity");
    const confidentialityLabel = screen.getByLabelText("Confidentiality");

    expect(availabilityLabel).toBeInTheDocument();
    expect(integrityLabel).toBeInTheDocument();
    expect(confidentialityLabel).toBeInTheDocument();

    // Check that select elements exist using a more specific query
    expect(
      screen.getByRole("combobox", { name: /Availability/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Integrity/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Confidentiality/i })
    ).toBeInTheDocument();
  });

  it("renders dashboard structure correctly", () => {
    // Clean render for this test
    cleanup();
    render(<App />);

    // Check for new widget-based structure
    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    expect(
      screen.getByTestId("widget-security-level-selection")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dark mode/i })
    ).toBeInTheDocument();
  });
});
