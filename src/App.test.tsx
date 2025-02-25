import React from "react";
import { render, screen } from "./utils/test-utils";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders specific elements within CIAClassificationApp", () => {
    // Use more specific queries
    expect(
      screen.getByRole("heading", { name: /CIA Classification App/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Availability Level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Integrity Level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confidentiality Level/i)).toBeInTheDocument();
  });

  it("renders selection components with proper labels", () => {
    const labels = screen
      .getAllByRole("combobox")
      .map((select) => select.getAttribute("aria-label"));
    expect(labels).toContain("Availability Level");
    expect(labels).toContain("Integrity Level");
    expect(labels).toContain("Confidentiality Level");
  });

  it("renders with correct structure", () => {
    expect(screen.getByTestId("classification-form")).toBeInTheDocument();
    expect(screen.getByTestId("analysis-section")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dark mode/i })
    ).toBeInTheDocument();
  });
});
