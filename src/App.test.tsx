import React from "react";
import { render, screen } from "./utils/test-utils";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders app dashboard correctly", () => {
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
    const labels = screen
      .getAllByRole("combobox")
      .map((select) => select.getAttribute("aria-label"));
    expect(labels).toContain("Availability");
    expect(labels).toContain("Integrity");
    expect(labels).toContain("Confidentiality");
  });

  it("renders dashboard structure correctly", () => {
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
