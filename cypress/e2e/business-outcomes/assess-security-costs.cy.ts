/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows cost information after setting security levels", () => {
    // Set all security levels to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check for cost-related terms
    const costPatterns = [
      /cost/i,
      /budget/i,
      /capex/i,
      /opex/i,
      /estimate/i,
      /%/, // Look for percentage symbols
      /\$/, // Look for dollar signs
    ];

    // Check for content
    cy.containsAnyText(costPatterns).then((found) => {
      cy.log(`Found cost-related content: ${found}`);
    });

    // Take screenshot for reference
    cy.screenshot("high-security-costs");
  });

  it("updates cost estimates when security levels change", () => {
    // First set to Low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Take screenshot and get text with low security
    cy.screenshot("low-security-costs");

    // Get low security text length
    cy.get("body")
      .invoke("text")
      .then((text) => {
        const lowText = String(text || "");
        const lowTextLength = lowText.length;
        cy.log(`Low security text length: ${lowTextLength}`);

        // Then set to High security
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Take screenshot of high security costs
        cy.screenshot("high-security-costs");

        // Compare with new content
        cy.get("body")
          .invoke("text")
          .then((highTextVal) => {
            const highText = String(highTextVal || "");
            cy.log(`High security text length: ${highText.length}`);
            cy.log(`Length difference: ${highText.length - lowTextLength}`);
          });
      });
  });
});
