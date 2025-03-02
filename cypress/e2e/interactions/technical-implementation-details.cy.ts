/**
 * User Story: As a user, I want to view technical implementation details for my security choices
 *
 * Tests that technical implementation details are shown correctly for different
 * security levels and that the tabbed interface works properly.
 */
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
import {
  interactWithElement,
  waitForElement,
} from "../../support/test-helpers";

describe("Technical Implementation Details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1200, 900);
    // Add extra wait time
    cy.wait(1000);
  });

  it("shows technical details widget and tabs", () => {
    // Use more resilient selector with safeScrollIntoView
    cy.get('[data-testid="widget-technical-implementation"]', {
      timeout: 15000,
    })
      .should("be.visible")
      .safeScrollIntoView({ force: true });

    cy.get('[data-testid="technical-details-widget"]', {
      timeout: 10000,
    }).should("be.visible");

    // Verify tabs with specific timeouts
    cy.get('[data-testid="availability-tab"]', { timeout: 5000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="integrity-tab"]', { timeout: 5000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="confidentiality-tab"]', { timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("allows switching between CIA tabs", () => {
    // Navigate to technical implementation widget
    cy.navigateToWidget("widget-technical-implementation");

    // Default tab should be availability
    cy.get('[data-testid="availability-level-indicator"]').should("be.visible");

    // Click on integrity tab
    cy.get('[data-testid="integrity-tab"]').click();

    // Should see integrity level indicator and technical details
    cy.get('[data-testid$="-level-indicator-value"]', { timeout: 10000 })
      .should("be.visible") // Ensure the element is visible
      .contains(/low|moderate|high|none|very high/i, { matchCase: false });
    cy.get('[data-testid="technical-description"]').should("be.visible");

    // Click on confidentiality tab
    cy.get('[data-testid="confidentiality-tab"]').click();

    // Should see confidentiality level indicator
    cy.get('[data-testid$="-level-indicator-value"]', { timeout: 10000 })
      .should("be.visible") // Ensure the element is visible
      .contains(/low|moderate|high|none|very high/i, { matchCase: false });
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

  // Fix for "updates technical details when security levels change"
  it("updates technical details when security levels change", () => {
    // Navigate to technical widget with safeScrollIntoView
    cy.get('[data-testid="widget-technical-implementation"]', {
      timeout: 20000,
    })
      .safeScrollIntoView({ force: true })
      .should("be.visible");
    cy.wait(1000);

    // Get initial technical description
    cy.get('[data-testid="technical-description"]', { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const initialDescription = text;

        // Change security level with more reliable approach
        cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.get("#confidentiality-select").select(SECURITY_LEVELS.HIGH, {
          force: true,
        });
        cy.wait(1000);

        // Navigate back to technical widget with safeScrollIntoView
        cy.get('[data-testid="widget-technical-implementation"]', {
          timeout: 10000,
        })
          .safeScrollIntoView({ force: true })
          .should("be.visible");
        cy.wait(1000);

        // Verify description changed with flexible approach
        cy.get('[data-testid="technical-description"]', { timeout: 10000 })
          .should("be.visible")
          .invoke("text")
          .should("not.eq", initialDescription);

        // Check level indicator for more reliable verification
        cy.contains("High", { timeout: 10000 }).should("exist");
      });
  });

  // Fix for "shows complexity indicators" and "shows recommended technologies" tests
  it("shows complexity indicators and technology recommendations", () => {
    // Navigate to technical implementation widget with safeScrollIntoView
    cy.get('[data-testid="widget-technical-implementation"]', {
      timeout: 20000,
    })
      .safeScrollIntoView({ force: true })
      .should("be.visible");
    cy.wait(1000);

    // Set security levels with a more reliable approach
    cy.get("#availability-select").select(SECURITY_LEVELS.HIGH, {
      force: true,
    });
    cy.get("#integrity-select").select(SECURITY_LEVELS.HIGH, { force: true });
    cy.get("#confidentiality-select").select(SECURITY_LEVELS.HIGH, {
      force: true,
    });
    cy.wait(1000);

    // Navigate again using safeScrollIntoView
    cy.get(
      '[data-testid="widget-technical-implementation"]'
    ).safeScrollIntoView({ force: true });
    cy.wait(500);

    // Check for complexity indicators with more flexible approach
    cy.contains("Implementation Complexity", { timeout: 10000 }).should(
      "exist"
    );

    // Check for recommended technologies section
    cy.contains("Recommended Technologies", { timeout: 10000 }).should("exist");

    // Check for at least one technology stack item
    cy.get('[data-testid^="tech-stack-"]', { timeout: 10000 }).should("exist");
  });

  // Fix for "allows switching between tabs" test
  it("allows switching between tabs", () => {
    // Navigate with more explicit timeout and waiting
    cy.get('[data-testid="widget-technical-implementation"]', {
      timeout: 20000,
    })
      .should("be.visible")
      .scrollIntoView();
    cy.wait(1500); // Longer wait for widget to stabilize

    // Store the initial technical header text
    cy.get('[data-testid="technical-header"]')
      .invoke("text")
      .as("initialTabContent");

    // Click integrity tab with force true and more explicit approach
    cy.contains("Integrity", { timeout: 5000 })
      .should("be.visible")
      .click({ force: true });
    cy.wait(1500); // Wait longer for tab change

    // Check that tab content has changed by comparing with initial content
    cy.get('[data-testid="technical-header"]')
      .invoke("text")
      .then(function (newText) {
        const initialText = this.initialTabContent;
        expect(newText).to.not.eq(initialText);
      });

    // Check for Integrity-specific content
    cy.get('[data-testid="technical-description"]').should("be.visible");

    // Click confidentiality tab
    cy.contains("Confidentiality", { timeout: 5000 })
      .should("be.visible")
      .click({ force: true });
    cy.wait(1500);

    // Verify some text that would only be in confidentiality tab
    cy.get('[data-testid="technical-description"]')
      .should("be.visible")
      .invoke("text")
      .should("not.eq", this.initialTabContent);
  });
});
