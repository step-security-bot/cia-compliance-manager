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
    // Make the viewport larger to reveal more content
    cy.viewport(2000, 2000);
  });

  it("allows setting individual security levels", () => {
    // Verify the default value is Moderate (this is safer than assuming None)
    cy.get("#availability-select").should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );
    cy.get("#integrity-select").should("have.value", SECURITY_LEVELS.MODERATE);

    // Change security levels and verify the select values change
    cy.get("#availability-select").select(SECURITY_LEVELS.LOW);
    cy.get("#availability-select").should("have.value", SECURITY_LEVELS.LOW);

    cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH);
    cy.get("#integrity-select").should("have.value", SECURITY_LEVELS.HIGH);
  });

  it("verifies radar chart updates with security level changes", () => {
    // Check initial radar values using data-testvalue attribute
    cy.get('[data-testid="radar-availability-value"]').should(
      "contain",
      SECURITY_LEVELS.MODERATE
    );

    // Change security level using helper function
    cy.get("#availability-select").select(SECURITY_LEVELS.HIGH);

    // Verify radar value changed using contains (more reliable than text comparison)
    cy.get('[data-testid="radar-availability-value"]').should(
      "contain",
      SECURITY_LEVELS.HIGH
    );
  });

  it("verifies security widget structure", () => {
    // Check for security level controls
    cy.get('[data-testid="security-level-controls"]').should("exist");

    // Check for all three select elements
    cy.get("#availability-select").should("exist");
    cy.get("#integrity-select").should("exist");
    cy.get("#confidentiality-select").should("exist");

    // Very minimal check for descriptions - just verify they exist
    cy.get('[data-testid="availability-description"]').should("exist");
    cy.get('[data-testid="integrity-description"]').should("exist");
    cy.get('[data-testid="confidentiality-description"]').should("exist");
  });

  it("shows descriptions that match security levels", () => {
    // First verify default values are "Moderate" using data-testvalue attributes
    cy.get('[data-testid="availability-color-indicator"]').should(
      "have.attr",
      "data-testvalue",
      SECURITY_LEVELS.MODERATE
    );

    // Change security level
    cy.get("#availability-select").select(SECURITY_LEVELS.LOW, { force: true });
    cy.wait(300);

    // Verify the data-testvalue attribute was updated to "Low"
    cy.get('[data-testid="availability-color-indicator"]').should(
      "have.attr",
      "data-testvalue",
      SECURITY_LEVELS.LOW
    );

    // Also verify the data-testlevel attribute was updated on description
    cy.get('[data-testid="availability-description"]').should(
      "have.attr",
      "data-testlevel",
      SECURITY_LEVELS.LOW
    );
  });
});
