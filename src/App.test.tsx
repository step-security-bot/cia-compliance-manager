import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";
import { APP_TEST_IDS } from "./constants/testIds";

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
    // Check if the app root is rendered
    expect(screen.getByTestId(APP_TEST_IDS.APP_ROOT)).toBeInTheDocument();
  });
});
