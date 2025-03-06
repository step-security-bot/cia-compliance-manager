import {
  SECURITY_LEVELS,
  CIA_LABELS,
  SELECTORS,
  TEST_COMMANDS,
  getTestSelector,
  TEST_IDS,
} from "../support/constants";

describe("Security Level Selection", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display correct CIA labels", () => {
    // Update to use SELECTORS.WIDGETS.SECURITY_LEVEL instead of SELECTORS.SECURITY_CONTROLS
    cy.get(SELECTORS.WIDGETS.SECURITY_LEVEL).within(() => {
      cy.contains(CIA_LABELS.AVAILABILITY).should("be.visible");
      cy.contains(CIA_LABELS.INTEGRITY).should("be.visible");
      cy.contains(CIA_LABELS.CONFIDENTIALITY).should("be.visible");
    });
  });

  it("can set security levels using application constants", () => {
    // Uses the constants from the application code
    TEST_COMMANDS.setSecurityLevel("availability", "HIGH");
    TEST_COMMANDS.setSecurityLevel("integrity", "MODERATE");
    TEST_COMMANDS.setSecurityLevel("confidentiality", "LOW");

    // Update to use SELECTORS.FORM instead of SELECTORS.FORM_SELECTORS
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
    cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );
    cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });
});
