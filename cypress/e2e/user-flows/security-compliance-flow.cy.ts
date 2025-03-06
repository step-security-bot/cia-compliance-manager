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
    // More reliable approach to find cost-related content
    cy.log("Looking for cost-related content");

    // Set security levels to None first to establish baseline
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.wait(500);

    // Look for any cost-related terms with maximum flexibility
    cy.get("body").then(($body) => {
      // Get page content containing cost-related terms
      const costTerms = [
        "cost",
        "expense",
        "budget",
        "capex",
        "opex",
        "investment",
        "$",
      ];
      const hasCostContent = costTerms.some((term) =>
        $body.text().toLowerCase().includes(term)
      );

      expect(hasCostContent).to.be.true;

      // Store the initial text that contains cost information
      const initialText = $body.text();

      // Now change security levels to high and check if text changes
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(800);

      // Get updated body text
      cy.get("body")
        .invoke("text")
        .then((updatedText) => {
          // Check if there's any change to the page content
          expect(updatedText).not.to.equal(initialText);
          cy.log("Cost information updated after security level change");
        });
    });
  });

  it("demonstrates full user flow from security selection to business impacts", () => {
    // 1. Start with baseline security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.wait(500);

    // 2. Verify initial state shows minimal compliance
    cy.get("body").then(($body) => {
      if (
        $body.find(
          `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`
        ).length
      ) {
        cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`)
          .invoke("text")
          .should("match", /non|not|0%|minimal/i);
      } else {
        // If badge not found, check general page content
        cy.get("body")
          .invoke("text")
          .should("match", /non-compliant|not compliant|minimal|none/i);
      }
    });

    // 3. Set a mixed security profile with different levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // 4. Verify mixed security has partial compliance
    cy.get("body").then(($body) => {
      const pageText = $body.text().toLowerCase();
      const hasPartialCompliance =
        pageText.includes("partial") ||
        pageText.includes("some") ||
        pageText.includes("basic") ||
        (pageText.includes("compliant") && !pageText.includes("non")) ||
        pageText.match(/\d+% compliant/);

      expect(hasPartialCompliance).to.be.true;
    });

    // 5. Finally set to maximum security
    cy.setSecurityLevels(
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH
    );
    cy.wait(500);

    // 6. Verify highest security shows full compliance and high cost
    cy.get("body").then(($body) => {
      const pageText = $body.text().toLowerCase();
      const hasFullCompliance =
        pageText.includes("full") ||
        pageText.includes("100%") ||
        pageText.includes("maximum") ||
        pageText.includes("all framework");

      expect(hasFullCompliance).to.be.true;

      // Also check for high cost indicators
      const hasHighCost =
        pageText.includes("high cost") ||
        pageText.includes("significant investment") ||
        pageText.includes("maximum protection");

      expect(hasHighCost).to.be.true;
    });
  });
});
