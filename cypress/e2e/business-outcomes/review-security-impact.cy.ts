/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded(); // Using our custom command
  });

  it("shows impact analysis widgets with test IDs", () => {
    // Check for availability impact analysis widget using test ID
    cy.get('[data-testid="impact-analysis-availability"]')
      .should("exist")
      .and("be.visible");

    // Check for integrity impact analysis widget using test ID
    cy.get('[data-testid="impact-analysis-integrity"]')
      .should("exist")
      .and("be.visible");

    // Check for confidentiality impact analysis widget using test ID
    cy.get('[data-testid="impact-analysis-confidentiality"]')
      .should("exist")
      .and("be.visible");
  });

  it("shows impact analysis content in availability widget", () => {
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
          .should((newText) => {
            expect(newText).not.to.eq(initialDescription);
          });
      });
  });

  it("shows business impact section in all widgets", () => {
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
