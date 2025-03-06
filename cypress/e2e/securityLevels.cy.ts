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
    // Use larger viewport for this test
    cy.viewport(3840, 2160);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Make sure security widget is visible before testing
    cy.get(SELECTORS.WIDGETS.SECURITY_LEVEL)
      .should("be.visible")
      .scrollIntoView()
      .wait(500);
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
    // Make sure selectors are visible first
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT))
      .scrollIntoView()
      .should("be.visible");

    // Uses the constants from the application code with force option
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).select(
      SECURITY_LEVELS.HIGH,
      { force: true }
    );

    cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT)).select(
      SECURITY_LEVELS.MODERATE,
      { force: true }
    );

    cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT)).select(
      SECURITY_LEVELS.LOW,
      { force: true }
    );

    // Short wait to ensure UI updates
    cy.wait(500);

    // Verify selections were made correctly
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
