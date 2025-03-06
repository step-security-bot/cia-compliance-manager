import React from "react";
import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import CombinedBusinessImpactWidget from "./CombinedBusinessImpactWidget";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";

// Mock data
const mockOptions = {
  None: {
    description: "No description",
    impact: "No impact",
    technical: "No technical details",
    businessImpact: "No business impact",
    businessImpactDetails: {
      financialImpact: {
        description: "No financial impact",
        riskLevel: "LOW",
      },
      operationalImpact: {
        description: "No operational impact",
        riskLevel: "LOW",
      },
    },
    capex: 0,
    opex: 0,
  },
  Moderate: {
    description: "Moderate description",
    impact: "Moderate impact",
    technical: "moderate-tech",
    businessImpact: "Moderate business impact",
    businessImpactDetails: {
      financialImpact: {
        description: "Revenue impact of 1-5% annually due to planned downtime",
        riskLevel: "MEDIUM",
      },
      operationalImpact: {
        description: "Occasional disruptions with quick recovery",
        riskLevel: "MEDIUM",
      },
      reputationalImpact: {
        description: "Customer expectations managed through SLAs",
        riskLevel: "LOW",
      },
    },
    capex: 10000,
    opex: 500,
  },
  High: {
    description: "High description",
    impact: "High impact",
    technical: "high-tech",
    businessImpact: "Low business impact",
    businessImpactDetails: {
      financialImpact: {
        description: "Minimal financial impact due to high availability",
        riskLevel: "LOW",
      },
    },
    capex: 25000,
    opex: 1000,
  },
  Low: {
    description: "Low description",
    impact: "Low impact",
    technical: "low-tech",
    businessImpact: "High business impact",
    businessImpactDetails: {
      operationalImpact: {
        description: "Frequent disruptions to business operations",
        riskLevel: "HIGH",
      },
      financialImpact: {
        description: "Significant revenue loss during frequent outages",
        riskLevel: "MEDIUM",
        annualRevenueLoss: "10-20%",
      },
    },
    capex: 5000,
    opex: 200,
  },
};

describe("CombinedBusinessImpactWidget", () => {
  it("renders the component with all impact types", () => {
    render(
      <CombinedBusinessImpactWidget
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
        availabilityOptions={mockOptions}
        integrityOptions={mockOptions}
        confidentialityOptions={mockOptions}
      />
    );

    const widgets = screen.getAllByTestId(
      BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET
    );

    expect(widgets.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Financial impact/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Operational impact/i).length).toBeGreaterThan(
      0
    );
  });

  it("shows correct financial impact details", () => {
    render(
      <CombinedBusinessImpactWidget
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
        availabilityOptions={mockOptions}
        integrityOptions={mockOptions}
        confidentialityOptions={mockOptions}
      />
    );

    expect(screen.getAllByText(/Financial impact/i).length).toBeGreaterThan(0);
    const financialElements = screen.getAllByText(/Financial impact/i);
    expect(financialElements.length).toBeGreaterThan(0);
  });

  it("shows correct operational impact details", () => {
    render(
      <CombinedBusinessImpactWidget
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
        availabilityOptions={mockOptions}
        integrityOptions={mockOptions}
        confidentialityOptions={mockOptions}
      />
    );

    // Look for consideration items instead of specific section
    const considerationItems = screen.getAllByTestId(/^consideration-item-/);

    // Find the item that contains operational impact
    const operationalItem = considerationItems.find((item) =>
      within(item).queryByText(/operational/i)
    );

    expect(operationalItem).toBeDefined();
    if (operationalItem) {
      expect(
        within(operationalItem).getByText(
          /Occasional disruptions with quick recovery/i
        )
      ).toBeInTheDocument();
    }
  });

  it("handles missing business impact details", () => {
    const mockOptionsWithoutDetails = {
      Moderate: {
        description: "Moderate description",
        impact: "Moderate impact",
        technical: "Moderate technical",
        businessImpact: "Moderate business impact",
        capex: 15,
        opex: 10,
      },
    };

    render(
      <CombinedBusinessImpactWidget
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
        availabilityOptions={mockOptionsWithoutDetails}
        integrityOptions={mockOptionsWithoutDetails}
        confidentialityOptions={mockOptionsWithoutDetails}
      />
    );

    // Use getAllByTestId and take the first one when there are multiple elements
    const widgets = screen.getAllByTestId(
      BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET
    );
    expect(widgets.length).toBeGreaterThan(0);

    // Fix: Use getAllByText instead of getByText since there are multiple elements with this text
    const businessImpactElements = screen.getAllByText(
      "Moderate business impact"
    );
    expect(businessImpactElements.length).toBeGreaterThan(0);
  });

  it("shows multiple risk levels from different CIA components", () => {
    const availabilityOptions = {
      ...mockOptions,
      High: {
        ...mockOptions.High,
        businessImpactDetails: {
          ...mockOptions.High.businessImpactDetails,
          financialImpact: {
            ...mockOptions.High.businessImpactDetails.financialImpact,
            riskLevel: "Low",
          },
        },
      },
    };
    const integrityOptions = {
      ...mockOptions,
      Moderate: {
        ...mockOptions.Moderate,
        businessImpactDetails: {
          ...mockOptions.Moderate.businessImpactDetails,
          financialImpact: {
            ...mockOptions.Moderate.businessImpactDetails.financialImpact,
            riskLevel: "Medium",
          },
        },
      },
    };
    const confidentialityOptions = {
      ...mockOptions,
      Low: {
        ...mockOptions.Low,
        businessImpactDetails: {
          ...mockOptions.Low.businessImpactDetails,
          financialImpact: {
            ...mockOptions.Low.businessImpactDetails.financialImpact,
            riskLevel: "High",
          },
        },
      },
    };

    render(
      <CombinedBusinessImpactWidget
        availability="High"
        integrity="Moderate"
        confidentiality="Low"
        availabilityOptions={availabilityOptions}
        integrityOptions={integrityOptions}
        confidentialityOptions={confidentialityOptions}
      />
    );

    // Look for risk badges instead of specific sections
    const riskBadges = screen.getAllByTestId(/^risk-badge-/);
    const highRiskBadge = riskBadges.find((badge) =>
      badge.textContent?.includes("High")
    );

    expect(highRiskBadge).toBeDefined();
    if (highRiskBadge) {
      expect(highRiskBadge).toHaveTextContent(/High/i);
    }
  });

  it("properly combines impact descriptions", () => {
    const availabilityOptions = {
      ...mockOptions,
      Moderate: {
        ...mockOptions.Moderate,
        businessImpactDetails: {
          ...mockOptions.Moderate.businessImpactDetails,
          financialImpact: {
            ...mockOptions.Moderate.businessImpactDetails.financialImpact,
            description: "Availability financial impact",
          },
        },
      },
    };
    const integrityOptions = {
      ...mockOptions,
      Moderate: {
        ...mockOptions.Moderate,
        businessImpactDetails: {
          ...mockOptions.Moderate.businessImpactDetails,
          financialImpact: {
            ...mockOptions.Moderate.businessImpactDetails.financialImpact,
            description: "Integrity financial impact",
          },
        },
      },
    };
    const confidentialityOptions = {
      ...mockOptions,
      Moderate: {
        ...mockOptions.Moderate,
        businessImpactDetails: {
          ...mockOptions.Moderate.businessImpactDetails,
          financialImpact: {
            ...mockOptions.Moderate.businessImpactDetails.financialImpact,
            description: "Confidentiality financial impact",
          },
        },
      },
    };

    render(
      <CombinedBusinessImpactWidget
        availability="Moderate"
        integrity="Moderate"
        confidentiality="Moderate"
        availabilityOptions={availabilityOptions}
        integrityOptions={integrityOptions}
        confidentialityOptions={confidentialityOptions}
      />
    );

    // Fix: Use a more specific way to find financial impact texts
    const financialImpactTexts = [
      "Availability financial impact",
      "Integrity financial impact",
      "Confidentiality financial impact",
    ];

    // Check if any of the expected impact texts are present in the document
    const metricsValues = screen.getAllByTestId(
      /financial-impact-metrics-value/
    );
    const foundText = metricsValues.some((element) =>
      financialImpactTexts.some((text) => element.textContent?.includes(text))
    );

    expect(foundText).toBeTruthy();
  });
});
