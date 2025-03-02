/**
 * User Story: As a user, I want to view technical implementation details for my security choices
 *
 * Tests that technical implementation details are shown correctly for different
 * security levels and that the tabbed interface works properly.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";

describe("Technical Implementation Details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1200, 900);
  });

  it("shows technical details widget and tabs", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Check that the technical details widget has loaded
    cy.get('[data-testid="technical-details-widget"]').should("be.visible");

    // Verify tabs are present
    cy.get('[data-testid="availability-tab"]').should("be.visible");
    cy.get('[data-testid="integrity-tab"]').should("be.visible");
    cy.get('[data-testid="confidentiality-tab"]').should("be.visible");
  });

  it("allows switching between CIA tabs", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Default tab should be availability
    cy.get('[data-testid="availability-level-indicator"]').should("be.visible");

    // Click on integrity tab
    cy.get('[data-testid="integrity-tab"]').click();

    // Should see integrity level indicator and technical details
    cy.get('[data-testid$="-level-indicator-value"]').contains(
      /low|moderate|high|none|very high/i,
      { matchCase: false }
    );
    cy.get('[data-testid="technical-description"]').should("be.visible");

    // Click on confidentiality tab
    cy.get('[data-testid="confidentiality-tab"]').click();

    // Should see confidentiality level indicator
    cy.get('[data-testid$="-level-indicator-value"]').contains(
      /low|moderate|high|none|very high/i,
      { matchCase: false }
    );
  });

  it("shows implementation steps", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Check implementation steps section
    cy.get('[data-testid="implementation-header"]').should("be.visible");
    cy.get('[data-testid="implementation-step-0"]').should("be.visible");
    cy.get('[data-testid="implementation-step-1"]').should("exist");
  });

  it("shows resource requirements", () => {
    // Navigate to technical widget
    cy.navigateToWidget("widget-technical-implementation");

    // Check resource requirements section
    cy.get('[data-testid="resources-header"]').should("be.visible");
    cy.get('[data-testid="development-effort"]').should("be.visible");
    cy.get('[data-testid="maintenance-level"]').should("be.visible");
    cy.get('[data-testid="required-expertise"]').should("be.visible");
  });

  it("updates technical details when security levels change", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Get initial technical description
    let initialDescription = "";
    cy.get('[data-testid="technical-description"]')
      .invoke("text")
      .then((text) => {
        initialDescription = text;

        // Change security level to High
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Navigate back to technical widget
        cy.navigateToWidget("widget-technical-implementation");

        // Verify description changed
        cy.get('[data-testid="technical-description"]')
          .invoke("text")
          .should("not.eq", initialDescription);

        // Check level indicator shows High
        cy.get('[data-testid$="-level-indicator-value"]').contains("High");
      });
  });

  it("shows recommended technologies", () => {
    // Navigate to technical implementation widget and set a specific level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.navigateToWidget("widget-technical-implementation");

    // Check for technology stack section and items
    cy.contains("Recommended Technologies").should("be.visible");
    cy.get('[data-testid="tech-stack-0"]').should("be.visible");
    cy.get('[data-testid="tech-stack-1"]').should("exist");
  });

  it("shows complexity indicators", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Set to a high security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check complexity indicators
    cy.contains("Implementation Complexity").should("be.visible");
    cy.get('[data-testid$="-complexity"]').should("be.visible");
  });
});
