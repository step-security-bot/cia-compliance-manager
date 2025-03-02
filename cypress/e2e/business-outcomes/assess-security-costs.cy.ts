/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1200, 900);
  });

  it("shows cost estimation widget", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget("widget-cost-estimation");

    // Check basic cost estimation content
    cy.get('[data-testid="cost-estimation-content"]').should("be.visible");
  });

  it("shows cost estimates and values", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget("widget-cost-estimation");

    // Check for CAPEX and OPEX sections
    cy.get('[data-testid="capex-section"]').should("exist");
    cy.get('[data-testid="opex-section"]').should("exist");

    // Check for estimate values
    cy.get('[data-testid="capex-estimate-value"]').should("exist");
    cy.get('[data-testid="opex-estimate-value"]').should("exist");
  });

  it("shows value creation widget", () => {
    // Navigate to value creation widget
    cy.navigateToWidget("widget-value-creation");

    // Check value creation content
    cy.get('[data-testid="value-creation-content"]').should("be.visible");
  });

  it("updates costs when security levels change", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget("widget-cost-estimation");

    // Get initial CAPEX value
    let initialCapex = "";
    cy.get('[data-testid="capex-estimate-value-value"]')
      .invoke("text")
      .then((text) => {
        initialCapex = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Navigate back to cost estimation and check values changed
        cy.navigateToWidget("widget-cost-estimation");
        cy.get('[data-testid="capex-estimate-value-value"]')
          .invoke("text")
          .should("not.eq", initialCapex);
      });
  });

  it("shows ROI estimate", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget("widget-cost-estimation");

    // Check ROI section
    cy.get('[data-testid="roi-section"]').should("exist");
    cy.get('[data-testid="roi-estimate"]').should("exist");
    cy.get('[data-testid="roi-estimate-value"]').should("be.visible");
  });
});
