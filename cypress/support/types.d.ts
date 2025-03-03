/// <reference types="cypress" />

declare namespace Cypress {
  interface ScrollIntoViewOptions extends ScrollIntoViewOptionsBase {
    /**
     * Whether to force the action even if element is hidden, disabled etc.
     * @default false
     */
    force?: boolean;
  }

  interface Chainable<Subject = any> {
    /**
     * Custom implementation of scrollIntoView that supports the force option
     * @param options - The options for scrolling into view
     */
    safeScrollIntoView(
      options?: Partial<ScrollIntoViewOptions>
    ): Chainable<Subject>;

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
