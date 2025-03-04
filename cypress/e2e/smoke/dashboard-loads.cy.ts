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
    // Use updated test ID for the security profile widget
    cy.get('[data-testid="widget-security-level-selection"]').should("exist");
    cy.get(
      "select#availability-select, select#integrity-select, select#confidentiality-select"
    ).should("exist");
  });

  it("has basic layout structure", () => {
    // Verify header exists
    cy.get("header").should("exist");

    // Verify theme toggle exists
    cy.get('[data-testid="theme-toggle"]').should("exist");

    // Verify main content area
    cy.get("main").should("exist");
  });

  it("shows all required widgets", () => {
    cy.get('[data-testid="widget-security-summary"]').should("exist");
    cy.get('[data-testid="widget-compliance-status"]').should("exist");
    cy.get('[data-testid="widget-value-creation"]').should("exist");
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");
    // Use the outer business impact widget test ID
    cy.get('[data-testid="widget-business-impact"]').should("exist");
    cy.get('[data-testid="widget-technical-implementation"]').should("exist");
    // Update the radar container test ID
    cy.get('[data-testid="radar-chart-visualization-container"]').should(
      "exist"
    );
  });
});
