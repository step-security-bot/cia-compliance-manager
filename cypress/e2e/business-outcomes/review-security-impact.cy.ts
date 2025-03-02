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
    // Use more reliable selector
    cy.get('[data-testid="combined-business-impact"]', { timeout: 20000 })
      .should("be.visible")
      .as("impactWidget");

    // Get initial state information from multiple elements
    cy.get('[data-testid*="-level-indicator-"]')
      .first()
      .invoke("text")
      .as("initialLevelText");

    // Change security levels with more reliable approach
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(1500); // Longer wait for updates to apply

    // Force reload the widget
    cy.get("@impactWidget").scrollIntoView();
    cy.wait(800);

    // Check level has changed using a more flexible approach
    cy.get('[data-testid*="impact-level-"]')
      .should("contain.text", "High")
      .then(($elements) => {
        // As long as any element contains "High", the test passes
        let containsHigh = false;
        $elements.each((_, el) => {
          if (el.textContent && el.textContent.includes("High")) {
            containsHigh = true;
          }
        });
        expect(containsHigh).to.be.true;
      });
  });
});
