import {
  SECURITY_LEVELS,
  getTestSelector,
  WIDGET_TEST_IDS,
} from "../../support/constants";

describe("Technical Implementation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.get(`[data-testid="widget-technical-implementation"]`)
      .should("exist")
      .scrollIntoView();
  });

  it("provides detailed technical guidance for implementation", () => {
    // Set to specific security level to test detailed guidance
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Should contain implementation guidance
    cy.get(`[data-testid="widget-technical-implementation"]`).should(
      "contain.text",
      "implementation"
    );

    // Check for technical implementation details for each component
    cy.get(`[data-testid="widget-technical-implementation"]`).within(() => {
      // Should find availability implementation details
      cy.contains("Availability").should("be.visible");
      cy.contains("Availability")
        .parent()
        .should("contain.text", SECURITY_LEVELS.HIGH);

      // Should find integrity implementation details
      cy.contains("Integrity").should("be.visible");
      cy.contains("Integrity")
        .parent()
        .should("contain.text", SECURITY_LEVELS.HIGH);

      // Should find confidentiality implementation details
      cy.contains("Confidentiality").should("be.visible");
      cy.contains("Confidentiality")
        .parent()
        .should("contain.text", SECURITY_LEVELS.HIGH);
    });
  });

  it("adapts guidance to different security levels", () => {
    // Set mixed levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.HIGH
    );

    // Check that technical details match the set security levels
    cy.get(`[data-testid="widget-technical-implementation"]`).within(() => {
      // Availability should show Moderate
      cy.contains("Availability")
        .parent()
        .should("contain.text", SECURITY_LEVELS.MODERATE);

      // Integrity should show Low
      cy.contains("Integrity")
        .parent()
        .should("contain.text", SECURITY_LEVELS.LOW);

      // Confidentiality should show High
      cy.contains("Confidentiality")
        .parent()
        .should("contain.text", SECURITY_LEVELS.HIGH);
    });
  });

  it("provides technical details useful for implementation planning", () => {
    // Business outcome: Get actionable implementation guidance
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check for implementation planning content
    cy.get(`[data-testid="widget-technical-implementation"]`).within(() => {
      // Should contain actionable guidance
      cy.contains(/implementation|configure|setup|deploy/i).should("exist");

      // Should have technical details that could inform planning
      cy.contains(/recovery|backup|validation|encryption/i).should("exist");
    });
  });
});
