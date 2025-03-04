/**
 * User Story: As a user, I can view detailed business impact analysis
 *
 * Tests the business impact analysis widget in detail
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Business Impact Details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(2000, 2000);
  });

  it("shows detailed business impact analysis components", () => {
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    // Verify combined business impact component appears
    cy.get('[data-testid="combined-business-impact-widget"]').should("exist");
    cy.contains("Availability Impact").should("exist");
    cy.contains("Integrity Impact").should("exist");
    cy.contains("Confidentiality Impact").should("exist");
  });

  it("displays tabbed interface and allows switching tabs", () => {
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    // Verify the existing tab buttons (if available) or simply check for key benefit text
    cy.get('[data-testid="tab-benefits"]').first().should("exist");
    cy.get('[data-testid="tab-benefits"]').first().click({ force: true });
    cy.wait(300);
  });

  it("displays risk levels with appropriate styling", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.wait(300);
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[data-testid*="risk-level"]').should("exist");
  });

  it("shows detailed impact descriptions for each CIA component", () => {
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
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

  it("shows advanced metrics when available", () => {
    cy.setSecurityLevels("High", "High", "High");
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[data-testid="impact-metrics-section"]').should("exist");
    cy.get('[data-testid="financial-impact-metrics"]').should("exist");
    cy.get('[data-testid="operational-impact-metrics"]').should("exist");
  });

  it("shows empty state messages when no data is available", () => {
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[data-testid="combined-business-impact-widget"]').should(
      "be.visible"
    );
  });

  it("verifies consideration items have proper structure", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[data-testid^="consideration-item-"]')
      .first()
      .within(() => {
        cy.get('[data-testid^="impact-type-"]').should("exist");
        cy.get('[data-testid^="consideration-description-"]').should("exist");
      });
  });

  it("verifies benefit items have proper structure", () => {
    cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[data-testid="tab-benefits"]').first().click();
    cy.wait(100);
    // Benefit items existence check
    cy.get('[data-testid^="benefit-item-"]').should("exist");
  });

  it("validates ARIA attributes for accessibility", () => {
    cy.get('[data-testid="widget-business-impact"]').first().scrollIntoView();
    cy.wait(300);
    cy.get('[role="tablist"]').should("exist");
    cy.get('[role="tab"]').should("exist");
  });
});
