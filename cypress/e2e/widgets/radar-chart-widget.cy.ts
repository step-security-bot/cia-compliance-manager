import {
  CHART_TEST_IDS,
  SECURITY_LEVELS,
  getTestSelector,
} from "../../support/constants";

describe("Radar Chart Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_CHART)).should("exist");
  });

  it("visualizes security profile across CIA dimensions", () => {
    // Verify radar chart exists
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_CHART)).should("be.visible");

    // Business outcome: Visualize balanced security profile
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check values appear in the chart
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.MODERATE
    );

    // Business outcome: Visualize unbalanced security profile
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE
    );

    // Check values updated in the chart
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.HIGH
    );
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.LOW
    );
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.MODERATE
    );
  });

  it("handles edge cases gracefully", () => {
    // Business outcome: Get accurate visualization even for extreme cases

    // Set all to None
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    // Verify chart still renders properly
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_CHART)).should("be.visible");
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.NONE
    );

    // Set all to maximum
    cy.setSecurityLevels(
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH
    );

    // Verify chart updates properly
    cy.get(getTestSelector(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)).should(
      "contain.text",
      SECURITY_LEVELS.VERY_HIGH
    );
  });
});
