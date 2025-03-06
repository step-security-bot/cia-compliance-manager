/**
 * Integration tests for widget interactions
 *
 * This test suite verifies that all widgets work together correctly
 * and data is synchronized between components.
 */
import {
  SECURITY_LEVELS,
  COMPLIANCE_STATUS,
} from "../support/appConstantsHelper";
import {
  BUSINESS_IMPACT_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../src/constants/testIds";

describe("Widget Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("updates all widgets when security levels change", () => {
    // First check initial state
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`).should(
      "contain",
      COMPLIANCE_STATUS.NON_COMPLIANT
    );

    // Set all levels to High
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify compliance status updated
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`).should(
      "contain",
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );

    // Verify compliance percentage updated
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`).should(
      "contain",
      "100% Compliant"
    );

    // Verify business impact widgets updated
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability"]`).should(
      "contain",
      SECURITY_LEVELS.HIGH
    );
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-integrity"]`).should(
      "contain",
      SECURITY_LEVELS.HIGH
    );
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-confidentiality"]`).should(
      "contain",
      SECURITY_LEVELS.HIGH
    );

    // Verify cost estimation updated (exact values depend on implementation)
    cy.get(`[data-testid="${COST_TEST_IDS.COST_ESTIMATION_CONTENT}"]`).should("be.visible");
    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_PROGRESS_BAR}"]`).should("be.visible");
    cy.get(`[data-testid="${COST_TEST_IDS.OPEX_PROGRESS_BAR}"]`).should("be.visible");

    // Set all levels back to None to test the other direction
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    // Verify compliance status updated back
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`).should(
      "contain",
      COMPLIANCE_STATUS.NON_COMPLIANT
    );
  });

  it("displays consistent metrics across related widgets", () => {
    // Set levels to get predictable metrics
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check compliance status
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`).should(
      "contain",
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );

    // Expand the metrics section in the security summary
    cy.contains("Key Metrics").click();
    cy.get(`[data-testid="${WIDGET_TEST_IDS.DATA_CONTAINER}"]`).should("be.visible");

    // Get uptime value from security summary
    let uptimeText = "";
    cy.get(`[data-testid="${WIDGET_TEST_IDS.DATA_CONTAINER}"]`).then(($metrics) => {
      // This might need adjusting based on your DOM structure
      uptimeText = $metrics.find(':contains("Uptime")').next().text();

      // Find the availability impact widget and verify matching uptime
      cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability"]`).should(
        ($impact) => {
          // Fix 1: Use `expect().to` pattern with .include() converted to Cypress .contains()
          cy.wrap($impact.text()).should("include", uptimeText);
        }
      );
    });
  });

  it("shows detailed business impact metrics when available", () => {
    // Set to None level which should have detailed metrics in test data
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    // Check for impact metrics sections
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}"]`).should("exist");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD}"]`).should("exist");
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_CARD}"]`).should("exist");

    // Set to High level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check metrics changed - using "contain" instead of checking specific values
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD}"]`).should(($el) => {
      // Fix 2: Replace expect().to.contain with cy.wrap().should('not.contain')
      cy.wrap($el.text()).should("not.contain", "Complete revenue loss");
    });
  });

  it("shows correct compliance frameworks based on security levels", () => {
    // Set to Moderate with HIGH confidentiality to test mixed frameworks
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Basic frameworks should be compliant
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-soc2"]`).should("contain", "✓");
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-iso27001"]`).should("contain", "✓");

    // PCI and HIPAA should be compliant with HIGH confidentiality
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-pci-dss"]`).should("contain", "✓");
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-hipaa"]`).should("contain", "✓");

    // NIST should not be compliant yet
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-nist"]`).should("contain", "✗");

    // Set all to HIGH to get full compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Now NIST should be compliant too
    cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.FRAMEWORK_STATUS}-nist"]`).should("contain", "✓");
  });

  it("synchronizes tab interactions across widgets", () => {
    // Click the first benefits tab
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}"]`).first().click();

    // Verify benefits view is shown
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS}"]`).first().should("be.visible");

    // Click back to considerations
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS}"]`).first().click();

    // Verify considerations view is shown
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS}"]`)
      .first()
      .should("be.visible");

    // Check security level selections refresh all widgets
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Tabs should retain their state after security level changes
    cy.get(`[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS}"]`)
      .first()
      .should("be.visible");
  });

  it("tracks costs appropriately across security levels", () => {
    // Track initial costs
    let initialCapex = "";
    let initialOpex = "";

    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_PERCENTAGE}"]`).then(
      ($el) => (initialCapex = $el.text())
    );
    cy.get(`[data-testid="${COST_TEST_IDS.OPEX_PERCENTAGE}"]`).then(
      ($el) => (initialOpex = $el.text())
    );

    // Change to higher security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH
    );

    // Verify costs increased
    cy.get(`[data-testid="${COST_TEST_IDS.CAPEX_PERCENTAGE}"]`).then(($el) => {
      const newValue = parseFloat($el.text());
      const initialValue = parseFloat(initialCapex);
      // Use cy.wrap to properly handle assertions in Cypress
      cy.wrap(newValue).should("be.gt", initialValue);
    });

    cy.get(`[data-testid="${COST_TEST_IDS.OPEX_PERCENTAGE}"]`).then(($el) => {
      const newValue = parseFloat($el.text());
      const initialValue = parseFloat(initialOpex);
      // Use cy.wrap to properly handle assertions in Cypress
      cy.wrap(newValue).should("be.gt", initialValue);
    });
  });
});
