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
    // Make the viewport larger to reveal more content
    cy.viewport(1200, 1200);
  });

  it("shows business impact analysis widget", () => {
    // Find and scroll to the business impact analysis widget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .scrollIntoView()
      .should("be.visible");

    // Verify the combined business impact widget is present
    cy.get('[data-testid="combined-business-impact"]').should("be.visible");
  });

  it("shows all three impact sections", () => {
    // Find business impact widget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .scrollIntoView()
      .should("be.visible");

    // Check that all three sections are present
    cy.contains("Availability Impact").should("be.visible");
    cy.contains("Integrity Impact").should("be.visible");
    cy.contains("Confidentiality Impact").should("be.visible");
  });

  it("shows introduction text for business impact analysis", () => {
    // Find business impact widget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .scrollIntoView()
      .should("be.visible");

    // Verify introduction text exists
    cy.contains("Business Impact Analysis (BIA) helps").should("be.visible");
    cy.contains("Key Benefits").should("be.visible");
    cy.contains("Business Considerations").should("be.visible");
  });

  it("updates impact analysis information when security levels change", () => {
    // Find business impact widget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .scrollIntoView()
      .should("be.visible");

    // Get the initial text content
    cy.get('[data-testid="combined-business-impact"]')
      .invoke("text")
      .then((initialText) => {
        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Verify text content has changed
        cy.get('[data-testid="combined-business-impact"]')
          .invoke("text")
          .should("not.eq", initialText);

        // Verify High level text appears
        cy.contains("High Availability").should("be.visible");
        cy.contains("High Integrity").should("be.visible");
        cy.contains("High Confidentiality").should("be.visible");
      });
  });
});
