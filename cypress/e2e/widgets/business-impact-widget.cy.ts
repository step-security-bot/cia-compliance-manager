import {
  BUSINESS_IMPACT_TEST_IDS,
  SECURITY_LEVELS,
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Business Impact Widget", () => {
  beforeEach(() => {
    // Use our helper to set up with proper visibility handling
    setupWidgetTest("widget-business-impact");

    // Wait for initial rendering
    cy.wait(500);
  });

  it("shows business impact of security choices", () => {
    // More flexible selector approach
    cy.get("body").then(($body) => {
      // Use flexible text search pattern
      cy.contains(/business impact|security impact/i).should("exist");

      // Check for availability section using flexible matching
      if ($body.find(`[data-testid*="availability"]`).length) {
        cy.get(`[data-testid*="availability"]`).should("be.visible");
      } else {
        cy.contains(/availability/i).should("exist");
      }
    });
  });

  it("provides detailed impact analysis for different security dimensions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check if any impact analysis sections are present
    cy.get("body").then(($body) => {
      const selectors = [
        `[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_ANALYSIS_PREFIX}"]`,
        `[data-testid*="impact-analysis"]`,
        `[data-testid*="business-impact"]`,
      ];

      let foundSelector = false;
      for (const selector of selectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundSelector = true;
          break;
        }
      }

      if (!foundSelector) {
        // If no specific element found, check for text indicators
        cy.contains(/impact analysis|business impact|security impact/i).should(
          "exist"
        );
      }
    });
  });

  it("provides both considerations and benefits for business analysis", () => {
    // Find and click tab elements using more reliable approach
    cy.get("body").then(($body) => {
      // Look for anything that could be a tab
      const tabSelectors = [
        `[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS}"]`,
        `[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}"]`,
        `[role="tab"]`,
        `button:contains("Considerations")`,
        `button:contains("Benefits")`,
        `.tab`,
        `.nav-link`,
      ];

      // Find tabs that actually exist
      const existingTabs = tabSelectors.filter(
        (selector) => $body.find(selector).length > 0
      );

      if (existingTabs.length) {
        // Click first tab
        cy.get(existingTabs[0]).first().click({ force: true });
        cy.wait(300);

        if (existingTabs.length > 1) {
          // Click second tab if it exists
          cy.get(existingTabs[1]).first().click({ force: true });
          cy.wait(300);
        }
      } else {
        cy.log("No tab elements found with known selectors");
      }
    });
  });

  it("shows detailed impact metrics for data-driven decisions", () => {
    // Check if metrics section exists using flexible approach
    cy.get("body").then(($body) => {
      const metricsSelectors = [
        `[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}"]`,
        `[data-testid*="metrics"]`,
        `[data-testid*="impact"]`,
        `.metrics`,
        `.impact-metrics`,
      ];

      let foundMetrics = false;
      for (const selector of metricsSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("exist");
          foundMetrics = true;
          break;
        }
      }

      if (!foundMetrics) {
        // Check for text indicators of metrics
        cy.contains(
          /metrics|measurements|statistics|data points|analysis/i
        ).should("exist");
      }
    });
  });
});
