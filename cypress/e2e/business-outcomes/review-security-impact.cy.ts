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
    cy.viewport(1200, 1200);
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
    // Use specific selector with first()
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Get initial content
    let initialContent = "";
    cy.get('[data-testid="combined-business-impact"]')
      .invoke("text")
      .then((text) => {
        initialContent = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500); // Give time for updates

        // Check content changed
        cy.get('[data-testid="widget-business-impact-analysis"]')
          .first()
          .scrollIntoView();
        cy.wait(300);
        cy.get('[data-testid="combined-business-impact"]')
          .invoke("text")
          .should("not.eq", initialContent);

        // Verify specific high level text appears
        cy.contains("High Availability").should("be.visible");
        cy.contains("High Integrity").should("be.visible");
        cy.contains("High Confidentiality").should("be.visible");
      });
  });
});
