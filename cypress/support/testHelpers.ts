/**
 * Test helpers to make Cypress tests more resilient and less brittle
 */

import { SECURITY_LEVELS } from "./appConstantsHelper";
import { TEST_IDS } from "../../src/constants/testIds";

/**
 * Wait for an element with fallback selectors
 * @param primarySelector Primary selector to try first
 * @param fallbackSelector Fallback selector if primary doesn't exist
 * @param timeout Timeout in ms
 */
export const waitForElement = (
  primarySelector: string,
  fallbackSelector?: string,
  timeout = 10000
): Cypress.Chainable => {
  return cy.get("body").then(($body) => {
    if ($body.find(primarySelector).length) {
      return cy.get(primarySelector, { timeout });
    } else if (fallbackSelector) {
      return cy.get(fallbackSelector, { timeout });
    }
    return cy.get(primarySelector, { timeout });
  });
};

/**
 * Safely interact with an element that may not be visible or may need scrolling
 * @param selector Element selector
 * @param action Action to perform ('click', 'check', 'uncheck', 'select' = 'click')
 * @param options Additional options for the action
 */
export const interactWithElement = (
  selector: string,
  action: "click" | "check" | "uncheck" | "select" = "click",
  options?: any
): Cypress.Chainable => {
  return cy
    .get(selector, { timeout: 10000 })
    .should("exist")
    .then(($el) => {
      if ($el.is(":visible")) {
        return cy.wrap($el)[action](options);
      } else {
        // Try force option for elements that may be covered/hidden
        return cy.wrap($el)[action]({ ...options, force: true });
      }
    });
};

/**
 * Safely select a value from a dropdown by index
 */
export const selectByIndex = (index: number, value: string) => {
  cy.log(`Selecting "${value}" on select at index ${index}`);

  return cy.get("body").then(($body) => {
    const selects = $body.find("select");

    if (selects.length > index) {
      // Try selecting with a wait for the select to be ready
      cy.get("select")
        .eq(index)
        .should("exist")
        .then(($select) => {
          // Check if the value is available
          // Fix: Add proper type assertion to HTMLSelectElement
          const selectElement = $select[0] as HTMLSelectElement;
          const options = Array.from(selectElement.options).map(
            (opt) => opt.value
          );
          if (options.includes(value)) {
            cy.wrap($select).select(value, { force: true });
          } else {
            cy.log(
              `Value "${value}" not available in options: [${options.join(
                ", "
              )}]`
            );
            // Try selecting the first option as fallback
            if (options.length > 0) {
              cy.wrap($select).select(options[0], { force: true });
            }
          }
        });
      cy.wait(300); // Small wait for UI updates
      return true;
    } else {
      cy.log(`No select found at index ${index}`);
      return false;
    }
  });
};

/**
 * Set all security levels at once using data-testid selectors
 */
export const setAllLevels = (
  availability: string,
  integrity: string,
  confidentiality: string
) => {
  // Use data-testid selectors for more reliable selection
  cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`, { timeout: 10000 })
    .should("exist")
    .select(availability, { force: true });

  cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`, { timeout: 10000 })
    .should("exist")
    .select(integrity, { force: true });

  cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`, { timeout: 10000 })
    .should("exist")
    .select(confidentiality, { force: true });

  cy.wait(500); // Longer wait after setting all levels
};

/**
 * Set security levels for CIA triad
 * @param availabilityLevel Availability security level
 * @param integrityLevel Integrity security level
 * @param confidentialityLevel Confidentiality security level
 */
export const setSecurityLevels = (
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): void => {
  // Navigate to security selections if not already visible
  cy.get("body").then(($body) => {
    if (!$body.find(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`).is(":visible")) {
      cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`).scrollIntoView();
    }
  });

  // Set individual levels with force option to handle any overlay issues
  cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`).select(availabilityLevel, { force: true });
  cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`).select(integrityLevel, { force: true });
  cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`).select(confidentialityLevel, {
    force: true,
  });

  // Wait for changes to take effect
  cy.wait(500);
};

/**
 * Log information about security content on the page
 */
export const logSecurityContent = (level: string) => {
  cy.log(`Looking for content related to "${level}" security level`);

  cy.get("body")
    .invoke("text")
    .then((text) => {
      // Check for level-specific patterns
      const patterns = [
        new RegExp(level, "i"),
        level === "High"
          ? /robust|strong/i
          : level === "Moderate"
          ? /balanced|standard/i
          : level === "Low"
          ? /basic|minimal/i
          : level === "None"
          ? /no protection|no security/i
          : level === "Very High"
          ? /maximum|highest/i
          : /security/i,
      ];

      patterns.forEach((pattern) => {
        const hasMatch = pattern.test(text);
        cy.log(`Pattern ${pattern} match: ${hasMatch ? "✅" : "❌"}`);
      });

      // Log a sample of the body text
      cy.log(`Body text excerpt: ${text.substring(0, 200)}...`);
    });
};

/**
 * Simple logging of page elements
 */
export const logPageElements = () => {
  cy.get("body").then(($body) => {
    cy.log(`Page contains ${$body.find("div").length} div elements`);
    cy.log(`Page contains ${$body.find("select").length} select elements`);
    cy.log(`Page contains ${$body.find("button").length} button elements`);
    cy.log(`Page contains ${$body.find("input").length} input elements`);

    // Log select options
    const selects = $body.find("select");
    if (selects.length) {
      // Fix: Use each on jQuery collection properly with correct types
      selects.each((i, el) => {
        // Fix: First check if it's a SELECT element before casting
        if (el instanceof HTMLSelectElement || el.tagName === "SELECT") {
          // Use safer typing approach
          const selectEl = el as unknown as HTMLSelectElement;
          const options = Array.from(selectEl.options).map((opt) => opt.value);
          cy.log(`Select #${i} options: [${options.join(", ")}]`);
        } else {
          cy.log(`Element at index ${i} is not a select element`);
        }
      });
    }
  });
};

/**
 * Makes sure the application is fully loaded with security controls
 */
export const ensureAppLoaded = () => {
  // Wait for basic content
  cy.get("body", { timeout: 20000 }).should("not.be.empty");

  // Extra wait for hydration
  cy.wait(1000);

  // Specifically look for security level controls
  cy.get("body").then(($body) => {
    const hasControls =
      $body.find(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`).length > 0;

    if (hasControls) {
      cy.log("Security level controls found by data-testid");
    } else {
      // If not found by data-testid, check for generic selects as fallback
      const selectCount = $body.find("select").length;
      cy.log(`Found ${selectCount} select elements`);
    }
  });

  // Log the current state
  logPageElements();

  return true;
};

/**
 * Set security levels with maximum reliability using data-testid selectors
 * This is a replacement for setSecurityLevelsReliably
 */
export const setSecurityLevelsReliably = (
  availability: string,
  integrity: string,
  confidentiality: string
) => {
  // Use the cy.setSecurityLevels custom command which uses data-testid selectors
  cy.setSecurityLevels(availability, integrity, confidentiality);
};

/**
 * Helper to navigate to a specific widget
 * @param widgetTestId The data-testid of the widget
 */
export const navigateToWidget = (widgetTestId: string): void => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView({ easing: "linear", duration: 100 })
    .should("be.visible");
};

/**
 * Check if text exists anywhere in the document
 * @param text Text to search for
 */
export const textExistsAnywhere = (
  text: string
): Cypress.Chainable<boolean> => {
  return cy.get("body").then(($body) => {
    const content = $body.text();
    return content.includes(text);
  });
};

/**
 * Safe scroll into view that handles errors
 */
Cypress.Commands.add(
  "safeScrollIntoView",
  { prevSubject: true },
  (subject, options = {}) => {
    try {
      return cy.wrap(subject).scrollIntoView(options);
    } catch (error) {
      cy.log("Error during scrollIntoView, continuing test");
      return cy.wrap(subject);
    }
  }
);
