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

    // Instead of 'compliance-status-text', check for the badge
    cy.get('[data-testid="compliance-status-badge"]').should("exist");
    // Use the percentage value test ID if available
    cy.get('[data-testid="compliance-percentage-value"]').should("exist");
    cy.get('[data-testid="compliance-progress-bar"]').should("exist");
  });

  it("displays framework status based on security levels", () => {
    // Navigate to compliance widget with force and longer timeout
    cy.get('[data-testid="widget-compliance-status"]', { timeout: 15000 })
      .scrollIntoView({ force: true })
      .should("be.visible");
    cy.wait(500);

    // Check that frameworks list exists
    cy.get('[data-testid="compliance-frameworks-list"]').should("exist");

    // Store initial compliance text for comparison
    cy.get('[data-testid="compliance-status-text"]')
      .invoke("text")
      .as("initialComplianceText");

    // Set to high security with more reliable approach
    cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
      force: true,
    });
    cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH, { force: true });
    cy.get("#confidentiality-select").select(SECURITY_LEVELS.HIGH, {
      force: true,
    });
    cy.wait(1000); // Longer wait for changes to apply

    // Navigate back to compliance widget with force
    cy.get('[data-testid="widget-compliance-status"]', { timeout: 15000 })
      .scrollIntoView({ force: true })
      .should("be.visible");
    cy.wait(500);

    // Check compliance status changed using more flexible approach
    cy.get('[data-testid="compliance-status-text"]').then(function ($el) {
      const newText = $el.text();
      expect(newText).not.to.eq(this.initialComplianceText);
    });

    // Set to low security with more reliable approach
    cy.get("#availability-select").select(SECURITY_LEVELS.LOW, { force: true });
    cy.get("#integrity-select").select(SECURITY_LEVELS.LOW, { force: true });
    cy.get("#confidentiality-select").select(SECURITY_LEVELS.LOW, {
      force: true,
    });
    cy.wait(1000);

    // Navigate back to compliance widget with force
    cy.get('[data-testid="widget-compliance-status"]', { timeout: 15000 })
      .scrollIntoView({ force: true })
      .should("be.visible");
    cy.wait(500);

    // More flexible percentage check
    cy.get('[data-testid="compliance-percentage-value"]', { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        // Extract numeric value using regex to handle any formatting
        const matches = text.match(/\d+/);
        if (matches && matches.length > 0) {
          const percentage = parseInt(matches[0], 10);
          expect(percentage).to.be.lessThan(100);
          expect(percentage).to.be.at.least(0);
        } else {
          // If no numeric value found, fail explicitly with a message
          expect(text).to.match(/\d+/, "Should contain numeric percentage");
        }
      });
  });
});
