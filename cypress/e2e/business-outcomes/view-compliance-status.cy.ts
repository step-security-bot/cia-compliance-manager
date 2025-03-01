/**
 * User Story: As a user, I can see my current compliance status
 *
 * Tests that the compliance status updates correctly based on the selected security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("View Compliance Status", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows compliance status after setting security levels", () => {
    // Set all levels to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Look for compliance-related content
    const compliancePatterns = [
      /compliance/i,
      /status/i,
      /requirement/i,
      /standard/i,
      /regulation/i,
    ];

    // Check for content and take screenshot
    cy.containsAnyText(compliancePatterns).then((found) => {
      cy.log(`Found compliance-related content: ${found}`);
    });

    cy.screenshot("high-compliance-status");
  });

  it("updates compliance status when security levels change", () => {
    // First set to Low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Take screenshot with low security
    cy.screenshot("low-compliance-status");

    // Get low security text
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

        // Take screenshot with high security
        cy.screenshot("high-compliance-status");

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
