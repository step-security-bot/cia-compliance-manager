/**
 * User Story: As a user, I can set different CIA security levels
 *
 * Tests the ability to select different security levels for
 * Confidentiality, Integrity, and Availability.
 */
import { CypressConstants } from "../../support/appConstantsHelper";

// Use constants from the namespace
const { SECURITY_LEVELS, TEST_IDS, DESCRIPTIONS } = CypressConstants;

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("allows setting individual security levels", () => {
    // Use test IDs from constants for better maintainability
    cy.getByTestId(TEST_IDS.SELECTORS.AVAILABILITY).select(
      SECURITY_LEVELS.HIGH,
      { force: true }
    );

    cy.getByTestId(TEST_IDS.SELECTORS.INTEGRITY).select(
      SECURITY_LEVELS.MODERATE,
      { force: true }
    );

    cy.getByTestId(TEST_IDS.SELECTORS.CONFIDENTIALITY).select(
      SECURITY_LEVELS.LOW,
      { force: true }
    );

    // Verify the values
    cy.getByTestId(TEST_IDS.SELECTORS.AVAILABILITY).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
    cy.getByTestId(TEST_IDS.SELECTORS.INTEGRITY).should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );
    cy.getByTestId(TEST_IDS.SELECTORS.CONFIDENTIALITY).should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });

  it("verifies radar chart exists and updates", () => {
    // Use the custom command to set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Verify radar chart using the correct test ID
    cy.getByTestId(TEST_IDS.WIDGETS.RADAR_CHART).should("exist");

    // Look for accessibility text since the canvas itself might not have a test ID
    cy.get("[aria-label*='security assessment']").should("exist");
  });

  it("verifies security widget structure", () => {
    // Check that the widget exists with expected structure
    cy.getByTestId(TEST_IDS.WIDGETS.SECURITY_LEVEL).should("exist");

    // Verify all three security level selects exist
    cy.getByTestId(TEST_IDS.SELECTORS.AVAILABILITY).should("exist");
    cy.getByTestId(TEST_IDS.SELECTORS.INTEGRITY).should("exist");
    cy.getByTestId(TEST_IDS.SELECTORS.CONFIDENTIALITY).should("exist");

    // Check label test IDs
    cy.getByTestId("availability-label").should("exist");
    cy.getByTestId("integrity-label").should("exist");
    cy.getByTestId("confidentiality-label").should("exist");
  });

  it("shows descriptions that match security levels", () => {
    // Set high availability and verify descriptions
    cy.getByTestId(TEST_IDS.SELECTORS.AVAILABILITY).select(
      SECURITY_LEVELS.HIGH,
      { force: true }
    );

    // Verify description contains expected text for high availability
    cy.getByTestId("availability-description")
      .should("be.visible")
      .invoke("text")
      .should("include", DESCRIPTIONS.AVAILABILITY.HIGH);

    // Set moderate integrity and verify
    cy.getByTestId(TEST_IDS.SELECTORS.INTEGRITY).select(
      SECURITY_LEVELS.MODERATE,
      { force: true }
    );

    cy.getByTestId("integrity-description")
      .should("be.visible")
      .invoke("text")
      .should("include", DESCRIPTIONS.INTEGRITY.MODERATE);
  });

  it("has exactly 5 options in each dropdown", () => {
    // Verify each dropdown has 5 options (None, Low, Moderate, High, Very High)
    cy.getByTestId(TEST_IDS.SELECTORS.AVAILABILITY)
      .find("option")
      .should("have.length", 5);

    cy.getByTestId(TEST_IDS.SELECTORS.INTEGRITY)
      .find("option")
      .should("have.length", 5);

    cy.getByTestId(TEST_IDS.SELECTORS.CONFIDENTIALITY)
      .find("option")
      .should("have.length", 5);
  });
});
