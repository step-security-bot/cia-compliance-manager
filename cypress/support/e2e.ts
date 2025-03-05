// ***********************************************************
// This file is processed and loaded automatically
// before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import "./commands";
import { mount } from "cypress/react";

import "@testing-library/cypress/add-commands";

// Import the cypress command types (should be at the top of the file)
/// <reference types="cypress" />

// Prevents Cypress from failing tests when uncaught exceptions occur in the application
Cypress.on("uncaught:exception", (err) => {
  // returning false here prevents Cypress from failing the test
  console.log("Uncaught exception:", err);
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
    // Navigate to the security profile widget first
    cy.get('[data-testid="widget-security-profile"]')
      .should("be.visible")
      .scrollIntoView();

    // Now try to find the selects inside this widget
    cy.get('[data-testid="widget-security-profile"]').within(() => {
      if (availability) {
        cy.get("#availability-select").select(availability, { force: true });
      }

      if (integrity) {
        cy.get("#integrity-select").select(integrity, { force: true });
      }

      if (confidentiality) {
        cy.get("#confidentiality-select").select(confidentiality, {
          force: true,
        });
      }
    });

    // Wait for changes to apply
    cy.wait(300);
  }
);

// Add ensureAppLoaded helper command
Cypress.Commands.add("ensureAppLoaded", () => {
  // First verify the body has content
  cy.get("body", { timeout: 10000 }).should("not.be.empty");

  // Then verify the app title is present
  cy.contains("CIA Compliance Manager", { timeout: 5000 }).should("be.visible");
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

// Helper for navigating to specific widgets
Cypress.Commands.add("navigateToWidget", (widgetTestId) => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

// FIX: Overwrite scrollIntoView with proper type casting
before(() => {
  Cypress.Commands.overwrite(
    "scrollIntoView",
    function (originalFn, subject, options?) {
      const el = subject as unknown as JQuery<HTMLElement>;
      const fn = originalFn as unknown as (
        subj: JQuery<HTMLElement>,
        opts?: Partial<Cypress.ScrollIntoViewOptions>
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      if (el && el.length > 1) {
        return fn.call(this, el.first(), options);
      }
      return fn.call(this, el, options);
    }
  );

  // Existing fail handler remains unchanged
  Cypress.on("fail", (error, runnable) => {
    if (
      error.message.includes("not visible") ||
      error.message.includes("being clipped")
    ) {
      cy.log("Element visibility issue detected. Adding debug information...");
      cy.screenshot(`debug-${runnable.title.replace(/\s+/g, "-")}`, {
        capture: "viewport",
      });
    }
    throw error;
  });
});

// Add test retry logic for flaky visibility tests
Cypress.config("retries", {
  runMode: 1,
  openMode: 0,
});

// Remove any other duplicate implementation of scrollIntoView overwrite

// Ensure viewport is consistent for all tests if not specified
beforeEach(() => {
  // Use a reasonable default size if not explicitly set in the test
  if (Cypress.config("viewportWidth") === 0) {
    cy.viewport(1280, 800);
  }
});
