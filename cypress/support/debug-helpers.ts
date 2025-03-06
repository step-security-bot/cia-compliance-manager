/**
 * Debug helpers for Cypress tests
 */

// First, add type definitions
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Takes a screenshot and logs DOM state at failure point
       * @param testName Name of the test that failed
       */
      debugFailure(testName: string): void;

      /**
       * Logs information about currently visible elements
       */
      logVisibleElements(): void;

      /**
       * Logs all test IDs present in the DOM for debugging
       */
      logAllTestIds(): void;
    }
  }
}

/**
 * Takes a screenshot with current test info and logs DOM state
 */
export function debugFailure(testName: string): void {
  cy.screenshot(`debug-${testName.replace(/\s+/g, "-")}`, {
    capture: "viewport",
  });
  cy.document().then((doc) => {
    console.log(
      `HTML at failure point for ${testName}:`,
      doc.body.outerHTML.substring(0, 1000) + "..."
    );
  });
}

/**
 * Logs info about currently visible elements
 */
export function logVisibleElements(): void {
  cy.log("**Visible Elements on Page**");

  cy.document().then((doc) => {
    const allElements = Array.from(doc.querySelectorAll("*"));
    const visibleElements = allElements.filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        el.getBoundingClientRect().height > 0
      );
    });

    const testIdElements = visibleElements.filter((el) =>
      el.hasAttribute("data-testid")
    );

    cy.log(`Total elements: ${allElements.length}`);
    cy.log(`Visible elements: ${visibleElements.length}`);
    cy.log(`Elements with data-testid: ${testIdElements.length}`);

    testIdElements.slice(0, 10).forEach((el) => {
      cy.log(`Element with data-testid="${el.getAttribute("data-testid")}"`);
    });
  });
}

/**
 * Logs all test IDs present in the DOM for debugging
 */
export function logAllTestIds() {
  cy.document().then((doc) => {
    const elements = doc.querySelectorAll("[data-testid]");
    cy.log(`Found ${elements.length} elements with data-testid`);

    const testIds = Array.from(elements).map((el) =>
      el.getAttribute("data-testid")
    );
    cy.log("Available test IDs:");
    testIds.forEach((id, index) => {
      if (index < 20) {
        // Limit logging to first 20
        cy.log(`- ${id}`);
      }
    });

    if (testIds.length > 20) {
      cy.log(`...and ${testIds.length - 20} more`);
    }
  });
}

/**
 * Add these debug helpers to Cypress commands
 */
Cypress.Commands.add("debugFailure", (testName: string) => {
  debugFailure(testName);
});

Cypress.Commands.add("logVisibleElements", () => {
  logVisibleElements();
});

Cypress.Commands.add("logAllTestIds", logAllTestIds);

export default {
  debugFailure,
  logVisibleElements,
  logAllTestIds,
};
