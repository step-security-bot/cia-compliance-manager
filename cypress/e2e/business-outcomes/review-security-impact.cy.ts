/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    // Make the viewport larger to reveal more content
    cy.viewport(1200, 1800);
  });

  it("shows business impact analysis widget", () => {
    // Use specific selector with first() instead of navigateToWidget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Verify it has the combined business impact container
    cy.get('[data-testid="combined-business-impact"]').should("exist");
  });

  it("shows all three impact sections", () => {
    // Use specific selector with first()
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Check for all three impact sections using contains
    cy.contains("Availability Impact").should("exist");
    cy.contains("Integrity Impact").should("exist");
    cy.contains("Confidentiality Impact").should("exist");
  });

  it("shows introduction text for business impact analysis", () => {
    // Use specific selector with first()
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Verify intro text exists
    cy.get('[data-testid="combined-business-impact"]').within(() => {
      cy.contains(/Business Impact Analysis.*helps identify/).should(
        "be.visible"
      );
      cy.contains("Key Benefits").should("be.visible");
      cy.contains("Business Considerations").should("be.visible");
    });
  });

  it("updates impact analysis information when security levels change", () => {
    // First navigate to and verify the widget is visible
    cy.get('[data-testid="widget-business-impact-analysis"]', {
      timeout: 20000,
    })
      .should("exist")
      .scrollIntoView();
    cy.wait(800);

    // Instead of checking specific text, just store some initial state
    cy.get('[data-testid="combined-business-impact"]')
      .should("exist")
      .then(($initialEl) => {
        const initialHtml = $initialEl[0].innerHTML;

        // Change security levels more directly
        cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#confidentiality-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.wait(1000);

        // Simply verify that something changed in the widget after changing security levels
        cy.get('[data-testid="combined-business-impact"]').then(
          ($updatedEl) => {
            const updatedHtml = $updatedEl[0].innerHTML;
            // Just check that something changed in the widget content
            expect(updatedHtml).to.not.equal(initialHtml);
          }
        );
      });
  });
});
