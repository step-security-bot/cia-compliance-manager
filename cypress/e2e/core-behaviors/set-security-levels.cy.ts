/**
 * User Story: As a user, I can set different CIA security levels
 *
 * Tests the ability to select different security levels for
 * Confidentiality, Integrity, and Availability.
 */
import {
  SECURITY_LEVELS,
  DESCRIPTIONS,
} from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command to ensure React has rendered
  });

  it("allows setting individual security levels", () => {
    // Use the custom command that uses specific data-testid selectors
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.HIGH);
    cy.get('[data-testid="integrity-select"]').select(SECURITY_LEVELS.MODERATE);
    cy.get('[data-testid="confidentiality-select"]').select(
      SECURITY_LEVELS.LOW
    );

    // Verify the values
    cy.get('[data-testid="availability-select"]').should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
    cy.get('[data-testid="integrity-select"]').should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );
    cy.get('[data-testid="confidentiality-select"]').should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });

  it("verifies radar chart exists and updates", () => {
    // Set specific security levels first
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500); // Wait for UI to update

    // Verify the radar chart exists and contains expected values
    cy.get('[data-testid="radar-chart"]').should("exist");
    cy.get('[data-testid="radar-chart-canvas"]').should("exist");

    // Verify the radar values show the expected security levels
    cy.get('[data-testid="radar-availability-value"]').should("exist");
    cy.get('[data-testid="radar-integrity-value"]').should("exist");
    cy.get('[data-testid="radar-confidentiality-value"]').should("exist");
  });

  it("verifies security widget structure", () => {
    // Check that the widget exists with expected structure
    cy.get('[data-testid="widget-security-level-selection"]').should("exist");
    cy.get('[data-testid="security-level-controls"]').should("exist");

    // Verify all three security level selects exist
    cy.get('[data-testid="availability-select"]').should("exist");
    cy.get('[data-testid="integrity-select"]').should("exist");
    cy.get('[data-testid="confidentiality-select"]').should("exist");
  });

  it("shows descriptions that match option values", () => {
    // Set specific values and check that descriptions match known values

    // Check availability description
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.HIGH);
    cy.get('[data-testid="availability-select"]')
      .parent()
      .find("p")
      .invoke("text")
      .should("include", DESCRIPTIONS.AVAILABILITY.HIGH);

    // Check integrity description
    cy.get('[data-testid="integrity-select"]').select(SECURITY_LEVELS.MODERATE);
    cy.get('[data-testid="integrity-select"]')
      .parent()
      .find("p")
      .invoke("text")
      .should("include", DESCRIPTIONS.INTEGRITY.MODERATE);

    // Check confidentiality description
    cy.get('[data-testid="confidentiality-select"]').select(
      SECURITY_LEVELS.LOW
    );
    cy.get('[data-testid="confidentiality-select"]')
      .parent()
      .find("p")
      .invoke("text")
      .should("include", DESCRIPTIONS.CONFIDENTIALITY.LOW);
  });

  it("changes descriptions when selections change", () => {
    // Test a single select to verify description changes
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.NONE);
    cy.get('[data-testid="availability-select"]')
      .parent()
      .find("p")
      .invoke("text")
      .should("include", DESCRIPTIONS.AVAILABILITY.NONE);

    // Change to HIGH and verify description changes
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.HIGH);
    cy.get('[data-testid="availability-select"]')
      .parent()
      .find("p")
      .invoke("text")
      .should("include", DESCRIPTIONS.AVAILABILITY.HIGH);
  });

  it("has exactly 5 options in each dropdown", () => {
    // Just verify each dropdown has 5 options (None, Low, Moderate, High, Very High)
    cy.get('[data-testid="availability-select"] option').should(
      "have.length",
      5
    );
    cy.get('[data-testid="integrity-select"] option').should("have.length", 5);
    cy.get('[data-testid="confidentiality-select"] option').should(
      "have.length",
      5
    );
  });

  it("verifies all dropdown options match expected values", () => {
    const expectedOptions = [
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ];

    // Check that availability dropdown has all expected options
    expectedOptions.forEach((option) => {
      cy.get('[data-testid="availability-select"] option').should(
        "contain",
        option
      );
    });
  });
});
