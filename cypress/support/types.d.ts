// Define types for custom Cypress commands

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to simulate pressing tab key
     * @example cy.get('input').tab()
     */
    tab(): Chainable<JQuery<HTMLElement>>;
  }
}
