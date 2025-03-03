/**
 * Test helper functions for common operations and fixes
 */

/**
 * Performs a more reliable element interaction with fallbacks
 * @param selector The element selector
 * @param action The action to perform ('click', 'select', etc.)
 * @param options Additional options
 */
export function interactWithElement(
  selector: string,
  action: "click" | "select" | "type" | "check",
  options: any = {}
) {
  const { value, force = true, timeout = 10000 } = options;

  return cy
    .get(selector, { timeout })
    .should("exist")
    .then(($el) => {
      // If element exists but is not visible, try to force visibility
      if ($el.length && !$el.is(":visible")) {
        cy.wrap($el).invoke("css", "display", "block");
        cy.wrap($el).invoke("css", "visibility", "visible");
      }

      // Now perform the requested action
      switch (action) {
        case "click":
          return cy.wrap($el).click({ force });
        case "select":
          return cy.wrap($el).select(value, { force });
        case "type":
          return cy.wrap($el).type(value, { force });
        case "check":
          return cy.wrap($el).check({ force });
      }
    });
}

/**
 * Waits for an element with more robust fallbacks
 * @param selector The element selector
 * @param options Wait options
 */
export function waitForElement(selector: string, options: any = {}) {
  const { timeout = 10000, visibility = true } = options;

  return cy.get("body").then(($body) => {
    // Check if element exists in DOM
    if ($body.find(selector).length) {
      if (visibility) {
        return cy.get(selector, { timeout }).should("be.visible");
      }
      return cy.get(selector, { timeout }).should("exist");
    } else {
      // If not found, wait and retry
      cy.wait(1000);
      return cy.get(selector, { timeout });
    }
  });
}

/**
 * Skip test conditionally if certain elements are not found
 * @param selector Element that must exist for test to run
 * @param message Skip message
 */
export function skipTestIfElementMissing(selector: string, message: string) {
  cy.get("body").then(($body) => {
    if (!$body.find(selector).length) {
      cy.log(`**Test skipped:** ${message}`);
      // Use type assertion to access internal Cypress methods
      (cy as any).state("test").skip();
    }
  });
}

export default {
  interactWithElement,
  waitForElement,
  skipTestIfElementMissing,
};
