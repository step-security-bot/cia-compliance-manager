// Add this declaration to your Cypress types file

declare namespace Cypress {
  interface Chainable {
    // Update the parameter types to require non-nullable strings
    setSecurityLevels(
      availability: string,
      integrity: string,
      confidentiality: string
    ): Chainable<Element>;

    // ...other command declarations...

    // Add other commands from your commands.ts file to ensure consistency
    ensureAppLoaded(): Chainable<boolean>;
    getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;
    navigateToWidget(testId: string): Chainable<JQuery<HTMLElement>>;
    selectSecurityLevelEnhanced(
      category: "availability" | "integrity" | "confidentiality",
      level: string
    ): Chainable<void>;
    tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;
    waitForContent(
      contentPattern: string | RegExp,
      options?: { timeout: number }
    ): Chainable<boolean>;
    tab(): Chainable<JQuery<HTMLElement>>;
    verifyWidgetWithContent(
      widgetTestId: string,
      expectedContent: string
    ): Chainable<void>;
    waitForAppStability(timeout?: number): Chainable<void>;
    doesExist(selector?: string): Chainable<boolean>;
    containsAnyText(patterns: Array<RegExp | string>): Chainable<boolean>;
  }
}
