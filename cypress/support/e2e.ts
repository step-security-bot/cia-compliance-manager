// Import commands.ts using ES2015 syntax:
import "./commands";
import { mount } from "cypress/react";

import "@testing-library/cypress/add-commands";
import "./appConstantsHelper";

// Prevents Cypress from failing tests when uncaught exceptions occur in the application
Cypress.on("uncaught:exception", (err) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Note: We don't need to redefine types here since they're in index.d.ts
// Remove the conflicting type declarations

// Add the mount command for component testing
Cypress.Commands.add("mount", mount);

// Keep existing theme checking command
Cypress.Commands.add("checkTheme", (isDark: boolean) => {
  if (isDark) {
    cy.get("#root").should("have.class", "dark");
    cy.get('[data-testid="theme-toggle"]').should("contain.text", "Light Mode");
  } else {
    cy.get("#root").should("not.have.class", "dark");
    cy.get('[data-testid="theme-toggle"]').should("contain.text", "Dark Mode");
  }
});

// Add a safe select command instead of overwriting the built-in one
Cypress.Commands.add(
  "safeSelect",
  { prevSubject: "element" },
  (subject, value, options = {}) => {
    // First scroll the element into view without returning a promise
    cy.wrap(subject).scrollIntoView();
    cy.wait(200); // Add a small wait for stability

    // Use the regular select with force: true
    return cy.wrap(subject).select(value, { force: true, ...options });
  }
);

// Update the setSecurityLevels command to match the type definition order
Cypress.Commands.add(
  "setSecurityLevels",
  (availability, integrity, confidentiality) => {
    cy.get('[data-testid="availability-select"]')
      .scrollIntoView()
      .select(availability, { force: true });
    cy.wait(100);

    cy.get('[data-testid="integrity-select"]')
      .scrollIntoView()
      .select(integrity, { force: true });
    cy.wait(100);

    cy.get('[data-testid="confidentiality-select"]')
      .scrollIntoView()
      .select(confidentiality, { force: true });
    cy.wait(100);
  }
);

// Add ensureAppLoaded helper command
Cypress.Commands.add("ensureAppLoaded", () => {
  // Wait for the app to be ready
  cy.get("body", { timeout: 10000 }).should("not.have.class", "loading");

  // Check for a core element to confirm app is loaded
  cy.get('[data-testid="widget-security-level-selection"]', {
    timeout: 5000,
  }).should("exist");

  // No return statement needed, this matches the void return type in the declaration
});

// Use longer timeouts for all commands
Cypress.config("defaultCommandTimeout", 10000);

// Add screenshot on failure with more context (fix TypeScript errors)
Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    // Take a screenshot with more context
    const parentTitle = runnable?.parent?.title || "Unknown";
    const testTitle = test?.title || "Unknown";

    // Take a full page screenshot for better debugging
    cy.screenshot(`${parentTitle} -- ${testTitle} -- debug-failure`, {
      capture: "fullPage",
    });

    // Log DOM state for debugging
    cy.document().then((doc) => {
      console.log("HTML at failure:", doc.documentElement.outerHTML);
    });

    // Log React component state if available - fix TypeScript error
    try {
      const win = window as any; // Use type assertion
      if (
        win.Cypress &&
        typeof win.Cypress === "object" &&
        "reactComponentState" in win.Cypress
      ) {
        console.log("React component state:", win.Cypress.reactComponentState);
      }
    } catch (e) {
      console.log("Could not access React component state:", e);
    }
  }
});

// Configure better defaults for all tests
before(() => {
  // Add a CSS class to disable transitions during tests
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.innerHTML = `
      .cypress-testing * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add("cypress-testing");
  });
});

// Optimize performance settings
before(() => {
  // Disable app animations and transitions globally
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        transition-duration: 0ms !important;
        animation-duration: 0ms !important;
        transition-delay: 0ms !important;
        animation-delay: 0ms !important;
      }
      .fade { opacity: 1 !important; }
    `;
    document.head.appendChild(style);
    document.body.classList.add("cypress-testing");
  });
});

// Set a global command to allow direct state manipulation
Cypress.Commands.add("setAppState", (stateChanges) => {
  cy.window().then((win) => {
    const event = new CustomEvent("test:set-values", {
      detail: stateChanges,
    });
    win.document.dispatchEvent(event);

    // Return a small promise to allow chaining
    return cy.wrap(null).wait(100);
  });
});

// More efficient shorthand for common text content checks
Cypress.Commands.add("containsText", (text) => {
  // The type expects void return not a chainable
  cy.get("body").invoke("text").should("include", text);

  // No return statement needed, this matches the void return type in the declaration
});

// Add debug command to help diagnose issues
Cypress.Commands.add("logCurrentState", () => {
  cy.log("------ Current App State ------");
  cy.get("select").then(($selects) => {
    $selects.each((i, el) => {
      cy.log(`${el.id || "unknown select"}: ${el.value}`);
    });
  });
});

// Create wrapper around select that's more reliable
Cypress.Commands.add("selectSafe", (selector, value) => {
  cy.get(selector, { timeout: 5000 })
    .should("exist")
    .scrollIntoView()
    .wait(100)
    .select(value, { force: true });
});

// Add DOM debugging command
Cypress.Commands.add("logElementDetails", (selector) => {
  cy.get(selector).then(($el) => {
    cy.log(`Element ${selector}:`);
    cy.log(`- Visible: ${$el.is(":visible")}`);
    cy.log(`- Disabled: ${$el.is(":disabled")}`);
    cy.log(`- Classes: ${$el.attr("class")}`);
    cy.log(`- Width x Height: ${$el.width()} x ${$el.height()}`);

    // Position info can help debug if element is off-screen
    const offset = $el.offset();
    if (offset) {
      cy.log(`- Position: (${offset.left}, ${offset.top})`);
    }
  });
});

// Reset JUnit results at the beginning of a test run
before(() => {
  cy.task("resetJunitResults");
});

// Import additional testing libraries
import "cypress-wait-until";
import "cypress-real-events";
