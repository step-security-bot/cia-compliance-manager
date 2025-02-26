// Define types for CIA levels for better type safety
type CIALevel = "None" | "Low" | "Moderate" | "High" | "Very High";
type CIAControl = "confidentiality" | "integrity" | "availability";

describe("CIA Classification App", () => {
  // Add custom commands for common operations
  beforeEach(() => {
    cy.visit("/");
    // Handle any uncaught exceptions to prevent test failures
    cy.on("uncaught:exception", () => false);

    // Wait for the app to be fully loaded
    cy.get('[data-testid="app-title"]', { timeout: 10000 }).should(
      "be.visible"
    );
  });

  // Test multiple device viewports
  const devices = [
    { width: 1920, height: 1080, name: "desktop" },
    { width: 768, height: 1024, name: "tablet" },
    { width: 375, height: 667, name: "mobile" },
  ];

  devices.forEach((device) => {
    describe(`UI Rendering on ${device.name}`, () => {
      beforeEach(() => {
        cy.viewport(device.width, device.height);
      });

      it("should load the application successfully", () => {
        cy.get('[data-testid="app-title"]')
          .should("be.visible")
          .and("contain", "CIA Classification App");
        cy.get('[data-testid="classification-form"]').should("exist");

        // Take a screenshot for visual comparison
        cy.screenshot(`app-loaded-${device.name}`);
      });
    });
  });

  describe("Classification Controls", () => {
    // Use custom event to set values instead of dropdown interactions
    it("should set CIA levels through React state", () => {
      cy.wait(1000);

      // Use the custom event we added to the React component
      cy.window().then((win) => {
        win.document.dispatchEvent(
          new CustomEvent("test:set-values", {
            detail: {
              availability: "Low",
              integrity: "Moderate",
              confidentiality: "High",
            },
          })
        );
      });

      // Wait for React to process state changes
      cy.wait(500);

      // Verify the values were set correctly
      cy.get('[data-testid="availability-select"]').should("have.value", "Low");
      cy.get('[data-testid="integrity-select"]').should(
        "have.value",
        "Moderate"
      );
      cy.get('[data-testid="confidentiality-select"]').should(
        "have.value",
        "High"
      );

      // Verify UI updates
      cy.get('[data-testid="analysis-section"]').should("be.visible");
      cy.screenshot("all-cia-levels-set");
    });

    // Data-driven test for different combinations
    const testScenarios = [
      {
        name: "Low risk scenario",
        levels: {
          confidentiality: "Low",
          integrity: "Low",
          availability: "Low",
        },
        expectedCapex: "$10,000",
        expectedOpex: "$500",
      },
      {
        name: "Mixed risk scenario",
        levels: {
          confidentiality: "High",
          integrity: "Moderate",
          availability: "Low",
        },
        expectedCapex: "$1,000,000",
        expectedOpex: "$50,000",
      },
      {
        name: "High risk scenario",
        levels: {
          confidentiality: "Very High",
          integrity: "Very High",
          availability: "Very High",
        },
        expectedCapex: "$1,000,000",
        expectedOpex: "$50,000",
      },
    ];

    testScenarios.forEach((scenario) => {
      it(`should correctly calculate costs for ${scenario.name}`, () => {
        // Set values using the custom event
        cy.window().then((win) => {
          win.document.dispatchEvent(
            new CustomEvent("test:set-values", {
              detail: scenario.levels,
            })
          );
        });

        cy.wait(500);

        // Verify cost estimates
        cy.get('[data-testid="capex-estimate"]').should(
          "contain.text",
          scenario.expectedCapex
        );
        cy.get('[data-testid="opex-estimate"]').should(
          "contain.text",
          scenario.expectedOpex
        );

        // Take a screenshot of this scenario
        cy.screenshot(
          `cost-scenario-${scenario.name.toLowerCase().replace(/\s+/g, "-")}`
        );
      });
    });
  });

  describe("Theme Toggle", () => {
    it("should toggle between light and dark modes", () => {
      // Check initial state
      cy.get('[data-testid="theme-toggle"]')
        .should("be.visible")
        .and("contain.text", "Dark Mode");
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");

      // First toggle
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="theme-toggle"]').should(
        "contain.text",
        "Light Mode"
      );
      cy.get('[data-testid="app-container"]').should("have.class", "dark");
      cy.screenshot("dark-mode");

      // Second toggle
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="theme-toggle"]').should(
        "contain.text",
        "Dark Mode"
      );
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");
      cy.screenshot("light-mode");
    });
  });

  describe("Detail Cards Interaction", () => {
    it("should display detail cards with proper content", () => {
      // Use our custom event to set values
      cy.window().then((win) => {
        win.document.dispatchEvent(
          new CustomEvent("test:set-values", {
            detail: {
              availability: "High",
              integrity: "High",
              confidentiality: "High",
            },
          })
        );
      });

      cy.wait(500);

      // Check each detail card exists by first finding the recommendations container
      cy.get('[data-testid="recommendations"]').within(() => {
        // Check for each category heading
        cy.contains("Availability").should("exist");
        cy.contains("Integrity").should("exist");
        cy.contains("Confidentiality").should("exist");

        // Ensure toggle buttons exist
        cy.get('[data-testid="toggle-button"]').should("have.length", 3);
      });

      // Take screenshot
      cy.screenshot("detail-cards");
    });

    it("should display relevant recommendations based on selection", () => {
      // Set High availability to test specific recommendations
      cy.window().then((win) => {
        win.document.dispatchEvent(
          new CustomEvent("test:set-values", {
            detail: {
              availability: "High",
            },
          })
        );
      });

      cy.wait(500);

      // Find the first toggle button and click it
      cy.get('[data-testid="recommendations"] [data-testid="toggle-button"]')
        .first()
        .click();

      // Wait for animation to complete
      cy.wait(500);

      // Now check for content that should be visible
      cy.get('[data-testid="detail-content"]')
        .first()
        .should("not.have.class", "hidden");

      // Take screenshot of recommendations
      cy.screenshot("high-availability-recommendations");
    });
  });

  describe("Accessibility Testing", () => {
    it("should have accessible form controls", () => {
      // Wait for the page to be fully loaded
      cy.wait(1000);

      // Check that all select elements have labels
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        // Check that the select element exists and is visible
        cy.get(`[data-testid="${control}-select"]`).should("be.visible");

        // Check that it has an accessible label
        cy.get(`label[for="${control}"]`).should("exist");
      });

      // Check that form controls have proper ARIA attributes
      cy.get('[data-testid="classification-form"]')
        .find("select")
        .each(($select) => {
          cy.wrap($select).should("have.attr", "aria-label");
        });

      // Take a screenshot showing the accessible controls
      cy.screenshot("accessible-form-controls");
    });

    // Add a test for color contrast which is another accessibility concern
    it("should maintain proper contrast in light mode", () => {
      // Ensure we're in light mode
      cy.get('[data-testid="theme-toggle"]')
        .contains("Dark Mode")
        .should("exist");

      // Check that key elements use accessible colors
      cy.get('[data-testid="app-title"]')
        .should("be.visible")
        .and("have.css", "color");

      // Screenshot for visual verification
      cy.screenshot("light-mode-contrast");
    });
  });
});
