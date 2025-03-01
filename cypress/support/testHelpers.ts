/**
 * Simple test helper functions for more reliable testing
 */
import { SECURITY_LEVELS } from "./appConstantsHelper";

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
  cy.get('[data-testid="availability-select"]', { timeout: 10000 })
    .should("exist")
    .select(availability, { force: true });

  cy.get('[data-testid="integrity-select"]', { timeout: 10000 })
    .should("exist")
    .select(integrity, { force: true });

  cy.get('[data-testid="confidentiality-select"]', { timeout: 10000 })
    .should("exist")
    .select(confidentiality, { force: true });

  cy.wait(500); // Longer wait after setting all levels
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
      $body.find('[data-testid="security-level-controls"]').length > 0;

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
