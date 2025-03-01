/**
 * User Story: As a user, I can set different CIA security levels
 *
 * Tests the ability to select different security levels for
 * Confidentiality, Integrity, and Availability.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command to ensure React has rendered
  });

  it("allows setting individual security levels", () => {
    // Use the custom command that uses specific data-testid selectors
    // Simply verify that we can set values and they're reflected in the select
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

  it("verifies the radar chart exists", () => {
    // Just test for the existence of the chart elements
    cy.get('[data-testid="radar-chart"]').should("exist");
    cy.get('[data-testid="radar-chart-canvas"]').should("exist");
  });

  it("verifies the security widget structure", () => {
    // Check that the widget exists with expected structure
    cy.get('[data-testid="widget-security-level-selection"]').should("exist");
    cy.get('[data-testid="security-level-controls"]').should("exist");

    // Verify all three security level selects exist
    cy.get('[data-testid="availability-select"]').should("exist");
    cy.get('[data-testid="integrity-select"]').should("exist");
    cy.get('[data-testid="confidentiality-select"]').should("exist");
  });

  it("verifies security level descriptions exist", () => {
    // Just verify that description paragraphs exist
    cy.get('[data-testid="availability-select"]')
      .parent()
      .find("p")
      .should("exist");
    cy.get('[data-testid="integrity-select"]')
      .parent()
      .find("p")
      .should("exist");
    cy.get('[data-testid="confidentiality-select"]')
      .parent()
      .find("p")
      .should("exist");
  });

  it("verifies selections can be changed", () => {
    // Set and verify "Low" for all
    cy.get('[data-testid="availability-select"]').select(SECURITY_LEVELS.LOW);
    cy.get('[data-testid="integrity-select"]').select(SECURITY_LEVELS.LOW);
    cy.get('[data-testid="confidentiality-select"]').select(
      SECURITY_LEVELS.LOW
    );

    // Verify values changed
    cy.get('[data-testid="availability-select"]').should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
    cy.get('[data-testid="integrity-select"]').should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
    cy.get('[data-testid="confidentiality-select"]').should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });

  it("shows all security level options", () => {
    // Just verify each dropdown has 5 options
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
});
