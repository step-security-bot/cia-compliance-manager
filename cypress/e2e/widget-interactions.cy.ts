import {
  SECURITY_LEVELS,
  COST_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  COMPLIANCE_STATUS,
  getTestSelector,
} from "../support/constants";

describe("Widget Interactions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("updates all widgets when security levels change", () => {
    // Business outcome: See how changing security levels impacts all aspects of the business

    // Store initial cost values
    cy.get(getTestSelector(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE))
      .invoke("text")
      .as("initialCapex");

    // Set higher security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify cost estimation updated (costs should increase)
    cy.get("@initialCapex").then((initialCapex) => {
      cy.get(getTestSelector(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE))
        .invoke("text")
        .should((currentCapex) => {
          const initialValue = parseFloat(
            initialCapex.toString().replace(/[$,]/g, "")
          );
          const currentValue = parseFloat(
            currentCapex.toString().replace(/[$,]/g, "")
          );
          expect(currentValue).to.be.gt(initialValue);
        });
    });

    // Verify business impact updated
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability`
      )
    ).should("contain.text", SECURITY_LEVELS.HIGH);

    // Verify compliance status updated
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );
  });

  it("shows consistent information across related widgets", () => {
    // Business outcome: Ensure decision makers see consistent information

    // Set specific security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Get security level from impact widget
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability`
      )
    )
      .invoke("text")
      .should("contain", SECURITY_LEVELS.MODERATE);

    // Should show the same level in compliance widget
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );

    // Change just one level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify specific widget updated correctly
    cy.get(
      getTestSelector(
        `${BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_TEXT_PREFIX}-availability`
      )
    )
      .invoke("text")
      .should("contain", SECURITY_LEVELS.HIGH);
  });

  it("provides a complete business decision-making flow", () => {
    // Business outcome: Support the full decision-making process

    // Step 1: Start with reviewing security options
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Step 2: Review business impact
    cy.navigateToWidget(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY);
    cy.get(
      getTestSelector(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY)
    ).should("be.visible");

    // Step 3: Check compliance gaps
    cy.navigateToWidget(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET);
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "not.contain.text",
      COMPLIANCE_STATUS.FULL_COMPLIANCE
    );

    // Step 4: Check costs for a better option
    cy.navigateToWidget(COST_TEST_IDS.COST_CONTAINER);
    cy.get(getTestSelector(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE)).should(
      "be.visible"
    );

    // Step 5: Make a better security choice
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Step 6: Verify improved compliance status
    cy.navigateToWidget(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET);
    cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
      "contain.text",
      COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    );
  });
});
