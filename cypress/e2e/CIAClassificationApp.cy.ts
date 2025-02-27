// Make this a module file to properly scope augmentations
export {};

describe("CIA Classification App (Desktop)", () => {
  beforeEach(() => {
    // Set viewport to desktop only
    cy.viewport(1280, 720);
    cy.visit("/");

    // Handle any uncaught exceptions to prevent test failures
    cy.on("uncaught:exception", () => false);

    // Wait for the app to be fully loaded
    cy.get('[data-testid="app-title"]', { timeout: 5000 }).should("be.visible");
  });

  describe("Core Functionality", () => {
    it("should render all essential widgets and controls", () => {
      // Wait for app to be fully loaded before checking for widgets
      cy.waitForAppStability(5000);
      
      // Check for app title with retry and longer timeout
      cy.get('[data-testid="app-title"]', { timeout: 10000 })
        .should("be.visible")
        .should("contain", "CIA Compliance Manager Dashboard");
      
      // Check for critical widgets with more robust approach
      const criticalWidgets = [
        "widget-security-level-selection",
        "widget-cost-estimation",
        "widget-security-summary"
      ];
      
      // Check each widget individually with proper error handling
      criticalWidgets.forEach(widgetId => {
        cy.get(`[data-testid="${widgetId}"]`, { timeout: 5000 })
          .should("exist");
      });
      
      // Verify security level selectors exist
      cy.get('[data-testid="availability-select"]')
        .should("exist");
    });

    it("should update dashboard based on security level selections", () => {
      // Set all levels to High
      cy.get('[data-testid="availability-select"]').select("High");
      cy.get('[data-testid="integrity-select"]').select("High");
      cy.get('[data-testid="confidentiality-select"]').select("High");

      // Use string assertions to avoid type issues
      cy.get('[data-testid="widget-security-summary"]')
        .invoke("text")
        .should("include", "High Security");

      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$1,000,000");

      cy.get('[data-testid="widget-availability-impact"]')
        .invoke("text")
        .should("include", "99.9% uptime");
    });

    it("should demonstrate compliance status changes with security level changes", () => {
      // First check low compliance
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("None");
      });

      cy.get('[data-testid="widget-compliance-status"]')
        .invoke("text")
        .should("include", "Non-compliant");

      // Then check high compliance
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("Very High");
      });

      cy.get('[data-testid="widget-compliance-status"]')
        .invoke("text")
        .should("include", "Compliant");
    });
  });

  describe("UI Interactions", () => {
    it("should toggle dark mode", () => {
      // Initial state should be light mode
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");

      // Click once for dark mode
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="app-container"]').should("have.class", "dark");
      cy.get('[data-testid="theme-toggle"]')
        .invoke("text")
        .should("include", "Light Mode");

      // Click again for light mode
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");
      cy.get('[data-testid="theme-toggle"]')
        .invoke("text")
        .should("include", "Dark Mode");
    });
  });

  describe("Cost Calculations", () => {
    it("should correctly calculate costs for different security profiles", () => {
      // Start with a clean state and wait for app to be fully stable
      cy.waitForAppStability(5000);
      
      // Set security levels using robust command
      cy.setSecurityLevelsRobust("Low", "Low", "Low");
      
      // Check for costs with capex and opex percentages
      cy.get('[data-testid="capex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '15');
      
      cy.get('[data-testid="opex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '25');
      
      // Check dollar amounts
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$10,000")
        .should("be.visible");
      
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$500")
        .should("be.visible");

      // Now set to high security
      cy.setSecurityLevelsRobust("Very High", "Very High", "Very High");
      
      // Wait for state changes
      cy.wait(800);
      
      // Check high security costs
      cy.get('[data-testid="capex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '75');
      
      cy.get('[data-testid="opex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '120');
      
      // Check high dollar amounts
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$1,000,000")
        .should("be.visible");
      
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$50,000")
        .should("be.visible");
    });
  });

  describe("Security Summary", () => {
    it("should update security summary based on selected levels", () => {
      // Set all to None
      cy.setSecurityLevelsRobust("None", "None", "None");
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "No Security");

      // Set all to Moderate
      cy.setSecurityLevelsRobust("Moderate", "Moderate", "Moderate");
      cy.wait(500); 
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "Moderate Security");

      // Set all to High
      cy.setSecurityLevelsRobust("High", "High", "High");
      cy.wait(500);
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "High Security");
    });
  });

  describe("Resilience", () => {
    it("should handle page reload gracefully", () => {
      // Set security levels
      cy.get('[data-testid="availability-select"]').select("High");

      // Force a page reload
      cy.reload();

      // Verify essential elements are still present and app recovers
      cy.get('[data-testid="app-title"]').should("be.visible");
      cy.get('[data-testid="widget-security-level-selection"]').should(
        "be.visible"
      );
    });
  });
});
// Make this a module file to properly scope augmentations
export {};

// Define types for CIA levels for better type safety
type CIALevel = "None" | "Low" | "Moderate" | "High" | "Very High";
type CIAControl = "confidentiality" | "integrity" | "availability";

// Type assertion to make TypeScript recognize Chai assertions
declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      // Add these Chai assertions
      include: (expected: string) => void;
      visible: () => void;
      length: (expected: number) => void;
      least: (expected: number) => void;
    }
  }
}

describe("CIA Classification App (Desktop)", () => {
  beforeEach(() => {
    // Set viewport to desktop only
    cy.viewport(1280, 720);
    cy.visit("/");

    // Handle any uncaught exceptions to prevent test failures
    cy.on("uncaught:exception", () => false);

    // Wait for the app to be fully loaded
    cy.get('[data-testid="app-title"]', { timeout: 5000 }).should("be.visible");
  });

  describe("Core Functionality", () => {
    it("should render all essential widgets and controls", () => {
      // Wait for app to be fully loaded before checking for widgets
      cy.waitForAppStability(5000);
      
      // Check for app title with retry and longer timeout
      cy.get('[data-testid="app-title"]', { timeout: 10000 })
        .should("be.visible")
        .should("contain", "CIA Compliance Manager Dashboard");
      
      // Check for critical widgets with more robust approach
      const criticalWidgets = [
        "widget-security-level-selection",
        "widget-cost-estimation",
        "widget-security-summary"
      ];
      
      // Check each widget individually with proper error handling
      criticalWidgets.forEach(widgetId => {
        cy.get(`[data-testid="${widgetId}"]`, { timeout: 5000 })
          .should("exist")
          .then($el => {
            if (!$el.is(":visible")) {
              cy.log(`Widget ${widgetId} exists but is not visible`);
            }
          });
      });
      
      // Verify security level selectors exist with better error handling
      cy.get('[data-testid="availability-select"]')
        .should("exist")
        .then($el => {
          if ($el.length === 0) {
            throw new Error("Availability select not found");
          }
          if ($el.is(":disabled")) {
            cy.log("Warning: Availability select is disabled");
          }
        });
    });

    it("should update dashboard based on security level selections", () => {
      // Set all levels to High
      cy.get('[data-testid="availability-select"]').select("High");
      cy.get('[data-testid="integrity-select"]').select("High");
      cy.get('[data-testid="confidentiality-select"]').select("High");

      // Use string assertions to avoid type issues
      cy.get('[data-testid="widget-security-summary"]')
        .invoke("text")
        .should("include", "High Security");

      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$1,000,000");

      cy.get('[data-testid="widget-availability-impact"]')
        .invoke("text")
        .should("include", "99.9% uptime");
    });

    it("should demonstrate compliance status changes with security level changes", () => {
      // First check low compliance
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("None");
      });

      cy.get('[data-testid="widget-compliance-status"]')
        .invoke("text")
        .should("include", "Non-compliant");

      cy.get('[data-testid="widget-compliance-status"]')
        .find(':contains("❌")')
        .should("have.length.at.least", 1);

      // Then check high compliance
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("Very High");
      });

      cy.get('[data-testid="widget-compliance-status"]')
        .invoke("text")
        .should("include", "Compliant");

      cy.get('[data-testid="widget-compliance-status"]')
        .find(':contains("✅")')
        .should("have.length.at.least", 1);
    });
  });

  describe("UI Interactions", () => {
    it("should toggle dark mode", () => {
      // Initial state should be light mode
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");

      // Click once for dark mode
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="app-container"]').should("have.class", "dark");
      cy.get('[data-testid="theme-toggle"]')
        .invoke("text")
        .should("include", "Light Mode");

      // Click again for light mode
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="app-container"]').should("not.have.class", "dark");
      cy.get('[data-testid="theme-toggle"]')
        .invoke("text")
        .should("include", "Dark Mode");
    });
  });

  describe("Cost Calculations", () => {
    it("should correctly calculate costs for different security profiles", () => {
      // Start with a clean state and wait for app to be fully stable
      cy.waitForAppStability(5000);
      
      // Set low security levels with a more robust approach
      cy.setSecurityLevelsRobust("Low", "Low", "Low");
      
      // Wait for the UI to update using the new checkWidgetContent command
      cy.checkWidgetContent("widget-cost-estimation", "$10,000", { timeout: 5000 });
      
      // Use more specific selectors for the percentage elements
      cy.get('[data-testid="capex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '15');
      
      cy.get('[data-testid="opex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '25');
      
      // Verify the cost estimates are displayed correctly
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$10,000")
        .should("be.visible");
      
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$500")
        .should("be.visible");

      // Set high security levels
      cy.setSecurityLevelsRobust("Very High", "Very High", "Very High");
      
      // Wait for state updates to complete using our custom command
      cy.checkWidgetContent("widget-cost-estimation", "$1,000,000", { timeout: 5000 });
      
      // Use a better approach to verify UI changes with retries
      cy.get('[data-testid="capex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '75');
      
      cy.get('[data-testid="opex-percentage"]')
        .should("be.visible")
        .invoke('text')
        .should('include', '120');
      
      // Verify high cost estimates
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$1,000,000")
        .should("be.visible");
      
      cy.get('[data-testid="widget-cost-estimation"]')
        .contains("$50,000")
        .should("be.visible");
    });
  });

  describe("Security Summary", () => {
    it("should update security summary based on selected levels", () => {
      // Set all to None
      cy.setSecurityLevelsRobust("None", "None", "None");
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "No Security");

      // Set all to Moderate
      cy.setSecurityLevelsRobust("Moderate", "Moderate", "Moderate");
      cy.wait(500); // Allow time for state updates
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "Moderate Security");

      // Set all to High
      cy.setSecurityLevelsRobust("High", "High", "High");
      cy.wait(500);
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "High Security");
    });
  });

  describe("Resilience", () => {
    it("should handle page reload gracefully", () => {
      // Set security levels
      cy.get('[data-testid="availability-select"]').select("High");

      // Force a page reload
      cy.reload();

      // Verify essential elements are still present and app recovers
      cy.get('[data-testid="app-title"]').should("be.visible");
      cy.get('[data-testid="widget-security-level-selection"]').should(
        "be.visible"
      );
    });
  });

  describe("Custom Commands Usage", () => {
    it("should use custom commands for more concise tests", () => {
      // Use the custom command to set all levels at once
      cy.setSecurityLevelsRobust("High", "High", "High");

      // Wait for UI updates to propagate
      cy.wait(1000);

      // Use the custom command to verify widget content
      cy.checkWidgetContent("widget-security-summary", "High Security");
      cy.checkWidgetContent("widget-cost-estimation", "$1,000,000");
    });
  });
});
