import { WIDGET_TEST_IDS, SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Value Creation Widget", () => {
  beforeEach(() => {
    setupWidgetTest("widget-value-creation");
  });

  it("identifies business value created by security investments", () => {
    // Check for the value creation content
    cy.get("body").then(($body) => {
      const valueSelectors = [
        `[data-testid="${WIDGET_TEST_IDS.VALUE_CREATION_CONTENT}"]`,
        `[data-testid="${WIDGET_TEST_IDS.VALUE_CREATION_TITLE}"]`,
        `[data-testid="${WIDGET_TEST_IDS.VALUE_CREATION_SUBTITLE}"]`,
        `[data-testid*="value"]`,
        `[data-testid*="creation"]`,
      ];

      let foundValueElement = false;
      for (const selector of valueSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundValueElement = true;
          break;
        }
      }

      if (!foundValueElement) {
        // Check for value-related text
        cy.contains(/value|benefit|advantage|improvement|creation/i).should(
          "exist"
        );
      }

      // Check for security level indicator
      cy.contains(
        new RegExp(
          `(${SECURITY_LEVELS.NONE}|${SECURITY_LEVELS.LOW}|${SECURITY_LEVELS.MODERATE}|${SECURITY_LEVELS.HIGH}|${SECURITY_LEVELS.VERY_HIGH})`,
          "i"
        )
      ).should("exist");
    });
  });

  it("connects security investments to business outcomes", () => {
    // Change security level to see different business values
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(500);

    // Check for business outcome-related text
    cy.get("body").then(($body) => {
      // Look for business outcome indicators
      const businessTerms = [
        "business",
        "value",
        "outcome",
        "benefit",
        "roi",
        "return",
        "revenue",
        "efficiency",
      ];

      let foundBusinessTerm = false;
      for (const term of businessTerms) {
        if ($body.text().toLowerCase().includes(term)) {
          foundBusinessTerm = true;
          break;
        }
      }

      expect(foundBusinessTerm).to.be.true;
    });
  });

  it("shows ROI connections between security and business value", () => {
    // Set high security levels to get maximum value
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(500);

    // Check for ROI or value metrics
    cy.get("body").then(($body) => {
      const roiSelectors = [
        `[data-testid="${WIDGET_TEST_IDS.ROI_SECTION}"]`,
        `[data-testid="${WIDGET_TEST_IDS.ROI_VALUE}"]`,
        `[data-testid*="roi"]`,
        `[data-testid*="return"]`,
        `[data-testid*="value"]`,
      ];

      let foundRoiElement = false;
      for (const selector of roiSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundRoiElement = true;
          break;
        }
      }

      if (!foundRoiElement) {
        // Check for ROI-related text
        cy.contains(
          /roi|return|investment|value|benefit|percentage|cost reduction/i
        ).should("exist");
      }

      // Check for percentage or numeric indicators
      cy.contains(/\d+[\.,]?\d*\s*%|[1-9][\.,]?\d*x/i).should("exist");
    });
  });
});
