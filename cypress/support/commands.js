// Import waitUntil from cypress-wait-until
import "cypress-wait-until";

// Improve the custom command for widget content checking
Cypress.Commands.add(
  "checkWidgetContent",
  (widgetId, expectedContent, options = {}) => {
    const defaultOptions = {
      timeout: 5000,
      interval: 200,
      retries: 3,
      log: true,
    };
    const mergedOptions = { ...defaultOptions, ...options };

    if (mergedOptions.log) {
      Cypress.log({
        name: "checkWidgetContent",
        message: `Checking if ${widgetId} contains "${expectedContent}"`,
      });
    }

    // Use should with retry built in
    cy.get(`[data-testid="${widgetId}"]`, {
      timeout: mergedOptions.timeout,
    }).should(($el) => {
      const text = $el.text();
      expect(text).to.include(expectedContent);
    });
  }
);

// Improve setSecurityLevelsRobust with better reliability
Cypress.Commands.add(
  "setSecurityLevelsRobust",
  (availability, integrity, confidentiality) => {
    // Fix the syntax error in the template string
    cy.log(
      `Setting security levels: ${availability}, ${integrity}, ${confidentiality}`
    );

    // Ensure the app is in a stable state first
    cy.get('[data-testid="app-container"]').should("exist");

    // First ensure all selectors are visible and ready with longer timeouts
    cy.get('[data-testid="availability-select"]', { timeout: 5000 })
      .should("be.visible")
      .and("not.be.disabled");
    cy.get('[data-testid="integrity-select"]', { timeout: 5000 })
      .should("be.visible")
      .and("not.be.disabled");
    cy.get('[data-testid="confidentiality-select"]', { timeout: 5000 })
      .should("be.visible")
      .and("not.be.disabled");

    // First clear all values by setting to None - using { force: true } avoids detached DOM issues
    cy.get('[data-testid="availability-select"]').select("None", {
      force: true,
    });
    cy.get('[data-testid="integrity-select"]').select("None", { force: true });
    cy.get('[data-testid="confidentiality-select"]').select("None", {
      force: true,
    });

    // Wait longer to ensure React state updates
    cy.wait(500);

    // Now set new values one by one with waits in between
    cy.get('[data-testid="availability-select"]').select(availability, {
      force: true,
    });
    cy.wait(200); // Wait for state update

    cy.get('[data-testid="integrity-select"]').select(integrity, {
      force: true,
    });
    cy.wait(200); // Wait for state update

    cy.get('[data-testid="confidentiality-select"]').select(confidentiality, {
      force: true,
    });
    cy.wait(200); // Wait for state update

    // Verify all selections have been applied correctly
    cy.get('[data-testid="availability-select"]').should(
      "have.value",
      availability
    );
    cy.get('[data-testid="integrity-select"]').should("have.value", integrity);
    cy.get('[data-testid="confidentiality-select"]').should(
      "have.value",
      confidentiality
    );

    // Wait for React to finish updating all components
    cy.wait(800);

    // Verify app container still exists to ensure page hasn't navigated away
    cy.get('[data-testid="app-container"]').should("exist");
  }
);

// Improve waitForAppStability to be more robust
Cypress.Commands.add("waitForAppStability", (timeout = 5000) => {
  cy.log("Waiting for app to stabilize");

  // First make sure the app container exists
  cy.get('[data-testid="app-container"]', { timeout }).should("exist");

  // Wait a moment for React to fully render components
  cy.wait(500);

  // Check for critical elements to be visible
  cy.get('[data-testid="app-title"]', { timeout }).should("be.visible");

  // Wait for all animations to complete
  cy.wait(300);

  cy.log("App appears to be stable");
});
