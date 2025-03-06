import {
  SUMMARY_TEST_IDS,
  SECURITY_LEVELS,
  getTestSelector,
} from "../../support/constants";

describe("Security Summary Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.navigateToWidget(SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER);
  });

  it("provides overall security posture assessment", () => {
    // Verify widget exists
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER)).should(
      "be.visible"
    );

    // Business outcome: Get overall security assessment
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Should show moderate security level
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_LEVEL_INDICATOR)).should(
      "contain.text",
      SECURITY_LEVELS.MODERATE
    );

    // Should show security description
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_SUMMARY_DESCRIPTION))
      .should("be.visible")
      .and("not.be.empty");
  });

  it("highlights key security metrics for business stakeholders", () => {
    // Set to specific security level to test metrics
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Should show high security indicators
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_LEVEL_INDICATOR)).should(
      "contain.text",
      SECURITY_LEVELS.HIGH
    );

    // Check for ROI information for business context
    cy.get(getTestSelector(SUMMARY_TEST_IDS.ROI_ESTIMATE_SUMMARY))
      .should("exist")
      .and("be.visible");
  });

  it("provides actionable security recommendations", () => {
    // Set varying security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.LOW
    );

    // Check for recommendations section
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_RECOMMENDATION))
      .should("be.visible")
      .and("not.be.empty");

    // Recommendations should contain improvement guidance
    cy.get(getTestSelector(SUMMARY_TEST_IDS.SECURITY_RECOMMENDATION)).should(
      "contain.text",
      "confidentiality"
    );
  });
});
