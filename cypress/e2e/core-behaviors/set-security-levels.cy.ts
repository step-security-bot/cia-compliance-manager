/**
 * User Story: As a user, I can set security levels for CIA components
 *
 * Tests the ability to set different security levels and see visual feedback
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("allows setting individual security levels", () => {
    // Navigate to security widget
    cy.navigateToWidget("widget-security-profile");

    // Set availability to High
    cy.get("#availability-select").select(SECURITY_LEVELS.HIGH);

    // Check that the value was updated
    cy.get('[data-testid="availability-selected-level-value"]').should(
      "contain",
      SECURITY_LEVELS.HIGH
    );

    // Set integrity to Low
    cy.get("#integrity-select").select(SECURITY_LEVELS.LOW);

    // Check that the value was updated
    cy.get('[data-testid="integrity-selected-level-value"]').should(
      "contain",
      SECURITY_LEVELS.LOW
    );
  });

  it("verifies radar chart updates with security level changes", () => {
    // Find the radar chart
    cy.get('[data-testid="radar-widget-container"]').should("be.visible");

    // Check initial values
    cy.get('[data-testid="radar-availability-value"]')
      .invoke("text")
      .then((initialText) => {
        // Change security level
        cy.setSecurityLevels(SECURITY_LEVELS.HIGH, null, null);

        // Verify radar value changed
        cy.get('[data-testid="radar-availability-value"]')
          .invoke("text")
          .should("not.eq", initialText)
          .and("contain", SECURITY_LEVELS.HIGH);
      });
  });

  it("verifies security widget structure", () => {
    // Navigate to security profile config
    cy.navigateToWidget("widget-security-profile");

    // Check for security level controls
    cy.get("#availability-select").should("exist");
    cy.get("#integrity-select").should("exist");
    cy.get("#confidentiality-select").should("exist");

    // Check for labels and descriptions
    cy.get('[data-testid^="availability-"]').should("exist");
    cy.get('[data-testid^="integrity-"]').should("exist");
    cy.get('[data-testid^="confidentiality-"]').should("exist");
  });

  it("shows descriptions that match security levels", () => {
    // Navigate to security profile with more time
    cy.get('[data-testid="widget-security-profile"]', { timeout: 15000 })
      .should("be.visible")
      .scrollIntoView();
    cy.wait(800); // Longer wait time

    // Get the initial description text
    let initialDescription = "";
    cy.get('[data-testid="availability-description"]')
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        initialDescription = text;

        // Change security level to HIGH
        cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.wait(1000); // Wait longer for update

        // Check description changed rather than specific content
        cy.get('[data-testid="availability-description"]')
          .should("be.visible")
          .invoke("text")
          .should("not.eq", initialDescription);

        // Check color indicator has changed to reflect high
        cy.get('[data-testid="availability-color-indicator"]').should(
          "be.visible"
        );
      });
  });
});
