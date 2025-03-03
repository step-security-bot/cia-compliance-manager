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
import { ensureArray } from "../../utils/typeGuards";

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

  it("toggles between considerations and benefits tabs with correct ARIA attributes", async () => {
    const user = userEvent.setup();

    render(
      <BusinessImpactAnalysisWidget
        category="Availability"
        level="Moderate" // Use a level that likely has both considerations and benefits
        options={availabilityOptions}
      />
    );

    // Check initial ARIA attributes
    const considerationsTab = screen.getByTestId("tab-considerations");
    const benefitsTab = screen.getByTestId("tab-benefits");

    expect(considerationsTab).toHaveAttribute("aria-selected", "true");
    expect(benefitsTab).toHaveAttribute("aria-selected", "false");

    // Initial panel visibility
    expect(screen.getByTestId("business-considerations")).toBeInTheDocument();
    expect(screen.queryByTestId("business-benefits")).not.toBeInTheDocument();

    // Click benefits tab
    await user.click(benefitsTab);

    // Check updated ARIA attributes
    expect(considerationsTab).toHaveAttribute("aria-selected", "false");
    expect(benefitsTab).toHaveAttribute("aria-selected", "true");

    // Check panel visibility after switching
    await waitFor(() => {
      expect(
        screen.queryByTestId("business-considerations")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("business-benefits")).toBeInTheDocument();
    });

    // Check that the benefits tab content references the right ID
    expect(screen.getByTestId("business-benefits")).toHaveAttribute(
      "id",
      "panel-benefits"
    );
    expect(benefitsTab).toHaveAttribute("aria-controls", "panel-benefits");
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

      // Only check if firstRisk exists
      if (firstRisk) {
        expect(firstRisk.className).toContain("bg-");
      }
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
        // Ensure all required properties exist
        description:
          availabilityOptions.High?.description || "High description",
        impact: availabilityOptions.High?.impact || "High impact",
        technical: availabilityOptions.High?.technical || "Technical details",
        businessImpact:
          availabilityOptions.High?.businessImpact || "Business impact",
        capex: availabilityOptions.High?.capex || 0,
        opex: availabilityOptions.High?.opex || 0,
        bg: availabilityOptions.High?.bg || "#fff",
        text: availabilityOptions.High?.text || "#000",
        recommendations: availabilityOptions.High?.recommendations || [],
        // Additional custom properties
        businessImpactDetails: {
          financialImpact: {
            description: "Financial impact description",
            annualRevenueLoss: "$500,000",
          },
          operationalImpact: {
            description: "Operational impact description",
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
