import {
  WIDGET_TEST_IDS,
  SECURITY_LEVELS,
  getTestSelector,
} from "../../support/constants";

describe("Value Creation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.navigateToWidget(WIDGET_TEST_IDS.VALUE_CREATION_CONTENT);
  });

  it("identifies business value created by security investments", () => {
    // Verify widget is visible
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_CONTENT)).should(
      "be.visible"
    );

    // Business outcome: See value points relevant to security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_POINTS_LIST))
      .should("exist")
      .and("contain.text", "minimal");

    // Verify value points change with security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_POINTS_LIST))
      .should("contain.text", "regulated markets")
      .and("not.contain.text", "minimal");
  });

  it("connects security investments to business outcomes", () => {
    // Set moderate security
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Business outcome: Values related to business diligence
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_CONTENT))
      .should("contain.text", "diligence")
      .and("contain.text", "standard");

    // Verify subtitle indicates appropriate level of value
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_SUBTITLE))
      .should("contain.text", "Moderate")
      .and("contain.text", "Value");
  });

  it("shows ROI connections between security and business value", () => {
    // Business outcome: Connect ROI to security investments
    cy.get(getTestSelector(WIDGET_TEST_IDS.ROI_SECTION)).should("exist");

    // Set high security and check for strong ROI messaging
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Should see higher value indicators
    cy.get(getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_CONTENT))
      .should("contain.text", "regulated")
      .and("contain.text", "Advanced")
      .and("contain.text", "premium");
  });
});
