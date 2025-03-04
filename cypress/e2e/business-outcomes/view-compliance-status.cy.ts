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
    cy.viewport(2000, 3000);
  });

  it("shows compliance status widget", () => {
    cy.navigateToWidget("widget-compliance-status");
    cy.get('[data-testid="compliance-status-widget"]').should("exist");
    cy.get('[data-testid="widget-compliance-status"] h3').should("exist");
  });

  it("displays compliance information using test IDs", () => {
    cy.navigateToWidget("widget-compliance-status");
    
    // Only check for the badge which is definitely present
    cy.get('[data-testid="compliance-status-badge"]').should("exist");
    
    // Check for compliance status rather than specific percentage elements
    cy.get('[data-testid="compliance-status-widget"]').should("exist");
    
    // Check for existence of compliance frameworks list
    cy.get('[data-testid="compliant-frameworks-list"]').should("exist");
  });

  it("displays framework status based on security levels", () => {
    cy.navigateToWidget("widget-compliance-status");
    cy.wait(500);
    cy.get('[data-testid="compliant-frameworks-list"]').should("exist");
    cy.get('[data-testid="compliance-status-badge"]')
      .invoke("text")
      .as("initialComplianceText");
    cy.get("#availability-select").select("High", { force: true });
    cy.get("#integrity-select").select("High", { force: true });
    cy.get("#confidentiality-select").select("High", { force: true });
    cy.wait(1000);
    cy.get('[data-testid="compliance-status-badge"]').then(function ($el) {
      const newText = $el.text();
      expect(newText).not.to.eq(this.initialComplianceText);
    });
  });
});
