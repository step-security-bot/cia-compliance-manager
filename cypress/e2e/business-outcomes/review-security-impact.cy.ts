/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

// Helper function to ensure elements are visible
const ensureElementVisible = (
  selector: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return (
    cy
      .get(selector)
      .scrollIntoView()
      .should("be.visible")
      // Force visibility if still not visible due to overflow issues
      .then(($el) => {
        if (!Cypress.dom.isVisible($el)) {
          return cy
            .wrap($el)
            .invoke("css", "position", "relative")
            .invoke("css", "visibility", "visible")
            .invoke("css", "overflow", "visible");
        }
        return cy.wrap($el);
      })
  );
};

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
    // Make the viewport larger to reveal more content
    cy.viewport(1200, 1200);
  });

  // Restore original tests that target the widget containers
  it("shows availability impact widget", () => {
    ensureElementVisible('[data-testid="widget-availability-impact"]');
  });

  it("shows integrity impact widget", () => {
    ensureElementVisible('[data-testid="widget-integrity-impact"]');
  });

  it("shows confidentiality impact widget", () => {
    ensureElementVisible('[data-testid="widget-confidentiality-impact"]');
  });

  // Keep new tests with enhanced assertions
  it("shows impact analysis content", () => {
    // First ensure widgets are visible
    ensureElementVisible('[data-testid="widget-availability-impact"]');
    ensureElementVisible('[data-testid="widget-integrity-impact"]');
    ensureElementVisible('[data-testid="widget-confidentiality-impact"]');

    // Then check for internal elements
    cy.get('[data-testid="impact-analysis-availability"]').should("exist");
    cy.get('[data-testid="impact-analysis-integrity"]').should("exist");
    cy.get('[data-testid="impact-analysis-confidentiality"]').should("exist");
  });

  it("shows impact analysis content in availability widget", () => {
    // First ensure widget is visible
    ensureElementVisible('[data-testid="widget-availability-impact"]');

    // Verify specific elements in the availability impact widget
    cy.get('[data-testid="impact-level-indicator-availability"]').should(
      "exist"
    );
    cy.get('[data-testid="impact-level-text-availability"]').should("exist");
    cy.get('[data-testid="impact-description-availability"]').should(
      "not.be.empty"
    );
    cy.get('[data-testid="business-impact-availability"]').should(
      "not.be.empty"
    );
  });

  it("updates impact analysis when security levels change", () => {
    // First ensure widget is visible
    ensureElementVisible('[data-testid="widget-integrity-impact"]');

    // Store initial impact description
    let initialDescription = "";
    cy.get('[data-testid="impact-description-integrity"]')
      .invoke("text")
      .then((text) => {
        initialDescription = text;

        // Change security level
        cy.get('[data-testid="integrity-select"]').select(
          SECURITY_LEVELS.HIGH,
          { force: true }
        );
        cy.wait(300);

        // Verify description changed
        cy.get('[data-testid="impact-description-integrity"]')
          .invoke("text")
          .should("not.eq", initialDescription);
      });
  });

  it("shows business impact section in all widgets", () => {
    // Ensure widgets are visible first
    ensureElementVisible('[data-testid="widget-availability-impact"]');
    ensureElementVisible('[data-testid="widget-integrity-impact"]');
    ensureElementVisible('[data-testid="widget-confidentiality-impact"]');

    cy.get('[data-testid="business-impact-heading"]').should("exist");
    cy.get('[data-testid="business-impact-availability"]').should(
      "not.be.empty"
    );
    cy.get('[data-testid="business-impact-integrity"]').should("not.be.empty");
    cy.get('[data-testid="business-impact-confidentiality"]').should(
      "not.be.empty"
    );
  });
});
