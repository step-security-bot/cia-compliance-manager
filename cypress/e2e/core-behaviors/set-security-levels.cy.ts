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
    // Navigate to security profile
    cy.navigateToWidget("widget-security-profile");

    // Check initial description
    cy.get('[data-testid="availability-description"]')
      .invoke("text")
      .as("initialDescription");

    // Change security level
    cy.get("#availability-select").select(SECURITY_LEVELS.HIGH);

    // Verify description changed
    cy.get('[data-testid="availability-description"]')
      .invoke("text")
      .then(function (currentText) {
        expect(currentText).not.to.equal(this.initialDescription);
      });

    // Check for High level text in description
    cy.get('[data-testid="availability-description"]').should(
      "contain",
      "high"
    );
  });
});
