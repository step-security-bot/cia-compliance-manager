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
  });

  it("shows cost estimation widget", () => {
    // Find and scroll to the cost estimation widget
    cy.get('[data-testid="widget-cost-estimation"]')
      .scrollIntoView()
      .should("be.visible");
  });

  it("shows cost estimates and values", () => {
    // Find the cost estimation widget
    cy.get('[data-testid="widget-cost-estimation"]')
      .scrollIntoView()
      .should("be.visible");

    // Check for CAPEX and OPEX sections
    cy.get('[data-testid="capex-section"]').should("exist");
    cy.get('[data-testid="opex-section"]').should("exist");

    // Check for estimate values
    cy.get('[data-testid="capex-estimate-value"]').should("exist");
    cy.get('[data-testid="opex-estimate-value"]').should("exist");
  });

  it("shows value creation widget", () => {
    // Find and scroll to the value creation widget
    cy.get('[data-testid="widget-value-creation"]')
      .scrollIntoView()
      .should("be.visible");
  });

  it("updates costs when security levels change", () => {
    // Find cost estimation widget
    cy.get('[data-testid="widget-cost-estimation"]')
      .scrollIntoView()
      .should("be.visible");

    // Store initial CAPEX value
    cy.get('[data-testid="capex-estimate-value"]')
      .invoke("text")
      .then((initialCapex) => {
        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Verify CAPEX value has changed
        cy.get('[data-testid="capex-estimate-value"]')
          .invoke("text")
          .should("not.eq", initialCapex);
      });
  });

  it("shows ROI estimate", () => {
    // Find cost estimation widget
    cy.get('[data-testid="widget-cost-estimation"]')
      .scrollIntoView()
      .should("be.visible");

    // Check ROI section exists
    cy.get('[data-testid="roi-section"]').should("exist");
    cy.get('[data-testid="roi-estimate"]').should("exist");
  });
});
