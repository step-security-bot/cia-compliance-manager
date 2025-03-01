// Enhanced commands with better error handling and resilience
export {};

// Custom Cypress commands
import { TEST_SELECTORS } from "./appConstantsHelper";

// Enhanced command with fixed type errors
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (
    category: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    let index = 0;
    if (category === "integrity") index = 1;
    if (category === "confidentiality") index = 2;

    // First try data-testid - with proper options
    cy.get(`[data-testid="${category}-select"]`, {
      log: false,
      timeout: 5000,
      // Remove the incorrect failOnStatusCode option
    }).then(($el) => {
      if ($el && $el.length) {
        // Found by data-testid, use it
        cy.wrap($el).select(level, { force: true });
        cy.log(`Set ${category} to ${level} using data-testid`);
      } else {
        // Fallback to index-based
        cy.log(`Falling back to index-based select for ${category}`);
        cy.get("select", { timeout: 5000 })
          .eq(index)
          .select(level, { force: true })
          .then(() => {
            cy.log(`Set ${category} to ${level} using index ${index}`);
          });
      }
    });
  }
);

// Command to try clicking a button - fixed for TypeScript
Cypress.Commands.add("tryClickButton", (textOrPattern: string | RegExp) => {
  const pattern =
    textOrPattern instanceof RegExp
      ? textOrPattern
      : new RegExp(textOrPattern, "i");

  // Try to find button by text content with better error handling
  cy.get("button", { timeout: 5000 }).then(($buttons) => {
    // Find any button matching the pattern
    const $matchingButton = $buttons.filter((_, el) => {
      return pattern.test(el.textContent || "");
    });

    if ($matchingButton.length) {
      cy.wrap($matchingButton).first().click({ force: true });
      cy.log(`Successfully clicked button matching: ${textOrPattern}`);
      return true;
    } else {
      cy.log(`No button found matching: ${textOrPattern}`);
      return false;
    }
  });
});

// Fix for waitForContent command - remove problematic catch blocks
Cypress.Commands.add(
  "waitForContent",
  (contentPattern: string | RegExp, options = { timeout: 10000 }) => {
    const pattern =
      contentPattern instanceof RegExp
        ? contentPattern
        : new RegExp(contentPattern, "i");

    const checkContent = () => {
      return cy
        .get("body")
        .invoke("text")
        .then((text) => pattern.test(text));
    };

    // waitUntil is a custom command that must be installed separately
    // cypress-wait-until plugin is required
    return cy.waitUntil(checkContent, {
      timeout: options.timeout,
      interval: 500,
      errorMsg: `Timed out waiting for content matching: ${contentPattern}`,
    });
  }
);

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

// Improved custom command to set all security levels at once
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    // Add a wait to ensure elements are fully loaded
    cy.get('[data-testid="availability-select"]', { timeout: 10000 })
      .should("be.visible")
      .select(availability, { force: true });

    cy.get('[data-testid="integrity-select"]', { timeout: 10000 })
      .should("be.visible")
      .select(integrity, { force: true });

    cy.get('[data-testid="confidentiality-select"]', { timeout: 10000 })
      .should("be.visible")
      .select(confidentiality, { force: true });

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

// Add a command to wait for app to stabilize - Fix return type
Cypress.Commands.add("waitForAppStability", (timeout = 2000) => {
  // Wait for any animations to complete
  cy.wait(timeout);
  // Fix: return void to match expected type
  return;
});

// Fix doesExist command with proper type handling
Cypress.Commands.add(
  "doesExist",
  { prevSubject: "optional" },
  (subject, selector) => {
    if (selector) {
      // No subject, use selector
      return cy.get("body").then(($body) => {
        // Type-safe way to check existence
        const elements = $body.find(selector);
        return Boolean(elements && elements.length > 0);
      });
    } else if (subject) {
      // Use subject with proper typing - Fix: use any type for safer type handling
      return cy.wrap(subject).then((el: any) => {
        // Now we use a more permissive type that won't cause TypeScript errors
        return Boolean(el && el.length > 0);
      });
    } else {
      // Neither provided, return false
      return cy.wrap(false);
    }
  }
);

// Fix the containsAnyText command implementation
Cypress.Commands.add("containsAnyText", (patterns: Array<RegExp | string>) => {
  return cy.get("body").then(($body) => {
    const bodyText = $body.text();

    // Convert string patterns to RegExp
    const regexPatterns = patterns.map((pattern) =>
      typeof pattern === "string" ? new RegExp(pattern, "i") : pattern
    );

    // Check if any pattern matches
    const foundMatch = regexPatterns.some((pattern) => pattern.test(bodyText));

    // Log the result for debugging
    cy.log(`Text match found: ${foundMatch ? "Yes" : "No"}`);

    return cy.wrap(foundMatch);
  });
});

// Improved version of ensureAppLoaded to specifically check for security controls
Cypress.Commands.add("ensureAppLoaded", () => {
  // Wait for basic content
  cy.get("body", { timeout: 20000 }).should("not.be.empty");

  // Extra wait for hydration
  cy.wait(1000);

  // Specifically check for security level controls to be present
  cy.get("body").then(($body) => {
    // First try to find by data-testid
    const hasControls =
      $body.find('[data-testid="security-level-controls"]').length > 0;

    if (hasControls) {
      cy.log("Security level controls found by data-testid");
    } else {
      // If not found, check for select elements
      const selectCount = $body.find("select").length;
      cy.log(`Found ${selectCount} select elements`);

      // If no selects found, wait a bit longer
      if (selectCount === 0) {
        cy.wait(2000);
      }
    }
  });

  return cy.wrap(true);
});

// Type definitions with proper return types
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      selectSecurityLevelEnhanced(
        category: "availability" | "integrity" | "confidentiality",
        level: string
      ): void;

      tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;

      waitForContent(
        contentPattern: string | RegExp,
        options?: { timeout: number }
      ): Chainable<boolean>;

      tab(): Chainable<JQuery<HTMLElement>>;

      setSecurityLevels(
        availability: string,
        integrity: string,
        confidentiality: string
      ): Chainable<void>;

      verifyWidgetWithContent(
        widgetTestId: string,
        expectedContent: string
      ): Chainable<void>;

      waitForAppStability(timeout?: number): Chainable<void>;

      doesExist(selector?: string): Chainable<boolean>;

      containsAnyText(patterns: Array<RegExp | string>): Chainable<boolean>;

      ensureAppLoaded(): Chainable<boolean>;

      containsAnyText(patterns: RegExp[]): Chainable<boolean>;
    }
  }
}
