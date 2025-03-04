/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows business impact analysis widget", () => {
    // Ensure the business impact widget is visible
    cy.navigateToWidget("widget-business-impact");
    cy.get('[data-testid="widget-business-impact"]').should("exist");
  });

  it("shows introduction text for business impact analysis", () => {
    // Verify that a heading or introductory text is rendered
    cy.contains("Business Impact Analysis").should("exist");
    // Check that impact summary text is visible
    cy.get('[data-testid="combined-business-impact-widget"]').should("exist");
  });

  it("updates impact analysis information when security levels change", () => {
    cy.navigateToWidget("widget-business-impact");
    // Save initial text from impact summary
    cy.get('[data-testid="combined-business-impact-widget"]')
      .invoke("text")
      .as("initialImpactText");
    cy.setSecurityLevels("High", "High", "High");
    cy.wait(1000);
    cy.get('[data-testid="combined-business-impact-widget"]')
      .invoke("text")
      .then(function (newText) {
        expect(newText).not.to.eq(this.initialImpactText);
      });
  });
});
