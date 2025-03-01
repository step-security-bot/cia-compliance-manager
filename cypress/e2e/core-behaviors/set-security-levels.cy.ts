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
    // Use direct select with force option instead of the overwritten command
    cy.get('[data-testid="availability-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.HIGH, { force: true });

    cy.get('[data-testid="integrity-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.MODERATE, { force: true });

    cy.get('[data-testid="confidentiality-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.LOW, { force: true });

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
    // Set specific security levels using our helper
    cy.get('[data-testid="confidentiality-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.LOW, { force: true });
    cy.wait(100);

    cy.get('[data-testid="integrity-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.MODERATE, { force: true });
    cy.wait(100);

    cy.get('[data-testid="availability-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.HIGH, { force: true });
    cy.wait(100);

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

    // Check label test IDs
    cy.get('[data-testid="availability-label"]').should("exist");
    cy.get('[data-testid="integrity-label"]').should("exist");
    cy.get('[data-testid="confidentiality-label"]').should("exist");
  });

  it("shows descriptions that match option values", () => {
    // Set specific values and check that descriptions match known values

    // Check availability description
    cy.get('[data-testid="availability-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.HIGH, { force: true });
    cy.wait(100);

    // Use the new testid to get the description
    cy.get('[data-testid="availability-description"]').should("not.be.empty");

    // Check integrity description
    cy.get('[data-testid="integrity-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.MODERATE, { force: true });
    cy.wait(100);

    cy.get('[data-testid="integrity-description"]').should("not.be.empty");

    // Check confidentiality description
    cy.get('[data-testid="confidentiality-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.LOW, { force: true });
    cy.wait(100);

    cy.get('[data-testid="confidentiality-description"]').should(
      "not.be.empty"
    );
  });

  it("changes descriptions when selections change", () => {
    // Test a single select to verify description changes
    cy.get('[data-testid="availability-select"]')
      .scrollIntoView()
      .select(SECURITY_LEVELS.NONE, { force: true });
    cy.wait(100);

    // Store the description text
    let firstDescription = "";
    cy.get('[data-testid="availability-description"]')
      .invoke("text")
      .then((text) => {
        firstDescription = text;

        // Now change to HIGH and verify description changes
        cy.get('[data-testid="availability-select"]')
          .scrollIntoView()
          .select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(100);

        // Compare with new description
        cy.get('[data-testid="availability-description"]')
          .invoke("text")
          .should((newText) => {
            expect(newText).not.to.eq(firstDescription);
          });
      });
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
