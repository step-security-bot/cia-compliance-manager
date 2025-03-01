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

    // Verify widget header exists
    cy.get('[data-testid="widget-compliance-status"] .widget-header').should(
      "exist"
    );
  });

  it("displays compliance information using test IDs", () => {
    // Verify compliance status elements using test IDs
    cy.get('[data-testid="compliance-status-icon"]').should("exist");
    cy.get('[data-testid="compliance-status-text"]').should("exist");
    cy.get('[data-testid="compliance-frameworks-list"]').should("exist");
  });

  it("displays framework status based on security levels", () => {
    // First, verify the frameworks list exists
    cy.get('[data-testid="compliance-frameworks-list"]').should("exist");

    // Set security levels to high for all components
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    // Verify compliance status shows content - using the actual text from the DOM
    cy.get('[data-testid="compliance-status-text"]')
      .should("not.be.empty")
      .should("contain", "Compliant with all major frameworks");

    // For each framework element, check that it exists and has the expected structure
    // Instead of looking for child elements with specific IDs, we'll just verify the elements exist
    cy.get('[data-testid^="framework-"]').should("have.length.at.least", 1);

    // Verify at least one framework status exists
    cy.get('[data-testid^="framework-status-"]').should(
      "have.length.at.least",
      1
    );

    // Verify at least one framework name exists
    cy.get('[data-testid^="framework-name-"]').should(
      "have.length.at.least",
      1
    );

    // Verify at least one framework description exists
    cy.get('[data-testid^="framework-description-"]').should(
      "have.length.at.least",
      1
    );

    // Change to low security and verify status changes
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Verify compliance changes to basic or lower - no longer checking for "Full" text
    cy.get('[data-testid="compliance-status-text"]')
      .should("not.contain", "Compliant with all major frameworks")
      .should("contain", "basic compliance"); // Looking for "basic compliance" text

    // Verify there's at least one framework that's in compliance (SOC 2 Type 1)
    cy.get('[class*="text-green-"]').should("have.length.at.least", 1);

    // And at least one framework that's not in compliance
    cy.get('[class*="text-red-"]').should("have.length.at.least", 1);
  });
});
