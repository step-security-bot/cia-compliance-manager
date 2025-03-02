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
    // Check that compliance widget exists
    cy.get('[data-testid="widget-compliance-status"]')
      .scrollIntoView()
      .should("exist");

    // Verify widget has proper structure
    cy.get('[data-testid="widget-compliance-status"] h3').should("exist");
    cy.get('[data-testid="compliance-status-widget"]').should("exist");
  });

  it("displays compliance information using test IDs", () => {
    // Verify compliance status elements using test IDs
    cy.get('[data-testid="compliance-status-text"]').should("exist");
    cy.get('[data-testid="compliance-percentage"]').should("exist");
    cy.get('[data-testid="compliance-progress-bar"]').should("exist");
  });

  it("displays framework status based on security levels", () => {
    // First, verify the frameworks list exists
    cy.get('[data-testid="compliance-frameworks-list"]').should("exist");

    // Set security levels to high for all components
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    // Verify compliance status shows compliance
    cy.get('[data-testid="compliance-status-text"]').should(
      "contain",
      "Compliant"
    );

    // Verify the component requirements section exists
    cy.get('[data-testid="component-requirements-heading"]').should("exist");

    // Check status displays for components
    cy.get('[data-testid="availability-status"]').should("exist");
    cy.get('[data-testid="integrity-status"]').should("exist");
    cy.get('[data-testid="confidentiality-status"]').should("exist");

    // Change to low security and verify status changes
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Verify compliance changes
    cy.get('[data-testid="compliance-status-text"]').should("exist");
    cy.get('[data-testid="compliance-percentage"]')
      .invoke("text")
      .then((text) => {
        // Should be less than 100% for Low security
        expect(parseInt(text)).to.be.lessThan(100);
      });
  });
});
