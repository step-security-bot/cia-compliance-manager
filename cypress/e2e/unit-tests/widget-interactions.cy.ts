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
    cy.viewport(1200, 900); // Large enough to see multiple widgets
  });

  it("verifies TechnicalDetailsWidget tab interactions", () => {
    // Find the technical implementation widget
    cy.get('[data-testid="widget-technical-implementation"]')
      .scrollIntoView()
      .should("be.visible");

    // Check that the component renders with tabs
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Verify tabs are present
      cy.get('[data-testid="availability-tab"]').should("be.visible");
      cy.get('[data-testid="integrity-tab"]').should("be.visible");
      cy.get('[data-testid="confidentiality-tab"]').should("be.visible");

      // Click on tabs and verify content changes
      cy.get('[data-testid="integrity-tab"]').click();
      cy.get('[data-testid="technical-description"]').should("be.visible");

      // Click on confidentiality tab
      cy.get('[data-testid="confidentiality-tab"]').click();
      cy.get('[data-testid="technical-description"]').should("be.visible");

      // Verify implementation steps are visible
      cy.get('[data-testid="implementation-step-0"]').should("exist");
    });
  });

  it("verifies BusinessImpactAnalysisWidget contents", () => {
    // Find the business impact analysis widget
    cy.get('[data-testid="widget-business-impact-analysis"]')
      .scrollIntoView()
      .should("be.visible");

    // Check the combined impact widget is present
    cy.get('[data-testid="combined-business-impact"]').should("be.visible");

    // Verify all three impact sections are displayed
    cy.contains("Availability Impact").should("be.visible");
    cy.contains("Integrity Impact").should("be.visible");
    cy.contains("Confidentiality Impact").should("be.visible");
  });

  it("verifies ROI estimates display", () => {
    // Find the cost estimation widget
    cy.get('[data-testid="widget-cost-estimation"]').scrollIntoView();

    // Check that ROI estimate is displayed
    cy.get('[data-testid="roi-estimate"]').should("exist");

    // Change security level and verify ROI updates
    let initialRoi = "";
    cy.get('[data-testid="roi-estimate"]')
      .invoke("text")
      .then((text) => {
        initialRoi = text;

        // Change security level
        cy.setSecurityLevels(
          SECURITY_LEVELS.VERY_HIGH,
          SECURITY_LEVELS.VERY_HIGH,
          SECURITY_LEVELS.VERY_HIGH
        );
        cy.wait(300);

        // Verify ROI estimate updated
        cy.get('[data-testid="roi-estimate"]')
          .invoke("text")
          .should("not.eq", initialRoi);
      });
  });

  it("verifies compliance status changes with security levels", () => {
    // Set to None level to see non-compliant status
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.wait(300);

    // Check compliance widget
    cy.get('[data-testid="widget-compliance-status"]').scrollIntoView();
    cy.get('[data-testid="compliance-status-text"]').contains("Non-Compliant");

    // Set to High level to see compliant status
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(300);

    // Check for compliant status
    cy.get('[data-testid="compliance-status-text"]').contains("Compliant");
    cy.get('[data-testid="compliance-percentage"]').should("exist");
  });

  it("verifies security summary content updates", () => {
    // Find the security summary widget
    cy.get('[data-testid="widget-security-summary"]').scrollIntoView();

    // Verify content exists
    cy.get('[data-testid="widget-security-summary"]').within(() => {
      cy.get("h3").should("be.visible"); // Header should exist
      cy.get("p").should("be.visible"); // Description should exist
    });

    // Change security levels and verify content updates
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(300);

    // Verify content changes - check for High level text
    cy.get('[data-testid="widget-security-summary"]').should("contain", "High");
  });
});
