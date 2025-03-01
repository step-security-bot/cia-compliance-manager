/**
 * User Story: As a user, I can view the CIA Compliance dashboard
 *
 * This smoke test verifies the most basic functionality -
 * that the application loads and displays its core elements.
 */
import { UI_TEXT } from "../../support/appConstantsHelper";

describe("Dashboard Loads", () => {
  beforeEach(() => {
    // Visit the app with increased timeout for CI environments
    cy.visit("/", { timeout: 20000 });

    // Wait for the app to load by checking for any content
    cy.get("body", { timeout: 10000 }).should("not.be.empty");
  });

  it("displays the application title", () => {
    // Look for application title using flexible matching
    cy.contains(new RegExp(UI_TEXT.APP_TITLES[0], "i")).should("be.visible");
  });

  it("shows security selection controls", () => {
    // Check that selection controls are present
    cy.get("select").should("exist");
    cy.contains(/security|level|cia|compliance/i).should("be.visible");
  });

  it("has basic layout structure", () => {
    // Verify the basic page structure exists
    cy.get('header, nav, main, div[class*="container"]').should("exist");
  });

  it("shows all required widgets", () => {
    // Check for widget areas with flexible selectors
    cy.get("body").then(($body) => {
      // Log what's on the page for diagnostics
      cy.log(`Page contains ${$body.find("div").length} div elements`);

      // Look for widgets with flexible matching
      [/security/i, /compliance/i, /cost/i, /value/i, /impact/i].forEach(
        (pattern) => {
          cy.contains(pattern).should("exist");
        }
      );
    });
  });
});
