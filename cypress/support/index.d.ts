/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to set all three security levels at once
     * @example cy.setSecurityLevels('High', 'Moderate', 'Low')
     */
    setSecurityLevels(
      availability: string | null,
      integrity: string | null,
      confidentiality: string | null
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to check if the theme is dark or light
     * @example cy.checkTheme(true) // checks if theme is dark
     */
    checkTheme(isDark: boolean): Chainable<void>;

    /**
     * Custom command to set application state directly
     * @example cy.setAppState({ darkMode: true })
     */
    setAppState(stateChanges: any): Chainable<void>;

    /**
     * Custom command to check if body text contains the given string
     * @example cy.containsText('Welcome')
     */
    containsText(text: string): Chainable<void>;

    /**
     * Custom command to log current state of all select elements
     * @example cy.logCurrentState()
     */
    logCurrentState(): Chainable<void>;

    /**
     * Custom command for safer select operations
     * @example cy.selectSafe('#mySelect', 'Option 1')
     */
    selectSafe(selector: string, value: string): Chainable<void>;

    /**
     * Custom command to log details about an element
     * @example cy.logElementDetails('.my-element')
     */
    logElementDetails(selector: string): Chainable<void>;

    /**
     * Custom command for component testing with React
     * @example cy.mount(<MyComponent />)
     */
    mount(component: React.ReactNode): Chainable<any>;

    /**
     * Safe select command for dropdown interactions
     * @example cy.get('select').safeSelect('Option 1')
     */
    safeSelect(
      value: string,
      options?: Partial<Cypress.SelectOptions>
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to ensure the app is fully loaded before proceeding
     * @example cy.ensureAppLoaded()
     */
    ensureAppLoaded(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to navigate to a widget by its test ID
     * @example cy.navigateToWidget('widget-security-summary')
     */
    navigateToWidget(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}
