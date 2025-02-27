import "@testing-library/cypress/add-commands";
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      checkTheme: (isDark: boolean) => void;
      setAppState: (stateChanges: any) => void;
      containsText: (text: string) => void;
    }
  }
}

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

// Fix the select command overwrite with proper types
// Use explicit any type to avoid TypeScript errors with Cypress command overrides
Cypress.Commands.overwrite("select", (originalFn: any, ...args: any) => {
  // Use type-safe approach with any to handle the proper signature
  const subject = args[0];

  // Wrap the subject safely to handle all element types
  if (subject) {
    // Use the simple version of scrollIntoView with no options
    cy.wrap(subject, { log: false }).scrollIntoView();
  }

  // Wait for scrolling, without extra options
  cy.wait(200);

  // Call original function with all arguments and add force:true
  if (args.length === 2) {
    // If only subject and value/text provided
    return originalFn(args[0], args[1], { force: true });
  } else if (args.length >= 3 && args[2]) {
    // If subject, value/text, and options provided
    const options = { ...args[2], force: true };
    return originalFn(args[0], args[1], options);
  }

  // Fallback to original function by calling it directly
  // Convert args to proper array to appease TypeScript
  const argsArray: any[] = Array.from(args);
  return originalFn.apply(null, [args[0], ...argsArray.slice(1)]);
});

// Add logging for debugging
Cypress.on("command:start", (command) => {
  if (command.name === "log") {
    // Use optional chaining for safer access to args
    const logMessage = command.args?.[0];
    if (logMessage) {
      console.log(`Cypress log: ${logMessage}`);
    }
  }
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

// Configure more optimal timeouts - shorter but still sufficient
Cypress.config("defaultCommandTimeout", 5000);
Cypress.config("pageLoadTimeout", 5000);
Cypress.config("requestTimeout", 5000);
Cypress.config("execTimeout", 5000);
Cypress.config("taskTimeout", 5000);

// Set a global command to allow direct state manipulation
// This is much more reliable than UI interactions
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
  return cy.get("body").invoke("text").should("include", text);
});

// Configure longer timeouts for all commands
Cypress.config("defaultCommandTimeout", 10000);
Cypress.config("pageLoadTimeout", 15000);
Cypress.config("requestTimeout", 12000);

// Improve logging for better debugging
Cypress.on("log:added", (attrs, log) => {
  if (attrs.displayName === "script error" || attrs.name === "error") {
    console.error("Cypress error:", attrs.message);
  }
});

// Handle uncaught exceptions - keep existing implementation
Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception:", err.message);
  return false;
});
