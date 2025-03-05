import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";

// Mock the CIAClassificationApp component
vi.mock("./CIAClassificationApp", () => ({
  default: () => <div data-testid="mock-cia-app">CIA Classification App</div>,
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders the dashboard directly", () => {
    render(<App />);

    // App should show the CIA dashboard directly
    expect(screen.getByTestId("mock-cia-app")).toBeInTheDocument();
  });
});
