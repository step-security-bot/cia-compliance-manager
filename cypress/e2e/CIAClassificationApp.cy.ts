// Define types for CIA levels for better type safety
type CIALevel = "None" | "Low" | "Moderate" | "High" | "Very High";
type CIAControl = "confidentiality" | "integrity" | "availability";

// Fix failing tests by using direct UI interaction instead of custom events

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
          .and("contain", "CIA Compliance Manager Dashboard");
        cy.get('[data-testid="dashboard-grid"]').should("exist");

        // Take a screenshot for visual comparison
        cy.screenshot(`app-loaded-${device.name}`);
      });
    });
  });

  describe("Dashboard Widgets", () => {
    it("should render all widgets correctly", () => {
      // Check for all the essential widgets
      cy.get('[data-testid="widget-security-level-selection"]').should("be.visible");
      cy.get('[data-testid="widget-security-profile-visualization"]').should("be.visible");
      cy.get('[data-testid="widget-cost-estimation"]').should("be.visible");
      cy.get('[data-testid="widget-security-summary"]').should("be.visible");
      cy.get('[data-testid="widget-compliance-status"]').should("be.visible");
      cy.get('[data-testid="widget-business-impact-analysis"]').should("be.visible");

      cy.screenshot("all-widgets-rendered");
    });
  });

  describe("Security Level Selection", () => {
    it("should set CIA levels through UI interaction", () => {
      // Find the widget first, then the select elements within it
      cy.get('[data-testid="widget-security-level-selection"]').within(() => {
        cy.get('[data-testid="availability-select"]').select("Low", { force: true });
        cy.get('[data-testid="integrity-select"]').select("Moderate", { force: true });
        cy.get('[data-testid="confidentiality-select"]').select("High", { force: true });
      });

      // Verify the values were set correctly
      cy.get('[data-testid="availability-select"]').should("have.value", "Low");
      cy.get('[data-testid="integrity-select"]').should("have.value", "Moderate");
      cy.get('[data-testid="confidentiality-select"]').should("have.value", "High");

      // Take screenshot
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
        // Set values using direct UI interaction
        cy.get('[data-testid="availability-select"]').select(scenario.levels.availability);
        cy.get('[data-testid="integrity-select"]').select(scenario.levels.integrity);
        cy.get('[data-testid="confidentiality-select"]').select(scenario.levels.confidentiality);

        // Wait for updates to be applied
        cy.wait(500);

        // Find the cost estimation widget and verify costs within it
        cy.get('[data-testid="widget-cost-estimation"]').within(() => {
          cy.contains(scenario.expectedCapex).should("be.visible");
          cy.contains(scenario.expectedOpex).should("be.visible");
        });

        // Take a screenshot of this scenario
        cy.screenshot(`cost-scenario-${scenario.name.toLowerCase().replace(/\s+/g, "-")}`);
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
      cy.get('[data-testid="theme-toggle"]').should("contain.text", "Light Mode");
      cy.get('[data-testid="app-container"]').should("have.class", "dark");
      cy.screenshot("dark-mode");

      // Second toggle
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="theme-toggle"]').should("contain.text", "Dark Mode");
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");
      cy.screenshot("light-mode");
    });
  });

  describe("Impact Analysis Widgets", () => {
    it("should display impact analysis with proper content", () => {
      // Set values using direct UI interaction
      cy.get('[data-testid="availability-select"]').select("High");
      cy.get('[data-testid="integrity-select"]').select("High");
      cy.get('[data-testid="confidentiality-select"]').select("High");

      cy.wait(500);

      // Check that each impact widget contains appropriate content for "High" level
      cy.get('[data-testid="widget-availability-impact"]').within(() => {
        cy.contains("Near-continuous service").should("be.visible");
        cy.contains("99.9% uptime").should("be.visible");
      });

      cy.get('[data-testid="widget-integrity-impact"]').within(() => {
        cy.contains("Immutable records").should("be.visible");
      });

      cy.get('[data-testid="widget-confidentiality-impact"]').within(() => {
        cy.contains("Robust protection").should("be.visible");
      });

      cy.screenshot("high-level-impact-analysis");
    });
  });

  describe("Security Summary Widget", () => {
    it("should update security summary based on selections", () => {
      // Set all levels to Moderate
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("Moderate");
      });

      cy.wait(500);

      // Check the security summary widget shows Moderate summary
      cy.get('[data-testid="widget-security-summary"]').within(() => {
        cy.contains("Moderate Security").should("be.visible");
        cy.contains("Balanced approach").should("be.visible");
        cy.contains("⚠️").should("be.visible"); // Moderate warning icon
      });

      // Take screenshot
      cy.screenshot("moderate-security-summary");
    });
  });

  describe("Business Impact Analysis Widget", () => {
    it("should display business impact information", () => {
      cy.get('[data-testid="widget-business-impact-analysis"]').within(() => {
        // Check for the main sections
        cy.contains("Key Benefits").should("be.visible");
        cy.contains("Business Considerations").should("be.visible");
        
        // Check for specific content items
        cy.contains("Clear visibility into security level requirements").should("be.visible");
        cy.contains("Potential revenue impact from downtime").should("be.visible");
      });
      
      // Take screenshot
      cy.screenshot("business-impact-analysis");
    });
  });

  describe("Technical Implementation Widget", () => {
    it("should display technical details based on selected security levels", () => {
      // Set availability to High
      cy.get('[data-testid="availability-select"]').select("High");
      
      cy.wait(500);
      
      // Check technical implementation widget for High availability details
      cy.get('[data-testid="widget-technical-implementation"]').within(() => {
        cy.contains("Availability: High").should("be.visible");
        cy.contains("High availability").should("be.visible");
      });
      
      // Take screenshot
      cy.screenshot("technical-implementation-details");
    });
  });

  describe("Accessibility Testing", () => {
    it("should have accessible form controls in widgets", () => {
      // Find the security level selection widget and check accessibility
      cy.get('[data-testid="widget-security-level-selection"]').within(() => {
        ["availability", "integrity", "confidentiality"].forEach((control) => {
          // Check that the select element exists and has appropriate attributes
          cy.get(`[data-testid="${control}-select"]`)
            .should("be.visible")
            .and("have.attr", "aria-label");
          
          // Check for labels
          cy.get(`label[for="${control}"]`).should("exist");
        });
      });
      
      // Take screenshot for accessibility verification
      cy.screenshot("accessible-widget-controls");
    });
  });
});
