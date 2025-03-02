/**
 * User Story: As a user, I can switch between light and dark mode
 *
 * Tests the theme toggle functionality to ensure users can
 * adjust the display to their preference.
 */

describe("Toggle Display Theme", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays theme toggle button", () => {
    // The theme toggle button should be visible in the header
    cy.get("header").within(() => {
      cy.get('[data-testid="theme-toggle"]').should("exist").and("be.visible");
    });
  });

  it("switches between dark and light modes", () => {
    // Check that clicking the button toggles the theme
    cy.get("html").then(($html) => {
      const initialIsDark = $html.hasClass("dark");

      // Click the toggle button
      cy.get('[data-testid="theme-toggle"]').click();

      // Verify that the theme changed
      cy.get("html").should(($html) => {
        const newIsDark = $html.hasClass("dark");
        expect(newIsDark).to.not.equal(initialIsDark);
      });

      // Check button content changed (either LIGHT MODE or Dark Mode)
      if (initialIsDark) {
        cy.get('[data-testid="theme-toggle"]').contains("Dark Mode");
      } else {
        cy.get('[data-testid="theme-toggle"]').contains("LIGHT MODE");
      }
    });
  });

  it("persists theme choice after page reload", () => {
    // Ensure we're in dark mode
    cy.get("html").then(($html) => {
      if (!$html.hasClass("dark")) {
        cy.get('[data-testid="theme-toggle"]').click();
        cy.get("html").should("have.class", "dark");
      }
    });

    // Now reload and check if dark mode persists
    cy.reload();
    cy.ensureAppLoaded();

    // Check theme persistence
    cy.get("html").should("have.class", "dark");
  });
});
