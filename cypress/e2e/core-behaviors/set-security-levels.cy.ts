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
    // Check default values are "None" as per DOM
    cy.get("#availability-select").should("have.value", "None");
    cy.get("#integrity-select").should("have.value", "None");
    // Change security levels
    cy.get("#availability-select").select("Low");
    cy.get("#availability-select").should("have.value", "Low");
    cy.get("#integrity-select").select("High");
    cy.get("#integrity-select").should("have.value", "High");
  });

  it("verifies radar chart updates with security level changes", () => {
    // Assert the radar chart container exists
    cy.get('[data-testid="radar-chart-visualization-container"]').should(
      "exist"
    );
    // Capture initial radar availability text (e.g.: "A: None")
    cy.get('[data-testid="radar-availability-value"]')
      .invoke("text")
      .as("initialRadarValue");
    // Change availability to "High"
    cy.get("#availability-select").select("High");
    cy.wait(500);
    cy.get('[data-testid="radar-availability-value"]')
      .invoke("text")
      .then(function (newValue) {
        // Verify that the value has updated from "None" to something else like "A: High"
        expect(newValue).not.to.eq(this.initialRadarValue);
      });
  });

  it("verifies security widget structure", () => {
    // Check for security level controls
    cy.get('[data-testid="security-level-controls"]').should("exist");
    // Check for all three select elements
    cy.get("#availability-select").should("exist");
    cy.get("#integrity-select").should("exist");
    cy.get("#confidentiality-select").should("exist");
    // Minimal check for descriptions
    cy.get('[data-testid="availability-description"]').should("exist");
    cy.get('[data-testid="integrity-description"]').should("exist");
    cy.get('[data-testid="confidentiality-description"]').should("exist");
  });

  it("shows descriptions that match security levels", () => {
    // Check that a security description element exists and updates when level changes
    cy.get('[data-testid="availability-description"]').should("exist");
    cy.get("#availability-select").select("Low", { force: true });
    cy.wait(300);
    // The attribute "data-testlevel" should update to "Low"
    cy.get('[data-testid="availability-description"]').should(
      "have.attr",
      "data-testlevel",
      "Low"
    );
  });
});
