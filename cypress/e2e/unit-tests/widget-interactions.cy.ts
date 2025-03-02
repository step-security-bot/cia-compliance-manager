/**
 * Tests focused on widget interactions and behaviors
 *
 * These tests verify that widgets interact properly with user inputs
 * and display appropriate feedback.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Widget Interactions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1200, 1600); // Make viewport taller to see more content
  });

  it("verifies TechnicalDetailsWidget tab interactions", () => {
    // Use direct selector with first()
    cy.get('[data-testid="widget-technical-implementation"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Verify the technical details widget renders and has tabs
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Check tabs are present
      cy.get('[data-testid="availability-tab"]').should("be.visible");
      cy.get('[data-testid="integrity-tab"]').should("be.visible");
      cy.get('[data-testid="confidentiality-tab"]').should("be.visible");

      // Click on integrity tab and verify content changes
      cy.get('[data-testid="integrity-tab"]').click({ force: true });
      cy.get('[data-testid="technical-description"]').should("be.visible");

      // Click on confidentiality tab
      cy.get('[data-testid="confidentiality-tab"]').click({ force: true });
      cy.get('[data-testid="technical-description"]').should("be.visible");

      // Check implementation steps section exists
      cy.get('[data-testid="implementation-step-0"]').should("exist");
    });
  });

  it("verifies BusinessImpactAnalysisWidget contents", () => {
    // Use direct selector with first()
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .first()
      .scrollIntoView();
    cy.wait(300);

    // Check combined impact widget is present
    cy.get('[data-testid="combined-business-impact"]').should("exist");

    // Check for three CIA components in the combined widget
    cy.contains("Availability Impact").should("exist");
    cy.contains("Integrity Impact").should("exist");
    cy.contains("Confidentiality Impact").should("exist");
  });

  it("verifies ROI estimates display", () => {
    // Find cost estimation widget
    cy.navigateToWidget("widget-cost-estimation");

    // Check ROI section
    cy.get('[data-testid="roi-section"]').should("exist");
    cy.get('[data-testid="roi-estimate"]').should("exist");

    // Save current ROI for comparison
    let initialRoi = "";
    cy.get('[data-testid="roi-estimate-value"]')
      .invoke("text")
      .then((text) => {
        initialRoi = text;

        // Change security level
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Go back to cost estimation and check if ROI changed
        cy.navigateToWidget("widget-cost-estimation");
        cy.get('[data-testid="roi-estimate-value"]')
          .invoke("text")
          .should("not.eq", initialRoi);
      });
  });

  it("verifies compliance status updates with security levels", () => {
    // Navigate to compliance widget
    cy.navigateToWidget("widget-compliance-status");

    // Get initial compliance status
    let initialStatus = "";
    cy.get('[data-testid="compliance-status-text"]')
      .invoke("text")
      .then((text) => {
        initialStatus = text;

        // Change to None
        cy.setSecurityLevels(
          SECURITY_LEVELS.NONE,
          SECURITY_LEVELS.NONE,
          SECURITY_LEVELS.NONE
        );

        // Go back and check compliance changed
        cy.navigateToWidget("widget-compliance-status");
        cy.get('[data-testid="compliance-status-text"]')
          .invoke("text")
          .should("not.eq", initialStatus);
      });
  });

  it("verifies security summary content updates", () => {
    // Navigate to security summary
    cy.navigateToWidget("widget-security-summary");

    // Check security level indicator
    cy.get('[data-testid="security-level-indicator"]').should("be.visible");

    // Get current description
    let initialDescription = "";
    cy.get('[data-testid="security-summary-description"]')
      .invoke("text")
      .then((text) => {
        initialDescription = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Check description updated
        cy.navigateToWidget("widget-security-summary");
        cy.get('[data-testid="security-summary-description"]')
          .invoke("text")
          .should("not.eq", initialDescription);
      });
  });
});
