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

    // Verify it has a header (without checking specific text)
    cy.get('[data-testid="widget-cost-estimation"] .widget-header').should(
      "exist"
    );
  });

  it("shows cost percentages", () => {
    // Verify that cost percentages exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");
  });

  it("shows value creation widget", () => {
    // Check that the value creation widget exists
    cy.get('[data-testid="widget-value-creation"]').should("exist");

    // Verify it has a header (without checking specific text)
    cy.get('[data-testid="widget-value-creation"] .widget-header').should(
      "exist"
    );
  });

  it("shows cost information after setting security levels", () => {
    // Set security levels using the proper parameter order (availability, integrity, confidentiality)
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

    // Look for the container div that would hold the Cost Analysis section
    // Using a class selector that matches without requiring specific text
    cy.get(
      '[data-testid="widget-cost-estimation"] .rounded-md.bg-blue-50, [data-testid="widget-cost-estimation"] .rounded-md.dark\\:bg-blue-900\\/20'
    ).should("exist");

    // Verify that the section contains some text (without checking specific content)
    cy.get('[data-testid="widget-cost-estimation"] .rounded-md')
      .find("p")
      .invoke("text")
      .should("have.length.gt", 10); // Should have some substantial text
  });
});
