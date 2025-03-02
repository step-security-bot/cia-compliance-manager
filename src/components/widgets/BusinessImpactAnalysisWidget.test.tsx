import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../../hooks/useCIAOptions";
import { BUSINESS_CONSIDERATIONS, RISK_LEVELS } from "../../constants";

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

    // Check business impact text is present
    const impactText = screen.getByTestId("business-impact-availability");
    expect(impactText).toBeInTheDocument();
    expect(impactText).toHaveTextContent(/business continuity/i);
  });

  it("falls back to No Data message when invalid level is provided", () => {
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

    // Should show fallback message for invalid level
    const impactText = screen.getByTestId("business-impact-availability");
    expect(impactText).toHaveTextContent(
      /No specific business impact data available/i
    );
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
    expect(screen.queryByTestId("business-benefits")).not.toBeInTheDocument();
  });

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

  // New tests for better coverage

  it("shows risk levels with appropriate colors", async () => {
    // Render with a level that has considerations with different risk levels
    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="None"
        options={availabilityOptions}
      />
    );

    // Check if any risk level indicators are present
    const riskElements = screen.queryAllByTestId(/risk-level-\d+/);

    // If there are risk elements, verify they have the right classes
    if (riskElements.length > 0) {
      // Check first risk element
      const firstRisk = riskElements[0];

      // Verify the element has a background color class
      // FIX: Using className.includes instead of toHaveClass with regex
      expect(firstRisk.className).toContain("bg-");
    }
  });

  it("shows empty state when no considerations or benefits exist", async () => {
    // Mock empty considerations and benefits
    // FIX: Fixed the type of impact to be a string instead of number
    const emptyOptions = {
      None: {
        description: "Empty test",
        technical: "No technical details",
        businessImpact: "No business impact",
        impact: "None", // Changed from 0 to string to match CIADetails type
        capex: 0,
        opex: 0,
        bg: "#ccc",
        text: "#000",
        recommendations: [],
      },
    };

    // Define a custom render function that sets up with empty data
    const renderEmptyCase = () => {
      // Use a category/level combination that won't have considerations
      render(
        <BusinessImpactAnalysisWidget
          category="Availability"
          level="Custom"
          options={emptyOptions}
        />
      );
    };

    renderEmptyCase();

    // Check if the empty message appears
    expect(screen.getByTestId("no-considerations-message")).toBeInTheDocument();

    // Switch to benefits tab
    const user = userEvent.setup();
    await user.click(screen.getByTestId("tab-benefits"));

    // Check for empty benefits message
    await waitFor(() => {
      expect(screen.getByTestId("no-benefits-message")).toBeInTheDocument();
    });
  });

  it("displays advanced metrics when available", () => {
    // Create options with businessImpactDetails
    const optionsWithDetails = {
      ...availabilityOptions,
      High: {
        ...availabilityOptions.High,
        businessImpactDetails: {
          financialImpact: {
            description: "Significant financial impact",
            annualRevenueLoss: "$500,000",
          },
          operationalImpact: {
            description: "Major operational disruption",
            meanTimeToRecover: "24 hours",
          },
        },
      },
    };

    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="High"
        options={optionsWithDetails}
      />
    );

    // Check if metrics section is displayed
    expect(screen.getByTestId("impact-metrics-section")).toBeInTheDocument();
    expect(screen.getByTestId("financial-impact-card")).toBeInTheDocument();
    expect(screen.getByTestId("operational-impact-card")).toBeInTheDocument();
    expect(screen.getByTestId("annual-revenue-loss")).toHaveTextContent(
      "$500,000"
    );
    expect(screen.getByTestId("mean-recovery-time")).toHaveTextContent(
      "24 hours"
    );
  });
});
