import {
  FRAMEWORK_TEST_IDS,
  SECURITY_LEVELS,
  COMPLIANCE_STATUS,
  COMPLIANCE_FRAMEWORKS,
  getTestSelector,
} from "../../support/constants";

describe("Compliance Status Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.navigateToWidget(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET);
  });

  it("shows compliance status for regulatory requirements", () => {
    // Verify widget exists
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET)).should(
      "be.visible"
    );

    // With minimal security, should show non-compliant status
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.NON_COMPLIANT
    );

    // Business outcome: See path to compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Should show standard compliance status
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );
  });

  it("indicates which specific frameworks are compliant", () => {
    // Business outcome: Verify specific regulatory compliance

    // Set levels for PCI compliance (needs high confidentiality)
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Verify basic frameworks are compliant
    cy.contains("SOC 2").should("be.visible");
    cy.contains("ISO 27001").should("be.visible");

    // Verify PCI is now compliant
    cy.contains("PCI DSS").should("be.visible");
    cy.get(getTestSelector(`framework-status-pci-dss`)).should(
      "contain.text",
      "✓"
    );

    // NIST should not be compliant yet (needs high for all)
    cy.get(getTestSelector(`framework-status-nist`)).should(
      "contain.text",
      "✗"
    );

    // Set all to high for full compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Now NIST should be compliant
    cy.get(getTestSelector(`framework-status-nist`)).should(
      "contain.text",
      "✓"
    );

    // Full compliance status should be shown
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );
  });

  it("provides business context for compliance requirements", () => {
    // Business outcome: Understand compliance requirements

    // Should list all frameworks
    Object.values(COMPLIANCE_FRAMEWORKS).forEach((framework) => {
      cy.contains(framework).should("be.visible");
    });

    // Should show requirements list
    cy.get(
      getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST)
    ).should("be.visible");

    // Set to moderate level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Should show compliant frameworks list
    cy.get(
      getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST)
    ).should("be.visible");
  });
});
