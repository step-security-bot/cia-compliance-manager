import {
  COST_TEST_IDS,
  SECURITY_LEVELS,
  getTestSelector,
} from "../../support/constants";

describe("Cost Estimation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    // Navigate to the widget
    cy.navigateToWidget(COST_TEST_IDS.COST_CONTAINER);
  });

  it("provides accurate financial impact analysis of security choices", () => {
    // Initial verification of cost widget structure
    cy.get(getTestSelector(COST_TEST_IDS.COST_ESTIMATION_CONTENT)).should(
      "be.visible"
    );

    // Verify CAPEX and OPEX sections exist
    cy.get(getTestSelector(COST_TEST_IDS.CAPEX_SECTION)).should("exist");
    cy.get(getTestSelector(COST_TEST_IDS.OPEX_SECTION)).should("exist");

    // Record baseline costs with no security
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.get(getTestSelector(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE))
      .invoke("text")
      .as("initialCapex");
    cy.get(getTestSelector(COST_TEST_IDS.OPEX_ESTIMATE_VALUE))
      .invoke("text")
      .as("initialOpex");

    // Business outcome: See financial impact of higher security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify costs increased (financial impact)
    cy.get("@initialCapex").then((initialCapex) => {
      cy.get(getTestSelector(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE))
        .invoke("text")
        .should((updatedCapex) => {
          // Extract numeric values (remove currency symbols, commas)
          const initialValue = parseFloat(
            initialCapex.toString().replace(/[$,]/g, "")
          );
          const updatedValue = parseFloat(
            updatedCapex.toString().replace(/[$,]/g, "")
          );
          expect(updatedValue).to.be.gt(initialValue);
        });
    });

    cy.get("@initialOpex").then((initialOpex) => {
      cy.get(getTestSelector(COST_TEST_IDS.OPEX_ESTIMATE_VALUE))
        .invoke("text")
        .should((updatedOpex) => {
          const initialValue = parseFloat(
            initialOpex.toString().replace(/[$,]/g, "")
          );
          const updatedValue = parseFloat(
            updatedOpex.toString().replace(/[$,]/g, "")
          );
          expect(updatedValue).to.be.gt(initialValue);
        });
    });
  });

  it("provides ROI analysis to justify security investments", () => {
    // Verify ROI section exists
    cy.get(getTestSelector(COST_TEST_IDS.ROI_SECTION)).should("be.visible");

    // Set moderate security and check ROI
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(COST_TEST_IDS.ROI_ESTIMATE))
      .should("be.visible")
      .invoke("text")
      .as("moderateRoi");

    // Set high security and check ROI
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Business outcome: Understand ROI difference between security levels
    cy.get("@moderateRoi").then((moderateRoi) => {
      cy.get(getTestSelector(COST_TEST_IDS.ROI_ESTIMATE))
        .invoke("text")
        .should((highRoi) => {
          // Here we're just checking that the ROI values are different
          // In a real test, you might validate specific business logic about how ROI should change
          expect(moderateRoi).not.to.eq(highRoi);
        });
    });
  });

  it("connects costs to business value with analysis", () => {
    // Business outcome: See explanation of cost implications
    cy.get(getTestSelector(COST_TEST_IDS.COST_ANALYSIS_SECTION)).should(
      "exist"
    );

    // Set low security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Check for cost analysis text
    cy.get(getTestSelector(COST_TEST_IDS.COST_ANALYSIS_TEXT))
      .should("exist")
      .and("not.be.empty");
  });
});
