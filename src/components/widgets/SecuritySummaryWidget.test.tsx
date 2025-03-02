import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SecuritySummaryWidget from "./SecuritySummaryWidget";
import {
  SECURITY_SUMMARY_TITLES,
  UI_ICONS,
  TEST_MATCHERS,
  ROI_ESTIMATES,
} from "../../constants/appConstants";
import { BUSINESS_KEY_BENEFITS } from "../../constants";

// Create wrapper components instead of mocking React.useState
const TechnicalExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget
    securityLevel="Moderate"
    availabilityLevel="High"
    integrityLevel="Moderate"
    confidentialityLevel="High"
  />
);

const BusinessImpactExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget
    securityLevel="High"
    availabilityLevel="High"
    integrityLevel="High"
    confidentialityLevel="High"
  />
);

const MetricsExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget securityLevel="Moderate" />
);

describe("SecuritySummaryWidget", () => {
  it("renders None level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="None" />);

    // Use a custom matcher that can handle the title format
    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.NONE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    // Use test matcher for description
    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Low level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Low" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.LOW)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_LOW_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Moderate level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Moderate" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.MODERATE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_MODERATE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="High" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Very High level summary correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Very High" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.VERY_HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_VERY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(<SecuritySummaryWidget securityLevel="Low" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_LOW
    );

    rerender(<SecuritySummaryWidget securityLevel="Moderate" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_MODERATE
    );

    rerender(<SecuritySummaryWidget securityLevel="High" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_HIGH
    );

    rerender(<SecuritySummaryWidget securityLevel="Very High" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_VERY_HIGH
    );

    rerender(<SecuritySummaryWidget securityLevel="None" />);
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.SECURITY_NONE
    );
  });

  it("falls back to None when invalid security level is provided", () => {
    render(<SecuritySummaryWidget securityLevel="Invalid" />);

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.NONE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });

  // New tests to improve coverage

  it("renders with mixed CIA security levels and generates composite description", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="High"
        integrityLevel="Low"
        confidentialityLevel="Very High"
      />
    );

    // Check that it displays mixed security profile text
    expect(screen.getByText(/Mixed security profile/i)).toBeInTheDocument();
    expect(screen.getByText(/High Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Integrity/i)).toBeInTheDocument();
    expect(screen.getByText(/Very High Confidentiality/i)).toBeInTheDocument();
  });

  it("handles Basic security level correctly", () => {
    render(<SecuritySummaryWidget securityLevel="Basic" />);

    // Use the testid to find the specific element instead of generic text search
    expect(screen.getByTestId("security-summary-title")).toHaveTextContent(
      "Basic Security"
    );

    // Should use Low description
    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_LOW_PATTERN)
    ).toBeInTheDocument();
    // Should use the Basic icon
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.BASIC_COMPLIANCE
    );
  });

  it("displays key benefits based on security level", () => {
    const { rerender } = render(
      <SecuritySummaryWidget securityLevel="Moderate" />
    );

    // Test Moderate level benefits
    const moderateBenefits = BUSINESS_KEY_BENEFITS.MODERATE;
    moderateBenefits.forEach((benefit: string) => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });

    // Check High level benefits
    rerender(<SecuritySummaryWidget securityLevel="High" />);
    const highBenefits = BUSINESS_KEY_BENEFITS.HIGH;
    highBenefits.forEach((benefit: string) => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });

  it("displays ROI estimates based on security level", async () => {
    const { rerender } = render(<SecuritySummaryWidget securityLevel="High" />);

    // Now checking the exposed ROI summary instead of the hidden section
    expect(screen.getByTestId("roi-estimate-summary")).toHaveTextContent(
      ROI_ESTIMATES.HIGH
    );

    rerender(<SecuritySummaryWidget securityLevel="Low" />);
    expect(screen.getByTestId("roi-estimate-summary")).toHaveTextContent(
      ROI_ESTIMATES.LOW
    );
  });

  it("expands technical section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    // Find and click the technical section header
    const technicalHeader = screen.getByTestId("technical-section-toggle");
    fireEvent.click(technicalHeader);

    // Use waitFor instead of setTimeout
    await waitFor(() => {
      expect(
        screen.getByTestId("technical-details-section")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("availability-tech-heading")
      ).toBeInTheDocument();
      expect(screen.getByTestId("integrity-tech-heading")).toBeInTheDocument();
      expect(
        screen.getByTestId("confidentiality-tech-heading")
      ).toBeInTheDocument();
    });
  });

  it("expands business impact section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Find and click the business impact section header
    const businessHeader = screen.getByTestId("business-impact-toggle");
    fireEvent.click(businessHeader);

    // Use waitFor
    await waitFor(() => {
      expect(screen.getByTestId("business-impact-section")).toBeInTheDocument();
      expect(
        screen.getByTestId("availability-impact-heading")
      ).toBeInTheDocument();
    });
  });

  it("expands metrics section when clicked", async () => {
    render(<SecuritySummaryWidget securityLevel="Moderate" />);

    // Find and click the metrics section header
    const metricsHeader = screen.getByTestId("metrics-toggle");
    fireEvent.click(metricsHeader);

    // Use waitFor
    await waitFor(() => {
      expect(screen.getByTestId("metrics-section")).toBeInTheDocument();
    });
  });

  it("displays recommendations based on security level", () => {
    const { rerender } = render(<SecuritySummaryWidget securityLevel="None" />);

    expect(screen.getByTestId("recommendation-heading")).toBeInTheDocument();
    expect(screen.getByTestId("security-recommendation")).toBeInTheDocument();

    // Check for recommendation badges with specific testids
    expect(screen.getByTestId("badge-high-risk")).toBeInTheDocument();
    expect(screen.getByTestId("badge-not-recommended")).toBeInTheDocument();

    // Test different security level badges
    rerender(<SecuritySummaryWidget securityLevel="High" />);
    expect(screen.getByText(/Strong Protection/i)).toBeInTheDocument();
    expect(screen.getByText(/Sensitive Data Ready/i)).toBeInTheDocument();
  });
});
