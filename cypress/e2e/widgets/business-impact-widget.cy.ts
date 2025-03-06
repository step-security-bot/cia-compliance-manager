import {
  BUSINESS_IMPACT_TEST_IDS,
  SECURITY_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
  getTestSelector,
} from "../../support/constants";

describe("Business Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.navigateToWidget(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY);
  });

  it("shows business impact of security choices", () => {
    // Verify widget exists
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY)
    ).should("be.visible");

    // Check combined impact widget
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET)
    ).should("be.visible");

    // Business outcome: Understand impact of low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    // Should show critical business risks
    cy.get(
      `[data-testid^="${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}"]`
    ).should("contain.text", SECURITY_LEVELS.NONE);

    // Check for financial impact section
    cy.get(getTestSelector(BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD))
      .should("be.visible")
      .and("contain.text", "loss");
  });

  it("provides detailed impact analysis for different security dimensions", () => {
    // Business outcome: See separate impacts for each dimension

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Check availability impact with high security
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability`
      )
    ).should("contain.text", SECURITY_LEVELS.HIGH);

    // Check integrity impact with moderate security
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-integrity`
      )
    ).should("contain.text", SECURITY_LEVELS.MODERATE);

    // Check confidentiality impact with low security
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-confidentiality`
      )
    ).should("contain.text", SECURITY_LEVELS.LOW);
  });

  it("provides both considerations and benefits for business analysis", () => {
    // Business outcome: Complete business impact analysis

    // Check considerations tab
    cy.get(getTestSelector(BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS))
      .should("be.visible")
      .click();

    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS)
    ).should("be.visible");

    // Check benefits tab
    cy.get(getTestSelector(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS))
      .should("be.visible")
      .click();

    cy.get(getTestSelector(BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS)).should(
      "be.visible"
    );

    // Set high security and check for high-security benefits
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.get(getTestSelector(BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS))
      .should("contain.text", "advanced")
      .and("contain.text", "strong");
  });

  it("shows detailed impact metrics for data-driven decisions", () => {
    // Business outcome: Get quantifiable metrics for business decisions

    // For higher security levels, metrics should be available
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check for metrics section
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION)
    ).should("exist");

    // Check financial metrics
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_METRICS)
    ).should("exist");

    // Check operational metrics
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_METRICS)
    ).should("exist");
  });
});
