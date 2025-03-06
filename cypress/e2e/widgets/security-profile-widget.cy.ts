import {
  TEST_IDS,
  CIA_TEST_IDS,
  SECURITY_LEVELS,
  CIA_LABELS,
  getTestSelector,
} from "../../support/constants";

describe("Security Profile Configuration Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("allows business users to configure appropriate security levels", () => {
    // Locate the widget using test ID
    cy.get(getTestSelector(TEST_IDS.SECURITY_LEVEL_CONTROLS))
      .should("be.visible")
      .as("securityWidget");

    // Verify widget has proper title
    cy.get("@securityWidget")
      .find("h3")
      .should("contain.text", "Security Profile");

    // Check that all CIA components are available for configuration
    cy.get(getTestSelector(CIA_TEST_IDS.AVAILABILITY_SELECT)).should("exist");
    cy.get(getTestSelector(CIA_TEST_IDS.INTEGRITY_SELECT)).should("exist");
    cy.get(getTestSelector(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).should(
      "exist"
    );

    // Business outcome: Configure security levels and verify immediate feedback
    cy.get(getTestSelector(CIA_TEST_IDS.AVAILABILITY_SELECT)).select(
      SECURITY_LEVELS.HIGH
    );

    // Verify description updates to match selection
    cy.get(getTestSelector(CIA_TEST_IDS.AVAILABILITY_DESCRIPTION_TEXT))
      .should("not.contain.text", "No guaranteed uptime")
      .and("contain.text", "availability");

    // Verify all levels can be selected
    cy.get(getTestSelector(CIA_TEST_IDS.INTEGRITY_SELECT)).select(
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).select(
      SECURITY_LEVELS.HIGH
    );

    // Verify levels were set correctly - this confirms the business user can configure security profile
    cy.get(getTestSelector(CIA_TEST_IDS.AVAILABILITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
    cy.get(getTestSelector(CIA_TEST_IDS.INTEGRITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
  });

  it("provides business context through descriptions for each security level", () => {
    cy.get(getTestSelector(TEST_IDS.SECURITY_LEVEL_CONTROLS)).should(
      "be.visible"
    );

    // Test each CIA component for business context
    const components = ["availability", "integrity", "confidentiality"];
    const levels = [
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ];

    components.forEach((component) => {
      const selectId =
        component === "availability"
          ? CIA_TEST_IDS.AVAILABILITY_SELECT
          : component === "integrity"
          ? CIA_TEST_IDS.INTEGRITY_SELECT
          : CIA_TEST_IDS.CONFIDENTIALITY_SELECT;

      levels.forEach((level) => {
        // Select the level
        cy.get(getTestSelector(selectId)).select(level);

        // Verify description matches the level and provides business context
        cy.get(`[data-testid="${component}-description-text"]`)
          .should("exist")
          .and("not.be.empty");
      });
    });
  });

  it("reflects business impact when security levels change", () => {
    // Set to None initially
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );

    // Verify this is reflected as high risk in the UI
    cy.contains(/high risk|critical risk|not recommended/i).should("exist");

    // Change to High security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify this is reflected as good security practice in the UI
    cy.contains(/robust|strong|recommended|advanced/i).should("exist");
  });
});
