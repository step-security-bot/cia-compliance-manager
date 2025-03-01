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

  it("shows availability impact widget", () => {
    // Check that impact widgets exist
    cy.get('[data-testid="widget-availability-impact"]')
      .should("exist")
      .and("be.visible");

    // Take screenshot of widget
    cy.screenshot("availability-impact-widget");
  });

  it("shows integrity impact widget", () => {
    // Check that impact widgets exist
    cy.get('[data-testid="widget-integrity-impact"]')
      .should("exist")
      .and("be.visible");

    // Take screenshot of widget
    cy.screenshot("integrity-impact-widget");
  });

  it("shows confidentiality impact widget", () => {
    // Check that impact widgets exist
    cy.get('[data-testid="widget-confidentiality-impact"]')
      .should("exist")
      .and("be.visible");

    // Take screenshot of widget
    cy.screenshot("confidentiality-impact-widget");
  });
});
