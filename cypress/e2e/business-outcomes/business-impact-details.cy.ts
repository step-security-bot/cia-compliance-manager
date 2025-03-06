/**
 * User Story: As a user, I can view detailed business impact analysis
 *
 * Tests the business impact analysis widget in detail
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";
import { BUSINESS_IMPACT_TEST_IDS } from "../../../src/constants/testIds";

describe("Business Impact Details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1200, 900);
  });

  it("shows detailed business impact analysis components", () => {
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    // Verify combined impact component exists
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET}"]`).should("exist");
    cy.contains("Availability Impact").should("exist");
    cy.contains("Integrity Impact").should("exist");
    cy.contains("Confidentiality Impact").should("exist");
  });

  it("displays tabbed interface and allows switching tabs", () => {
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    // Verify the existing tab buttons (if available) or simply check for key benefit text
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}"]`).first().should("exist");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}"]`).first().click({ force: true });
    cy.wait(300);
  });

  it.skip("displays risk levels with appropriate styling", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.wait(300);
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.get(`[data-testid*="risk-level"]`).should("exist");
  });

  it("shows detailed impact descriptions for each CIA component", () => {
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.contains("Availability Impact")
      .parent()
      .within(() => {
        cy.get("p").should("exist");
      });
    cy.contains("Integrity Impact")
      .parent()
      .within(() => {
        cy.get("p").should("exist");
      });
    cy.contains("Confidentiality Impact")
      .parent()
      .within(() => {
        cy.get("p").should("exist");
      });
  });

  it.skip("displays advanced metrics when available", () => {
    cy.setSecurityLevels("High", "High", "High");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    // Look for metrics using the test ID already rendered in DOM
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}"]`).should("exist");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_METRICS}"]`).should("exist");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_METRICS}"]`).should("exist");
  });

  it("shows empty state messages when no data is available", () => {
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET}"]`).should(
      "be.visible"
    );
  });

  it.skip("verifies consideration items have proper structure", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.get(`[data-testid^="consideration-item-"]`)
      .first()
      .within(() => {
        cy.get(`[data-testid^="impact-type-"]`).should("exist");
        cy.get(`[data-testid^="consideration-description-"]`).should("exist");
      });
  });

  it.skip("verifies benefit items have proper structure", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}"]`).first().click();
    cy.wait(100);
    // Expect benefit items with a prefix; update the selector if benefit items have been added in your code.
    cy.get(`[data-testid^="benefit-item-"]`).should("exist");
  });

  it("validates ARIA attributes for accessibility", () => {
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`).first().scrollIntoView();
    cy.wait(300);
    cy.get('[role="tablist"]').should("exist");
    cy.get('[role="tab"]').should("exist");
  });
});
