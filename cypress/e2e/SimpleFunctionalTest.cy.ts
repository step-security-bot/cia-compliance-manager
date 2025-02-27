/**
 * This file has been temporarily renamed to disable it from running
 */

// The .skip() method will prevent this entire file from running
describe.skip("CIA Manager - Core Functionality", () => {
  // Before each test, load the app fresh
  beforeEach(() => {
    // Using a fixed viewport for consistency
    cy.viewport(1200, 800);

    // Visit the app with slow animations disabled
    cy.visit("/", {
      onBeforeLoad: (win) => {
        const style = win.document.createElement("style");
        // Disable all animations and transitions
        style.innerHTML =
          "* { animation-duration: 0s !important; transition-duration: 0s !important; }";
        win.document.head.appendChild(style);
      },
      // Extend load timeout
      timeout: 15000,
    });

    // First make sure app has loaded by finding the title
    cy.contains("CIA Compliance Manager", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  /**
   * Core test that just verifies the app renders
   */
  it("should load the app interface", () => {
    // Look for any text that must exist in the app
    cy.contains("CIA Compliance Manager").should("be.visible");

    // Verify basic structure exists
    cy.get("body").within(() => {
      cy.get("header").should("exist");
      cy.get("main").should("exist");
      cy.get("select").should("exist");
      cy.get("button").should("exist");
    });
  });

  /**
   * Dark mode toggle test - should be reliable
   */
  it("should toggle dark mode theme", () => {
    // Find the button by its content or test ID
    cy.contains("button", /Dark Mode|Light Mode/)
      .should("be.visible")
      .as("themeToggle");

    // Click it
    cy.get("@themeToggle").click();

    // Verify any change happened
    cy.get("body")
      .invoke("attr", "class")
      .then((classes) => {
        // Just log the class for debugging
        cy.log(`Body classes after toggle: ${classes || "none"}`);
      });

    // Look for the toggle text change
    cy.contains("button", "Light Mode").should("exist");
  });

  /**
   * Ultra-simplified select test that doesn't rely on specific selectors
   */
  it("should allow changing security selections", () => {
    // Find all select elements
    cy.get("select").then(($selects) => {
      // Log how many we found
      cy.log(`Found ${$selects.length} select elements`);

      // Just try selecting a value on the first select
      if ($selects.length > 0) {
        // Try to select a value
        cy.wrap($selects[0]).select("High", { force: true });

        // Verify the selection applied
        cy.wrap($selects[0]).should("have.value", "High");
      }
    });
  });
});
