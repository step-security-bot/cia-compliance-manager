/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import { assert } from "../common-imports";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows cost estimation widget with test IDs", () => {
    // Check that the cost estimation widget exists and has content
    cy.get('[data-testid="cost-estimation-content"]').should("exist");

    // Verify estimated cost heading and labels
    cy.get('[data-testid="estimated-cost-heading"]').should("exist");
    cy.get('[data-testid="capex-label"]').should("exist");
    cy.get('[data-testid="opex-label"]').should("exist");
  });

  it("shows cost percentages using test IDs", () => {
    // Verify that cost percentages exist
    cy.get('[data-testid="capex-percentage"]').should("exist");
    cy.get('[data-testid="opex-percentage"]').should("exist");

    // Verify progress bars
    cy.get('[data-testid="capex-progress-bar"]').should("exist");
    cy.get('[data-testid="opex-progress-bar"]').should("exist");

    // Verify estimates
    cy.get('[data-testid="capex-estimate"]').should("not.be.empty");
    cy.get('[data-testid="opex-estimate"]').should("not.be.empty");
  });

  it("shows value creation widget with test IDs", () => {
    // Set security levels to get value creation content
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.wait(300);

    // Verify value creation widget exists
    cy.get('[data-testid="value-creation-content"]').should("exist");
    cy.get('[data-testid="value-creation-title"]').should("exist");
    cy.get('[data-testid="value-creation-subtitle"]').should("exist");

    // Verify value points list exists and has items
    cy.get('[data-testid="value-points-list"]').should("exist");
    cy.get('[data-testid="value-point-0"]').should("exist");

    // Verify ROI information
    cy.get('[data-testid="roi-label"]').should("exist");
    cy.get('[data-testid="roi-value"]').should("not.be.empty");
  });

  it("shows cost analysis section using test IDs", () => {
    // Set security levels to high for detailed cost analysis
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    // Verify cost analysis section exists
    cy.get('[data-testid="cost-analysis-section"]').should("exist");
    cy.get('[data-testid="cost-analysis-heading"]').should("exist");
    cy.get('[data-testid="cost-analysis-text"]').should("not.be.empty");
  });

  it("updates cost information when security levels change", () => {
    // Get initial CAPEX percentage
    let initialCapex = "";
    cy.get('[data-testid="capex-percentage"]')
      .invoke("text")
      .then((text) => {
        initialCapex = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Verify CAPEX changed - fixed TypeScript error
        cy.get('[data-testid="capex-percentage"]')
          .invoke("text")
          .should("not.eq", initialCapex);

        // Verify other elements updated too
        cy.get('[data-testid="cost-analysis-text"]').should("not.be.empty");
        cy.get('[data-testid="value-creation-title"]').should("not.be.empty");
      });
  });
});
