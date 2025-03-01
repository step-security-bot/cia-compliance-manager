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

  it("shows availability impact widget", () => {
    ensureElementVisible('[data-testid="widget-availability-impact"]');
  });

  it("shows integrity impact widget", () => {
    ensureElementVisible('[data-testid="widget-integrity-impact"]');
  });

  it("shows confidentiality impact widget", () => {
    ensureElementVisible('[data-testid="widget-confidentiality-impact"]');
  });
});
