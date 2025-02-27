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
      // Check for app title and main container
      cy.get('[data-testid="app-title"]').should(
        "contain",
        "CIA Compliance Manager Dashboard"
      );

      // Check for critical widgets without screenshot
      [
        "widget-security-level-selection",
        "widget-security-profile-visualization",
        "widget-cost-estimation",
        "widget-security-summary",
        "widget-compliance-status",
      ].forEach((widget) => {
        cy.get(`[data-testid="${widget}"]`).should("be.visible");
      });

      // Verify security level selectors exist and are usable
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`)
          .should("exist")
          .and("not.be.disabled");
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
      // Low security case
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("Low");
      });

      // Use the new data-testid attributes for the percentages
      cy.get('[data-testid="capex-percentage"]').should("contain", "15%");
      cy.get('[data-testid="opex-percentage"]').should("contain", "25%");
      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$10,000");
      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$500");

      // High security case
      ["availability", "integrity", "confidentiality"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`).select("Very High");
      });

      // Wait for UI updates to propagate
      cy.wait(500);

      // Check percentage values using data-testids
      cy.get('[data-testid="capex-percentage"]').should("contain", "75%");
      cy.get('[data-testid="opex-percentage"]').should("contain", "120%");
      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$1,000,000");
      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("include", "$50,000");
    });
  });

  describe("Security Summary", () => {
    it("should update security summary based on selected levels", () => {
      // Set all to None
      cy.setSecurityLevels("None", "None", "None");
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "No Security");

      // Set all to Moderate
      cy.setSecurityLevels("Moderate", "Moderate", "Moderate");
      cy.wait(500); // Allow time for state updates
      cy.get('[data-testid="security-icon"]')
        .parent()
        .should("contain", "Moderate Security");

      // Set all to High
      cy.setSecurityLevels("High", "High", "High");
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
      cy.setSecurityLevels("High", "High", "High");

      // Wait for UI updates to propagate
      cy.wait(1000);

      // Use the custom command to verify widget content
      cy.verifyWidgetWithContent("widget-security-summary", "High Security");
      cy.verifyWidgetWithContent("widget-cost-estimation", "$1,000,000");
    });
  });
});

// Add a custom command to make security level setting more reliable
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    cy.get('[data-testid="availability-select"]').select(availability);
    cy.get('[data-testid="integrity-select"]').select(integrity);
    cy.get('[data-testid="confidentiality-select"]').select(confidentiality);
    // Add a small delay to ensure state updates
    cy.wait(300);
  }
);

// Add a custom command to check widget content with better error messages
Cypress.Commands.add(
  "verifyWidgetWithContent",
  (widgetTestId: string, expectedContent: string) => {
    cy.get(`[data-testid="${widgetTestId}"]`)
      .invoke("text")
      .should("include", expectedContent)
      .then(($text) => {
        if (!$text.includes(expectedContent)) {
          Cypress.log({
            name: "CONTENT MISMATCH",
            message: `Expected widget to contain "${expectedContent}", found: "${$text}"`,
          });
        }
      });
  }
);
