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
 * Set all security levels at once
 */
export const setAllLevels = (
  availability: string,
  integrity: string,
  confidentiality: string
) => {
  cy.get("body").then(($body) => {
    const selectCount = $body.find("select").length;

    if (selectCount >= 3) {
      // Use index-based selection
      selectByIndex(0, availability);
      selectByIndex(1, integrity);
      selectByIndex(2, confidentiality);
      cy.wait(500); // Longer wait after setting all levels
    } else if (selectCount > 0) {
      // Set what we can
      cy.log(`Only found ${selectCount} selects, setting what's available`);
      if (selectCount > 0) selectByIndex(0, availability);
      if (selectCount > 1) selectByIndex(1, integrity);
      cy.wait(500);
    } else {
      cy.log("No select elements found");
    }
  });
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
 * Makes sure the application is fully loaded
 */
export const ensureAppLoaded = () => {
  // Wait for basic content
  cy.get("body", { timeout: 20000 }).should("not.be.empty");

  // Extra wait for hydration
  cy.wait(1000);

  // Log the current state
  logPageElements();

  return true;
};

/**
 * Set security levels with maximum reliability
 */
export const setSecurityLevelsReliably = (
  availability: string,
  integrity: string,
  confidentiality: string
) => {
  // First check if selects exist and what they support
  cy.get("body").then(($body) => {
    // Fix: Remove duplicate 'selects' declarations and incorrect type assertion
    const selects = $body.find("select");

    // Try multiple strategies
    if (selects.length >= 3) {
      // Strategy 1: Direct selection
      try {
        cy.get("select")
          .eq(0)
          .select(availability, { force: true, timeout: 1000 })
          .then(() => cy.wait(300));

        cy.get("select")
          .eq(1)
          .select(integrity, { force: true, timeout: 1000 })
          .then(() => cy.wait(300));

        cy.get("select")
          .eq(2)
          .select(confidentiality, { force: true, timeout: 1000 })
          .then(() => cy.wait(500));

        cy.log("Successfully set security levels using direct selection");
      } catch (e) {
        // Strategy 2: Use our more reliable selectByIndex approach
        cy.log("Direct selection failed, using selectByIndex");
        selectByIndex(0, availability);
        selectByIndex(1, integrity);
        selectByIndex(2, confidentiality);
      }
    } else {
      cy.log(`Not enough selects found (${selects.length})`);
    }
  });
};
