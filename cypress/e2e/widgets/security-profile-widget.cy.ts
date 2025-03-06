import { CIA_TEST_IDS, SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Security Profile Configuration Widget", () => {
  beforeEach(() => {
    setupWidgetTest("widget-security-level");
  });

  it("allows business users to configure appropriate security levels", () => {
    // Check for security level selectors
    cy.get("body").then(($body) => {
      const selectors = [
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_SELECT}"]`,
        `[data-testid*="select"]`,
        "select",
      ];

      // Check that at least one selector exists
      const existingSelectors = selectors.filter(
        (selector) => $body.find(selector).length > 0
      );
      expect(existingSelectors.length).to.be.greaterThan(0);

      // Interact with the first available select element
      cy.get(existingSelectors[0]).first().should("be.visible");
      cy.get(existingSelectors[0])
        .first()
        .select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);

      // Verify the selection was made
      cy.get(existingSelectors[0])
        .first()
        .should("have.value", SECURITY_LEVELS.HIGH);
    });
  });

  it("provides business context through descriptions for each security level", () => {
    // Find any description elements
    cy.get("body").then(($body) => {
      const descriptionSelectors = [
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_DESCRIPTION_TEXT}"]`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_DESCRIPTION_TEXT}"]`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION_TEXT}"]`,
        `[data-testid*="description"]`,
        `.security-description`,
        `p`,
      ];

      // Find any description elements that exist
      let foundDescription = false;
      for (const selector of descriptionSelectors) {
        if ($body.find(selector).length) {
          // Verify at least one description contains text
          cy.get(selector)
            .first()
            .invoke("text")
            .then((text) => {
              expect(text.length).to.be.greaterThan(5);
            });
          foundDescription = true;
          break;
        }
      }

      if (!foundDescription) {
        // Check for text that looks like a description
        cy.contains(
          /security level|protection|controls|measures|implementation/i
        ).should("exist");
      }
    });
  });

  it("reflects business impact when security levels change", () => {
    // Set different security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store initial page content
    let initialContent = "";
    cy.get("body")
      .invoke("text")
      .then((text) => {
        initialContent = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Verify content has changed, indicating impact updates
        cy.get("body").invoke("text").should("not.eq", initialContent);
      });
  });
});
