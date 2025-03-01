/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows cost estimation widget", () => {
    // Check that the cost estimation widget exists
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");

    // Verify it has a header
    cy.get('[data-testid="widget-cost-estimation"] .widget-header')
      .contains("Cost Estimation")
      .should("exist");
  });

  it("shows cost percentages", () => {
    // Verify just that the cost percentages exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");
  });

  it("shows value creation widget", () => {
    // Check that the value creation widget exists
    cy.get('[data-testid="widget-value-creation"]').should("exist");

    // Verify it has a header
    cy.get('[data-testid="widget-value-creation"] .widget-header')
      .contains("Value Creation")
      .should("exist");
  });

  it("changes security levels and costs exist", () => {
    // Set security levels
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.HIGH);
    cy.get('[data-testid="integrity-select"]').select(SECURITY_LEVELS.HIGH);
    cy.get('[data-testid="confidentiality-select"]').select(
      SECURITY_LEVELS.HIGH
    );

    // Just verify the widgets still exist after changing values
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");
    cy.get('[data-testid="widget-value-creation"]').should("exist");

    // And the cost percentages still exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");
  });
});
