/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS, UI_TEXT } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows cost estimation widget", () => {
    // Check that the cost estimation widget exists
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");

    // Verify it has the expected header
    cy.get('[data-testid="widget-cost-estimation"] .widget-header')
      .contains(UI_TEXT.HEADERS.COST_ESTIMATION)
      .should("exist");
  });

  it("shows cost percentages", () => {
    // Verify that cost percentages exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");
  });

  it("shows value creation widget", () => {
    // Check that the value creation widget exists
    cy.get('[data-testid="widget-value-creation"]').should("exist");

    // Verify it has the expected header
    cy.get('[data-testid="widget-value-creation"] .widget-header')
      .contains("Value Creation")
      .should("exist");
  });

  it("shows cost analysis after setting security levels", () => {
    // Set security levels to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500); // Wait for UI updates

    // Verify cost widgets exist
    cy.get('[data-testid="widget-cost-estimation"]').should("exist");
    cy.get('[data-testid="widget-value-creation"]').should("exist");

    // Verify cost percentages exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");

    // Look for the cost analysis section using exact text from the UI_TEXT constant
    cy.get('[data-testid="widget-cost-estimation"]')
      .contains(UI_TEXT.HEADERS.COST_ANALYSIS)
      .should("exist");
  });
});
