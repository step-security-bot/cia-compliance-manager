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

// Use a more reliable approach for setting security levels
Cypress.Commands.add(
  "setSecurityLevelsRobust",
  (availability, integrity, confidentiality) => {
    // First ensure all selectors are visible and ready
    cy.get('[data-testid="availability-select"]').should("be.visible");
    cy.get('[data-testid="integrity-select"]').should("be.visible");
    cy.get('[data-testid="confidentiality-select"]').should("be.visible");

    // Use cy.log for better debugging in test runner
    cy.log(
      `Setting security levels to: ${availability}, ${integrity}, ${confidentiality}`
    );

    // Clear any previous selections using a slow and deliberate approach
    cy.get('[data-testid="availability-select"]').select("None", {
      force: true,
    });
    cy.get('[data-testid="integrity-select"]').select("None", { force: true });
    cy.get('[data-testid="confidentiality-select"]').select("None", {
      force: true,
    });

    // Short wait to ensure state updates
    cy.wait(300);

    // Now set the desired values
    cy.get('[data-testid="availability-select"]').select(availability, {
      force: true,
    });
    cy.get('[data-testid="integrity-select"]').select(integrity, {
      force: true,
    });
    cy.get('[data-testid="confidentiality-select"]').select(confidentiality, {
      force: true,
    });

    // Verify all selections took effect
    cy.get('[data-testid="availability-select"]').should(
      "have.value",
      availability
    );
    cy.get('[data-testid="integrity-select"]').should("have.value", integrity);
    cy.get('[data-testid="confidentiality-select"]').should(
      "have.value",
      confidentiality
    );

    // Allow time for state updates to propagate to other components
    cy.wait(500);
  }
);

// Command to wait for the app to be fully stable
Cypress.Commands.add("waitForAppStability", (timeout = 2000) => {
  // Wait for any network requests to complete
  cy.wait(100); // Short wait for XHR requests to start
  cy.intercept("**").as("anyRequest");
  cy.wait("@anyRequest", { timeout: 1000 }).then(() => {
    // Now wait for React to settle
    cy.get('[data-testid="app-container"]').should("be.visible");
  });
});
