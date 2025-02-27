/// <reference types="cypress" />
/// <reference types="cypress-wait-until" />

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

    /**
     * Sets security levels with improved performance by reducing UI interactions
     * @example cy.setSecurityLevelsQuickly('High', 'High', 'High')
     */
    setSecurityLevelsQuickly(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<Element>;

    /**
     * Sets security levels with additional validation for robustness
     * @example cy.setSecurityLevelsRobust('High', 'High', 'High')
     */
    setSecurityLevelsRobust(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<Element>;

    /**
     * Check widget content with automatic retries
     * @example cy.checkWidgetContent('widget-security-summary', 'High Security')
     */
    checkWidgetContent(
      widgetId: string,
      expectedContent: string,
      options?: {
        timeout?: number;
        interval?: number;
        retries?: number;
      }
    ): Chainable<Element>;

    /**
     * Wait for the application to reach a stable state
     * @example cy.waitForAppStability()
     */
    waitForAppStability(timeout?: number): Chainable<Element>;

    /**
     * Custom command to log element details
     * @example cy.logElementDetails('button.submit')
     */
    logElementDetails(selector: string): void;
  }
}
