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
    // Check theme toggle button exists
    cy.get('[data-testid="theme-toggle"]').should("exist").and("be.visible");
  });

  it("switches between dark and light modes", () => {
    // Check initial state of the document
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

      // Check button text changed appropriately
      cy.get('[data-testid="theme-toggle"]').should(($btn) => {
        const btnText = $btn.text();
        if (btnText.includes("LIGHT MODE")) {
          expect($html.hasClass("dark")).to.be.true;
        } else {
          expect($html.hasClass("dark")).to.be.false;
        }
      });
    });
  });

  it("persists theme choice after page reload", () => {
    // Set to dark mode if not already
    cy.get("html").then(($html) => {
      if (!$html.hasClass("dark")) {
        cy.get('[data-testid="theme-toggle"]').click();
        cy.get("html").should("have.class", "dark");
      }
    });

    // Reload the page
    cy.reload();
    cy.ensureAppLoaded();

    // Verify dark mode is still active
    cy.get("html").should("have.class", "dark");
  });
});
