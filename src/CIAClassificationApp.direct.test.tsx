import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS } from "./constants/testIds";
import { UI_TEXT } from "./constants";

// IMPORTANT: Mock must be defined before any other code to prevent hoisting issues
// Define the mock module with inline options, not using external variables
vi.mock("./hooks/useCIAOptions", () => {
  // Create options inline inside the mock factory
  const mockOptions = {
    None: { description: "No availability controls", capex: 0, opex: 0 },
    Low: { description: "Basic availability controls", capex: 5, opex: 5 },
    Moderate: {
      description: "Standard availability controls",
      capex: 15,
      opex: 10,
    },
    High: {
      description: "Advanced availability controls",
      capex: 30,
      opex: 20,
    },
    "Very High": {
      description: "Maximum availability controls",
      capex: 50,
      opex: 30,
    },
  };

  return {
    // The hook function
    useCIAOptions: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
    }),

    // Direct exports
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };
});

describe("CIAClassificationApp Component Direct Tests", () => {
  it("renders basic structure correctly", () => {
    render(<CIAClassificationApp />);

    // Check for essential elements
    expect(screen.getByTestId(APP_TEST_IDS.APP_CONTAINER)).toBeInTheDocument();
    expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toHaveTextContent(
      "CIA Compliance Manager Dashboard"
    );
    expect(screen.getByTestId(APP_TEST_IDS.THEME_TOGGLE)).toBeInTheDocument();
  });

  it("shows security level section", () => {
    render(<CIAClassificationApp />);

    // Check for security level widget
    expect(
      screen.getByTestId("widget-security-level-selection")
    ).toBeInTheDocument();
  });
});
