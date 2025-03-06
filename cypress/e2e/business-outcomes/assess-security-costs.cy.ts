/**
 * User Story: As a user, I can see cost estimates for my security choices
 *
 * Tests that cost estimations update based on security level selections.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import {
  interactWithElement,
  waitForElement,
} from "../../support/test-helpers";
import { COST_TEST_IDS, WIDGET_TEST_IDS } from "../../../src/constants/testIds";

describe("Assess Security Costs", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(2000, 2000);
    // Make sure everything is loaded by waiting longer
    cy.wait(1000);
  });

  it("shows cost estimation widget", () => {
    // Use more robust selector with safeScrollIntoView instead of scrollIntoView
    cy.get(`[data-testid="${WIDGET_TEST_IDS.COST_ESTIMATION}"]`, { timeout: 15000 })
      .should("exist")
      .safeScrollIntoView({ force: true });

    cy.get(`[data-testid="${COST_TEST_IDS.COST_ESTIMATION_CONTENT}"]`, {
      timeout: 10000,
    }).should("be.visible");
  });

  it("shows cost estimates and values", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget(WIDGET_TEST_IDS.COST_ESTIMATION);

    // Check for CAPEX and OPEX sections
    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_SECTION}"]`).should("exist");
    cy.get(`[data-testid="${COST_TEST_IDS.OPEX_SECTION}"]`).should("exist");

    // Check for estimate values
    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}"]`).should("exist");
    cy.get(`[data-testid="${COST_TEST_IDS.OPEX_ESTIMATE_VALUE}"]`).should("exist");
  });

  it("shows value creation widget", () => {
    // Navigate to value creation widget
    cy.navigateToWidget(WIDGET_TEST_IDS.VALUE_CREATION);

    // Check value creation content
    cy.get(`[data-testid="${WIDGET_TEST_IDS.VALUE_CREATION_CONTENT}"]`).should("be.visible");
  });

  it.skip("updates costs when security levels change", () => {
    // Navigate to cost estimation widget with safeScrollIntoView
    cy.get(`[data-testid="${WIDGET_TEST_IDS.COST_ESTIMATION}"]`, {
      timeout: 15000,
    }).safeScrollIntoView({ force: true });
    cy.wait(500);

    // Get initial CAPEX value with retry logic
    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}"]`, { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const initialCapex = text;

        // Change security levels with force option
        cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#confidentiality-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.wait(1000); // Wait for changes to process

        // Check values changed using safeScrollIntoView
        cy.get(`[data-testid="${WIDGET_TEST_IDS.COST_ESTIMATION}"]`, {
          timeout: 10000,
        }).safeScrollIntoView({ force: true });
        cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}"]`, { timeout: 10000 })
          .should("be.visible")
          .invoke("text")
          .should("not.eq", initialCapex);
      });
  });

  it("shows ROI estimate", () => {
    // Navigate to cost estimation widget
    cy.navigateToWidget(WIDGET_TEST_IDS.COST_ESTIMATION);

    // Check ROI section
    cy.get(`[data-testid="${COST_TEST_IDS.ROI_SECTION}"]`).should("exist");
    cy.get(`[data-testid="${COST_TEST_IDS.ROI_ESTIMATE}"]`).should("exist");
    cy.get(`[data-testid="${COST_TEST_IDS.ROI_ESTIMATE_VALUE}"]`).should("be.visible");
  });
});
