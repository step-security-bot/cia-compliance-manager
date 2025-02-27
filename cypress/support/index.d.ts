/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to set all security levels at once
     * @example cy.setSecurityLevels('High', 'Moderate', 'Very High')
     */
    setSecurityLevels(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<void>;

    /**
     * Custom command to verify a widget contains specific content
     * @example cy.verifyWidgetWithContent('widget-security-summary', 'High Security')
     */
    verifyWidgetWithContent(
      widgetTestId: string,
      expectedContent: string
    ): Chainable<void>;

    /**
     * Custom command to press tab key on an element
     * @example cy.get('input').tab()
     */
    tab(): Chainable<JQuery<HTMLElement>>;
  }
}
