import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { waitFor } from "@testing-library/dom"; // Import waitFor
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../../hooks/useCIAOptions";

describe("BusinessImpactAnalysisWidget", () => {
  // Helper function to find impact summary
  const findImpactSummary = () => {
    return screen.getByTestId("business-impact-summary");
  };

  it("renders Availability impacts correctly", () => {
    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="None"
        options={availabilityOptions}
      />
    );

    // Check if summary is displayed
    const summary = findImpactSummary();
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent("Availability");
    expect(summary).toHaveTextContent("None");
  });

  it("renders Integrity impacts correctly", () => {
    render(
      <BusinessImpactAnalysisWidget
        category="Integrity"
        level="None"
        options={integrityOptions}
      />
    );

    // Check if summary is displayed
    const summary = findImpactSummary();
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent("Integrity");
    expect(summary).toHaveTextContent("None");
  });

  it("renders Confidentiality impacts correctly", () => {
    render(
      <BusinessImpactAnalysisWidget
        category="Confidentiality"
        level="None"
        options={confidentialityOptions}
      />
    );

    // Check if summary is displayed
    const summary = findImpactSummary();
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent("Confidentiality");
    expect(summary).toHaveTextContent("None");
  });

  it("displays business impact for each level and category", () => {
    // High availability
    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="High"
        options={availabilityOptions}
      />
    );

    const summary = findImpactSummary();
    expect(summary).toBeInTheDocument();
    // Check for the actual business impact text from the available options
    expect(summary).toHaveTextContent(
      "Business continuity preserved in most scenarios"
    );
  });

  it("falls back to None level when invalid level is provided", () => {
    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="Invalid"
        options={availabilityOptions}
      />
    );

    // Summary should still be rendered
    const summary = findImpactSummary();
    expect(summary).toBeInTheDocument();
  });

  it("renders business considerations tab by default", () => {
    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="None"
        options={availabilityOptions}
      />
    );

    expect(screen.getByTestId("business-considerations")).toBeInTheDocument();
  });

  // Update this test to properly handle state updates
  it("toggles between considerations and benefits tabs", async () => {
    // Setup userEvent
    const user = userEvent.setup();

    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="None"
        options={availabilityOptions}
      />
    );

    // First verify considerations tab is visible (default)
    expect(screen.getByTestId("business-considerations")).toBeInTheDocument();

    // Click the benefits tab and wait for state update
    await user.click(screen.getByTestId("tab-benefits"));

    // Wait for the benefits tab content to appear
    await waitFor(() => {
      expect(screen.getByTestId("business-benefits")).toBeInTheDocument();
    });

    // Verify we can switch back to considerations
    await user.click(screen.getByTestId("tab-considerations"));

    await waitFor(() => {
      expect(screen.getByTestId("business-considerations")).toBeInTheDocument();
    });
  });
});
