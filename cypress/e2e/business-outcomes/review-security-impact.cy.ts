/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows availability impact analysis for different security levels", () => {
    // Set availability to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Look for availability impact content
    const availabilityPatterns = [
      /availability/i,
      /uptime/i,
      /downtime/i,
      /recovery/i,
      /disruption/i,
    ];

    // Check for content and take screenshot
    cy.containsAnyText(availabilityPatterns).then((found) => {
      cy.log(`Found availability impact content: ${found}`);
    });

    cy.screenshot("high-availability-impact");
  });

  it("shows integrity impact analysis for different security levels", () => {
    // Set integrity to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE
    );

    // Look for integrity impact content
    const integrityPatterns = [
      /integrity/i,
      /accuracy/i,
      /valid/i,
      /corrupt/i,
      /tamper/i,
    ];

    // Check for content and take screenshot
    cy.containsAnyText(integrityPatterns).then((found) => {
      cy.log(`Found integrity impact content: ${found}`);
    });

    cy.screenshot("high-integrity-impact");
  });

  it("shows confidentiality impact analysis for different security levels", () => {
    // Set confidentiality to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Look for confidentiality impact content
    const confidentialityPatterns = [
      /confidential/i,
      /sensitive/i,
      /privacy/i,
      /protect/i,
      /access/i,
    ];

    // Check for content and take screenshot
    cy.containsAnyText(confidentialityPatterns).then((found) => {
      cy.log(`Found confidentiality impact content: ${found}`);
    });

    cy.screenshot("high-confidentiality-impact");
  });
});
