/**
 * User Story: As a user, I can view the CIA Compliance dashboard
 *
 * This smoke test verifies the most basic functionality -
 * that the application loads and displays its core elements.
 */
import { UI_TEXT } from "../../support/appConstantsHelper";

describe("Dashboard Loads", () => {
  beforeEach(() => {
    // Visit the app with increased timeout for CI environments
    cy.visit("/", { timeout: 20000 });

    // Wait for the app to load by checking for any content
    cy.get("body", { timeout: 10000 }).should("not.be.empty");
  });

  it("displays the application title", () => {
    // Look for application title
    cy.contains("CIA Compliance Manager").should("be.visible");
  });

  it("shows security selection controls", () => {
    // Check for the security profile widget by test ID
    cy.get('[data-testid="widget-security-profile"]').should("exist");

    // Check that selection controls are present
    cy.get(
      '[data-testid^="availability-select"], [data-testid^="integrity-select"], [data-testid^="confidentiality-select"]'
    ).should("exist");
  });

  it("has basic layout structure", () => {
    // Verify dashboard grid exists
    cy.get('[data-testid="dashboard-grid"]').should("exist");

    // Verify header exists
    cy.get("header").should("exist");

    // Verify theme toggle exists
    cy.get('[data-testid="theme-toggle"]').should("exist");
  });

  it("shows all required widgets", () => {
    // Check for all required widgets by test ID
    cy.get('[data-testid="widget-security-summary"]').should("exist");
    cy.get('[data-testid="widget-compliance-status"]').should("exist");
    cy.get('[data-testid="widget-value-creation"]').should("exist");
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");
    cy.get('[data-testid="widget-business-impact-analysis"]').should("exist");
    cy.get('[data-testid="widget-technical-implementation"]').should("exist");

    // Check for visualization widget
    cy.get('[data-testid="radar-widget-container"]').should("exist");
  });
});
