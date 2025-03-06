import "./commands";
import { mount } from "cypress/react";
import "@testing-library/cypress/add-commands";
import { TEST_IDS } from "../../src/constants/testIds";
// Import debug helpers
import "./debug-helpers";

Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception:", err);
  return false;
});

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("checkTheme", (isDark: boolean) => {
  if (isDark) {
    cy.get("#root").should("have.class", "dark");
    cy.get(`[data-testid="${TEST_IDS.THEME_TOGGLE}"]`).should(
      "contain.text",
      "Light Mode"
    );
  } else {
    cy.get("#root").should("not.have.class", "dark");
    cy.get(`[data-testid="${TEST_IDS.THEME_TOGGLE}"]`).should(
      "contain.text",
      "Dark Mode"
    );
  }
});

Cypress.Commands.add(
  "safeSelect",
  { prevSubject: "element" },
  (subject, value, options = {}) => {
    cy.wrap(subject).scrollIntoView();
    cy.wait(200);
    return cy.wrap(subject).select(value, { force: true, ...options });
  }
);

Cypress.Commands.add(
  "setSecurityLevels",
  (availability, integrity, confidentiality) => {
    cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`)
      .should("be.visible")
      .scrollIntoView();

    cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`).within(() => {
      if (availability) {
        cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`).select(
          availability,
          { force: true }
        );
      }

      if (integrity) {
        cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`).select(
          integrity,
          { force: true }
        );
      }

      if (confidentiality) {
        cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`).select(
          confidentiality,
          { force: true }
        );
      }
    });

    cy.wait(300);
  }
);

Cypress.Commands.add("ensureAppLoaded", () => {
  cy.get("body", { timeout: 10000 }).should("not.be.empty");
  cy.contains("CIA Compliance Manager", { timeout: 5000 }).should("be.visible");
});

Cypress.config("defaultCommandTimeout", 10000);

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const parentTitle = runnable?.parent?.title || "Unknown";
    const testTitle = test?.title || "Unknown";

    cy.screenshot(`${parentTitle} -- ${testTitle} -- debug-failure`, {
      capture: "fullPage",
    });

    cy.document().then((doc) => {
      console.log("HTML at failure:", doc.documentElement.outerHTML);
    });

    try {
      const win = window as any;
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

before(() => {
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

before(() => {
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

Cypress.Commands.add("setAppState", (stateChanges) => {
  cy.window().then((win) => {
    const event = new CustomEvent("test:set-values", {
      detail: stateChanges,
    });
    win.document.dispatchEvent(event);
    return cy.wrap(null).wait(100);
  });
});

Cypress.Commands.add("containsText", (text) => {
  cy.get("body").invoke("text").should("include", text);
});

Cypress.Commands.add("logCurrentState", () => {
  cy.log("------ Current App State ------");
  cy.get("select").then(($selects) => {
    $selects.each((i, el) => {
      cy.log(`${el.id || "unknown select"}: ${el.value}`);
    });
  });
});

Cypress.Commands.add("selectSafe", (selector, value) => {
  cy.get(selector, { timeout: 5000 })
    .should("exist")
    .scrollIntoView()
    .wait(100)
    .select(value, { force: true });
});

Cypress.Commands.add("logElementDetails", (selector) => {
  cy.get(selector).then(($el) => {
    cy.log(`Element ${selector}:`);
    cy.log(`- Visible: ${$el.is(":visible")}`);
    cy.log(`- Disabled: ${$el.is(":disabled")}`);
    cy.log(`- Classes: ${$el.attr("class")}`);
    cy.log(`- Width x Height: ${$el.width()} x ${$el.height()}`);

    const offset = $el.offset();
    if (offset) {
      cy.log(`- Position: (${offset.left}, ${offset.top})`);
    }
  });
});

before(() => {
  cy.task("resetJunitResults");
});

import "cypress-wait-until";
import "cypress-real-events";

Cypress.Commands.add("navigateToWidget", (widgetTestId) => {
  cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

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

Cypress.config("retries", {
  runMode: 1,
  openMode: 0,
});

beforeEach(() => {
  if (Cypress.config("viewportWidth") === 0) {
    cy.viewport(1280, 800);
  }
});
