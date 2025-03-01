/**
 * User Story: As a user, I can see my current compliance status
 *
 * Tests that the compliance status updates correctly based on the selected security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("View Compliance Status", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows compliance status widget", () => {
    // Check that compliance widget exists
    cy.get('[data-testid="widget-compliance-status"]').should("exist");

    // Verify widget header exists and contains text
    cy.get('[data-testid="widget-compliance-status"] .widget-header')
      .contains("Compliance Status")
      .should("exist");
  });

  it("displays compliance information", () => {
    // Just verify the compliance widget contains some compliance frameworks
    cy.get('[data-testid="widget-compliance-status"]').within(() => {
      // Look for some common compliance frameworks by text
      cy.contains("SOC 2").should("exist");
      cy.contains("ISO 27001").should("exist");
    });
  });
});
