// Import constants and type definitions
import { CypressConstants } from "./appConstantsHelper";
import { TEST_SELECTORS } from "./appConstantsHelper";

// DO NOT declare types here - they are in types.d.ts
// Remove all "declare global" blocks

// Define command implementations

/**
 * Custom command to set security levels for all CIA components
 */
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    // Navigate to security profile configuration if needed
    cy.get('[data-testid="availability-select"]').scrollIntoView({
      timeout: 5000,
    });

    // Set each security level
    cy.get('[data-testid="availability-select"]')
      .should("be.visible")
      .select(availability);

    cy.get('[data-testid="integrity-select"]')
      .should("be.visible")
      .select(integrity);

    cy.get('[data-testid="confidentiality-select"]')
      .should("be.visible")
      .select(confidentiality);

    // Wait for changes to take effect
    cy.wait(300);
  }
);

/**
 * Ensures app is loaded by waiting for key elements
 */
Cypress.Commands.add("ensureAppLoaded", () => {
  // Wait for header to be present
  cy.get("header", { timeout: 10000 }).should("be.visible");

  // Wait for key components to be loaded
  cy.get(
    '[data-testid="widget-security-profile"], [data-testid="loading-indicator"]',
    { timeout: 10000 }
  ).should("exist");

  // Return a boolean chainable to match the interface
  return cy.wrap(true);
});

/**
 * Retrieves a test ID with proper escaping
 */
Cypress.Commands.add("getByTestId", (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`);
});

/**
 * Navigate to a specific widget by test ID and scroll it into view
 * Fix: Use first() to ensure only one element is selected
 */
Cypress.Commands.add("navigateToWidget", (testId: string) => {
  // Add .first() to ensure we're only selecting one element
  cy.get(`[data-testid="${testId}"]`).first().scrollIntoView({ timeout: 5000 });

  // Add a small wait to ensure UI is stable after scrolling
  cy.wait(100);
});

/**
 * Enhanced security level selection with fallbacks
 */
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (
    category: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    let index = 0;
    if (category === "integrity") index = 1;
    if (category === "confidentiality") index = 2;

    cy.get(`[data-testid="${category}-select"]`, {
      log: false,
      timeout: 5000,
    }).then(($el) => {
      if ($el && $el.length) {
        cy.wrap($el).select(level, { force: true });
      } else {
        cy.get("select", { timeout: 5000 })
          .eq(index)
          .select(level, { force: true });
      }
    });
  }
);

/**
 * Try to click a button matching text pattern
 */
Cypress.Commands.add("tryClickButton", (textOrPattern: string | RegExp) => {
  const pattern =
    textOrPattern instanceof RegExp
      ? textOrPattern
      : new RegExp(textOrPattern, "i");

  return cy.get("button", { timeout: 5000 }).then(($buttons) => {
    const $matchingButton = $buttons.filter((_, el) => {
      return pattern.test(el.textContent || "");
    });

    if ($matchingButton.length) {
      cy.wrap($matchingButton).first().click({ force: true });
      return cy.wrap(true);
    } else {
      return cy.wrap(false);
    }
  });
});

/**
 * Wait for content to appear
 */
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

    return cy.waitUntil(checkContent, {
      timeout: options.timeout,
      interval: 500,
      errorMsg: `Timed out waiting for content matching: ${contentPattern}`,
    });
  }
);

/**
 * Tab navigation
 */
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

/**
 * Verify widget has specific content
 */
Cypress.Commands.add(
  "verifyWidgetWithContent",
  (widgetTestId: string, expectedContent: string) => {
    cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .should("include", expectedContent);
  }
);

/**
 * Wait for app stability
 */
Cypress.Commands.add("waitForAppStability", (timeout = 2000) => {
  cy.wait(timeout);
});

/**
 * Check if element exists
 */
Cypress.Commands.add(
  "doesExist",
  { prevSubject: "optional" },
  (subject, selector) => {
    if (selector) {
      return cy.get("body").then(($body) => {
        const elements = $body.find(selector);
        return cy.wrap(Boolean(elements && elements.length > 0));
      });
    } else if (subject) {
      return cy.wrap(subject).then((el: any) => {
        return cy.wrap(Boolean(el && el.length > 0));
      });
    } else {
      return cy.wrap(false);
    }
  }
);

/**
 * Check if page contains any matching text patterns
 */
Cypress.Commands.add("containsAnyText", (patterns: Array<RegExp | string>) => {
  return cy.get("body").then(($body) => {
    const bodyText = $body.text();
    const regexPatterns = patterns.map((pattern) =>
      typeof pattern === "string" ? new RegExp(pattern, "i") : pattern
    );
    return cy.wrap(regexPatterns.some((pattern) => pattern.test(bodyText)));
  });
});

// Export empty object at the end
export {};
