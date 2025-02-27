// Make this a module file to properly scope augmentations
export {};

// Custom command for tab navigation - fixed prevSubject format
Cypress.Commands.add("tab", { prevSubject: ["element"] }, (subject: JQuery) => {
  cy.wrap(subject).trigger("keydown", {
    keyCode: 9,
    which: 9,
    key: "Tab",
    code: "Tab",
    bubbles: true,
  });

  return cy.focused();
});

// Custom command to set all security levels at once
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    // Add a wait to ensure elements are fully loaded
    cy.get('[data-testid="availability-select"]', { timeout: 10000 })
      .should("be.visible")
      .select(availability);

    cy.get('[data-testid="integrity-select"]')
      .should("be.visible")
      .select(integrity);

    cy.get('[data-testid="confidentiality-select"]')
      .should("be.visible")
      .select(confidentiality);

    // Add a small wait to allow UI updates to propagate
    cy.wait(500);
  }
);

// Custom command to verify widget exists with content
Cypress.Commands.add(
  "verifyWidgetWithContent",
  (widgetTestId: string, expectedContent: string) => {
    cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .should("include", expectedContent);
  }
);

// Add type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      setSecurityLevels(
        availability: string,
        integrity: string,
        confidentiality: string
      ): Chainable<void>;
      verifyWidgetWithContent(
        widgetTestId: string,
        expectedContent: string
      ): Chainable<void>;
    }
  }
}
