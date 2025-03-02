/**
 * User Story: As a user, I can switch between light and dark mode
 *
 * Tests the theme toggle functionality to ensure users can
 * adjust the display to their preference.
 */
import { CypressConstants } from "../../support/appConstantsHelper";
import { logPageElements } from "../../support/testHelpers";

const { UI_TEXT } = CypressConstants;

describe("Toggle Display Theme", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays theme toggle button", () => {
    // Look for theme toggle button using test ID
    cy.get('[data-testid="theme-toggle"]').should("exist").and("be.visible");
  });

  it("switches between dark and light modes", () => {
    // First check initial state
    cy.get("html").then(($html) => {
      const initialIsDark = $html.hasClass("dark");
      cy.log(`Initial theme is ${initialIsDark ? "dark" : "light"}`);

      // Click the toggle button
      cy.get('[data-testid="theme-toggle"]').click();

      // Verify the theme changed
      cy.get("html").should(($html) => {
        const newIsDark = $html.hasClass("dark");
        expect(newIsDark).to.not.equal(initialIsDark);
      });

      // Check that button text changed appropriately
      cy.get('[data-testid="theme-toggle"]').should(($btn) => {
        if ($btn.text().includes("Light")) {
          expect($html.hasClass("dark")).to.be.true;
        } else {
          expect($html.hasClass("dark")).to.be.false;
        }
      });
    });
  });

  it("shows gaming-inspired styles in dark mode", () => {
    // Ensure we're in dark mode
    cy.get("html").then(($html) => {
      if (!$html.hasClass("dark")) {
        cy.get('[data-testid="theme-toggle"]').click();
      }
    });

    // Wait for transition
    cy.wait(500);

    // Verify dark mode specific styles
    cy.get('[data-testid="theme-toggle"]').should("contain", "Light");

    // Check for Ingress-inspired styling
    cy.get("html.dark").should("exist");

    // Take a screenshot for visual verification
    cy.screenshot("dark-mode-gaming-style");
  });

  it("shows corporate style in light mode", () => {
    // Ensure we're in light mode
    cy.get("html").then(($html) => {
      if ($html.hasClass("dark")) {
        cy.get('[data-testid="theme-toggle"]').click();
      }
    });

    // Wait for transition
    cy.wait(500);

    // Verify light mode specific styles
    cy.get('[data-testid="theme-toggle"]').should("contain", "Dark");

    // Check that dark mode class is removed
    cy.get("html").should("not.have.class", "dark");

    // Take a screenshot for visual verification
    cy.screenshot("light-mode-corporate-style");
  });
});
