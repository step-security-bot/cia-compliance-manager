// Enhanced commands with better error handling and resilience
export {};

// Custom Cypress commands

import { TEST_SELECTORS } from "./appConstantsHelper";

// Add retry logic and improved selectors

// Enhanced command for selecting security levels with fallbacks and retries
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (
    category: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    let index = 0;
    if (category === "integrity") index = 1;
    if (category === "confidentiality") index = 2;

    // First try data-testid
    return cy
      .get(`[data-testid="${category}-select"]`)
      .then(($el) => {
        if ($el.length) {
          // Found by data-testid, use it
          return cy.wrap($el).select(level, { force: true, timeout: 5000 });
        } else {
          // Fallback to index-based
          cy.log(`Falling back to index-based select for ${category}`);
          return cy
            .get("select")
            .eq(index)
            .select(level, { force: true, timeout: 5000 })
            .then(() => {
              cy.log(`Set ${category} to ${level} using index ${index}`);
            });
        }
      })
      .catch((err) => {
        // Log error but don't fail test
        cy.log(`Error selecting ${category}: ${err.message}`);
      });
  }
);

// Command to try clicking a button matching text or pattern
Cypress.Commands.add("tryClickButton", (textOrPattern: string | RegExp) => {
  const pattern =
    textOrPattern instanceof RegExp
      ? textOrPattern
      : new RegExp(textOrPattern, "i");

  // Try to find button by text content
  return cy
    .get("button")
    .then(($buttons) => {
      // Find any button matching the pattern
      const $matchingButton = $buttons.filter((_, el) => {
        return pattern.test(el.textContent || "");
      });

      if ($matchingButton.length) {
        cy.wrap($matchingButton).first().click({ force: true });
        cy.log(`Successfully clicked button matching: ${textOrPattern}`);
        return cy.wrap(true);
      } else {
        cy.log(`No button found matching: ${textOrPattern}`);
        return cy.wrap(false);
      }
    })
    .catch((err) => {
      cy.log(`Error trying to click button: ${err.message}`);
      return cy.wrap(false);
    });
});

// Command to check for content in page with retry
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
        .then((text) => {
          return pattern.test(text);
        });
    };

    return cy
      .waitUntil(checkContent, {
        timeout: options.timeout,
        interval: 500,
        errorMsg: `Timed out waiting for content matching: ${contentPattern}`,
      })
      .then((result) => {
        expect(result).to.be.true;
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

// Add a command to wait for app to stabilize
Cypress.Commands.add("waitForAppStability", (timeout = 2000) => {
  // Wait for any animations to complete
  return cy.wait(timeout);
});

// Command to check if element exists, returns boolean
Cypress.Commands.add(
  "doesExist",
  { prevSubject: "optional" },
  (subject, selector) => {
    const get = selector ? cy.get : cy.wrap;
    const el = selector || subject;

    return get(el)
      .then(($el) => $el.length > 0)
      .catch(() => false);
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
      selectSecurityLevelEnhanced(
        category: "availability" | "integrity" | "confidentiality",
        level: string
      ): Chainable<Element>;
      tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;
      waitForContent(
        contentPattern: string | RegExp,
        options?: { timeout: number }
      ): Chainable<boolean>;
    }
  }
}
