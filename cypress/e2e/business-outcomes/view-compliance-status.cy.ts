/**
 * User Story: As a user, I can see my current compliance status
 *
 * Tests that the compliance status updates correctly based on the selected security levels.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("View Compliance Status", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows compliance status widget", () => {
    // Navigate to compliance widget
    cy.navigateToWidget("widget-compliance-status");

    // Verify basic structure
    cy.get('[data-testid="compliance-status-widget"]').should("exist");
    cy.get('[data-testid="widget-compliance-status"] h3').should("exist");
  });

  it("displays compliance information using test IDs", () => {
    // Navigate to compliance widget
    cy.navigateToWidget("widget-compliance-status");

    // Check for compliance status elements
    cy.get('[data-testid="compliance-status-text"]').should("exist");
    cy.get('[data-testid="compliance-percentage"]').should("exist");
    cy.get('[data-testid="compliance-progress-bar"]').should("exist");
  });

  it("displays framework status based on security levels", () => {
    // Navigate to compliance widget
    cy.navigateToWidget("widget-compliance-status");

    // Check that frameworks list exists
    cy.get('[data-testid="compliance-frameworks-list"]').should("exist");

    // Set to high security and verify appropriate statuses
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    // Check compliance status changed
    cy.navigateToWidget("widget-compliance-status");
    cy.get('[data-testid="compliance-status-text"]').should(
      "contain",
      "Compliant"
    );

    // Check component requirements
    cy.get('[data-testid="component-requirements-heading"]').should("exist");
    cy.get('[data-testid="availability-status"]').should("exist");
    cy.get('[data-testid="integrity-status"]').should("exist");
    cy.get('[data-testid="confidentiality-status"]').should("exist");

    // Set to low security and verify percentage changes
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Navigate back to compliance widget
    cy.navigateToWidget("widget-compliance-status");

    // Verify compliance changed
    cy.get('[data-testid="compliance-percentage-value"]')
      .invoke("text")
      .then((text) => {
        const percentage = parseInt(text);
        expect(percentage).to.be.lessThan(100);
      });
  });
});
