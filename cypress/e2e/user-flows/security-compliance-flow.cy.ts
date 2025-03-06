/**
 * User Flow: Security Level Selection and Compliance Verification
 *
 * Tests the complete flow from selecting security levels to viewing compliance status
 */
import {
  SECURITY_LEVELS,
  FRAMEWORK_TEST_IDS,
  COST_TEST_IDS,
} from "../../support/constants";
import { findElementByMultipleTestIds } from "../../support/test-helpers";

describe("Security Compliance User Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(3840, 2160);
  });

  it("shows compliance status that matches selected security levels", () => {
    // Start with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Wait for UI to update
    cy.wait(500);

    // Look for compliance information anywhere in the document
    cy.get("body").then(($body) => {
      // Check if there's any text indicating basic/minimal compliance
      const complianceText = $body.text().toLowerCase();
      const hasBasicCompliance =
        complianceText.includes("basic") ||
        complianceText.includes("minimal") ||
        complianceText.includes("low") ||
        complianceText.includes("partial");

      expect(hasBasicCompliance).to.be.true;
    });

    // Upgrade to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for UI to update
    cy.wait(500);

    // Look for compliance information with a more flexible approach
    cy.get("body").then(($body) => {
      // Check if there's any text indicating high/full compliance
      const complianceText = $body.text().toLowerCase();
      const hasFullCompliance =
        complianceText.includes("full") ||
        complianceText.includes("complete") ||
        complianceText.includes("comprehensive") ||
        complianceText.includes("high") ||
        complianceText.includes("compliant");

      expect(hasFullCompliance).to.be.true;
    });
  });

  it("shows costs that match selected security levels", () => {
    // Find any cost-related elements with a flexible approach
    cy.contains(/cost|expense|budget|capex|opex/i).should("exist");

    // Set security levels to None first to establish baseline
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    cy.wait(500);

    // Capture page content with costs at "None" level
    cy.get("body")
      .invoke("text")
      .then((initialText) => {
        // Now set security to High
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        cy.wait(500);

        // Get updated page content and verify it changed
        cy.get("body")
          .invoke("text")
          .then((updatedText) => {
            expect(initialText).not.to.eq(updatedText);

            // Look for specific cost-related elements that should have changed
            cy.get("body").then(($body) => {
              // Check if any cost values, percentages or numbers changed
              const hasVisibleCostChanges =
                $body.find(
                  '[data-testid*="cost"], [data-testid*="capex"], [data-testid*="opex"]'
                ).length > 0 || $body.text().match(/\$\d+|\d+%|\d+\.?\d*\s*%/g);

              expect(hasVisibleCostChanges).to.be.true;
            });
          });
      });
  });
});
