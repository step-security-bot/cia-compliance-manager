/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to set all CIA security levels at once
     * @example cy.setSecurityLevels('High', 'Moderate', 'Low')
     */
    setSecurityLevels(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<Element>;

    /**
     * Custom command to verify widget content
     * @example cy.verifyWidgetWithContent('widget-security-summary', 'Moderate Security')
     */
    verifyWidgetWithContent(
      widgetTestId: string,
      expectedContent: string
    ): Chainable<Element>;

    /**
     * Custom command to press tab key on an element
     * @example cy.get('input').tab()
     */
    tab(): Chainable<JQuery<HTMLElement>>;
  }
}
