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
    
    // Save initial content text with timeout
    cy.get('[data-testid="combined-business-impact-widget"]', { timeout: 5000 })
      .should("exist")
      .invoke("text")
      .as("initialImpactText");
    
    // Change to high security levels and wait longer
    cy.setSecurityLevels("High", "High", "High");
    cy.wait(2000); // Wait longer to ensure changes propagate
    
    // Re-fetch the widget and compare text with more explicit assertion
    cy.get('[data-testid="combined-business-impact-widget"]', { timeout: 5000 })
      .should("exist")
      .invoke("text")
      .then(function(newText) {
        // Use substring comparison in case only part of the text changes
        cy.wrap(newText).should("not.eq", this.initialImpactText);
      });
  });
});
