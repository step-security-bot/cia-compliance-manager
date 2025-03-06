import { TEST_IDS, getTestSelector } from "./constants";

// DO NOT declare types here - they are in types.d.ts
// Remove all "declare global" blocks

// Define command implementations

/**
 * Custom command to set security levels for all CIA components
 * with enhanced reliability for large viewports
 */
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    // First make sure the security controls are visible in the viewport
    cy.get(getTestSelector(TEST_IDS.SECURITY_LEVEL_CONTROLS), {
      timeout: 5000, // Reduced timeout
    })
      .should("exist")
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .wait(300); // Reduced wait time

    // Set availability level with retry logic
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT))
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(availability, { force: true });
        } else {
          cy.log("Availability select is disabled, waiting...");
          cy.wait(300); // Reduced wait time
          cy.wrap($el)
            .should("not.be.disabled")
            .select(availability, { force: true });
        }
      })
      .wait(200); // Reduced wait time

    // Set integrity level with retry logic
    cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT))
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(integrity, { force: true });
        } else {
          cy.log("Integrity select is disabled, waiting...");
          cy.wait(300); // Reduced wait time
          cy.wrap($el)
            .should("not.be.disabled")
            .select(integrity, { force: true });
        }
      })
      .wait(200); // Reduced wait time

    // Set confidentiality level with retry logic
    cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT))
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(confidentiality, { force: true });
        } else {
          cy.log("Confidentiality select is disabled, waiting...");
          cy.wait(300); // Reduced wait time
          cy.wrap($el)
            .should("not.be.disabled")
            .select(confidentiality, { force: true });
        }
      });

    // Wait for UI to update after all selections
    cy.wait(300); // Reduced wait time
  }
);

/**
 * Ensures app is loaded with enhanced viewport awareness
 */
Cypress.Commands.add("ensureAppLoaded", () => {
  // Set a large viewport for better visibility
  cy.viewport(3840, 2160);

  // Wait for the app to initialize
  cy.get("body", { timeout: 5000 }) // Reduced timeout
    .should("not.be.empty");

  // Check that main app container exists and is visible
  cy.get(getTestSelector(TEST_IDS.APP_CONTAINER), {
    timeout: 5000, // Reduced timeout
  })
    .should("exist")
    .and("be.visible");

  // Wait for any initial animations or loading to complete
  cy.wait(500); // Reduced wait time

  return cy.wrap(true);
});

/**
 * Retrieves a test ID with proper escaping
 */
Cypress.Commands.add("getByTestId", (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`);
});

/**
 * Navigate to a specific widget with enhanced reliability
 */
Cypress.Commands.add("navigateToWidget", (widgetTestId: string) => {
  // First check if element exists at all
  cy.get("body").then(($body) => {
    const exists = $body.find(`[data-testid="${widgetTestId}"]`).length > 0;

    if (exists) {
      // Fix containers with overflow issues
      cy.get(`[data-testid="${widgetTestId}"]`)
        .parents()
        .each(($el) => {
          // Remove overflow restriction on all parent elements
          cy.wrap($el).invoke("css", "overflow", "visible");
        });

      // Now try to interact with element
      cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 5000 })
        .should("exist")
        .scrollIntoView({ duration: 100, offset: { top: -100, left: 0 } })
        .invoke("css", "visibility", "visible")
        .invoke("css", "opacity", "1")
        .should("be.visible")
        .wait(300);
    } else {
      // Log helpful error for missing elements
      cy.log(`Widget with testId "${widgetTestId}" not found in the DOM`);
      // Take screenshot for debugging
      cy.screenshot(`missing-element-${widgetTestId}`);
      // Continue the test - will fail naturally when element is used
    }
  });
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

/**
 * Safe scrollIntoView that properly handles the force option
 * without TypeScript errors
 */
Cypress.Commands.add(
  "safeScrollIntoView",
  { prevSubject: "element" },
  (subject, options = {}) => {
    // Fix: Use proper ScrollIntoViewOptions with valid ScrollLogicalPosition values
    const defaultOptions = {
      block: "center" as ScrollLogicalPosition,
      behavior: "smooth" as ScrollBehavior,
      ...options,
    };

    cy.wrap(subject).then(($el) => {
      // Use native scrollIntoView with fallback
      try {
        $el[0].scrollIntoView(defaultOptions);
      } catch (err) {
        // Fallback to simpler version if the browser doesn't support options
        $el[0].scrollIntoView();
      }
    });

    // Add a short wait after scrolling to let animations complete
    cy.wait(300);

    return cy.wrap(subject);
  }
);

/**
 * List JUnit files in the results directory
 */
Cypress.Commands.add("listJunitFiles", () => {
  cy.task("listJunitFiles").then((files) => {
    cy.log(`Found ${files.length} JUnit files:`);
    files.forEach((file: string) => {
      cy.log(`- ${file}`);
    });
  });
});

// Define a custom type definition for the Chainable interface
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      forceVisible(): Chainable<Subject>;
      isReactHydrated(): Chainable<boolean>;
      isVisible(): Chainable<boolean>;
      /**
       * Navigate to app and ensure it's loaded properly
       */
      ensureAppLoaded(): void;

      /**
       * Safe scroll into view that handles errors
       */
      safeScrollIntoView(
        options?: Partial<Cypress.ScrollToOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

/**
 * Force element to be visible
 */
Cypress.Commands.add(
  "forceVisible",
  { prevSubject: ["element"] },
  (subject: JQuery<HTMLElement>) => {
    return cy
      .wrap(subject)
      .invoke(
        "attr",
        "style",
        "display: block !important; visibility: visible !important;"
      );
  }
);

/**
 * Check if React app is hydrated
 */
Cypress.Commands.add("isReactHydrated", () => {
  return cy.window().then((win) => {
    return cy.wrap(!!(win as any).__REACT_HYDRATED__);
  });
});

/**
 * Check if element is visible using IntersectionObserver
 */
Cypress.Commands.add(
  "isVisible",
  { prevSubject: ["element"] },
  (subject: JQuery<HTMLElement>) => {
    return cy.wrap(subject).then(($el) => {
      const el = $el[0];
      return new Promise<boolean>((resolve) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              resolve(entry.isIntersecting);
              observer.disconnect();
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      }).then((isVisible) => isVisible); // Directly return the boolean value
    });
  }
);

// Export empty object at the end
export {};
