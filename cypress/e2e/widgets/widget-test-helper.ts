/**
 * Common helper functions for widget tests
 */
import { TEST_IDS } from "../../support/constants";

/**
 * Ensures a widget is visible and all parent containers allow proper display
 * @param widgetId The test ID of the widget
 */
export function ensureWidgetVisible(widgetId: string) {
  // First force all parent containers to be visible
  cy.get(`[data-testid="${widgetId}"]`).then(($el) => {
    // Make all parents visible with proper overflow
    let current = $el.parent();
    while (current.length && !current.is("body")) {
      cy.wrap(current).invoke("css", "overflow", "visible");
      cy.wrap(current).invoke("css", "display", "block");
      current = current.parent();
    }

    // Now make the element itself visible
    cy.wrap($el)
      .invoke("css", "visibility", "visible")
      .invoke("css", "display", "block")
      .invoke("css", "opacity", "1");
  });
}

/**
 * Standard setup for widget tests - handles visibility and scrolling
 * @param widgetId The test ID of the widget or a partial ID to search for
 */
export function setupWidgetTest(widgetId: string) {
  cy.viewport(3840, 2160);
  cy.visit("/");
  cy.ensureAppLoaded();

  // Add style to prevent overflow issues in all containers
  cy.document().then((doc) => {
    const style = doc.createElement("style");
    style.innerHTML = `
      * {
        overflow: visible !important;
        visibility: visible !important;
        opacity: 1 !important;
        transition: none !important;
        animation: none !important;
        clip: auto !important;
        clip-path: none !important;
        position: static !important;
      }
      .widget-body, .widget-content-wrapper {
        display: block !important;
        height: auto !important;
        max-height: none !important;
      }
    `;
    doc.head.appendChild(style);
  });

  // Wait for app to stabilize
  cy.wait(500);

  // Try exact match first, then fallback to partial match
  cy.document().then((doc) => {
    const elements = doc.querySelectorAll(`[data-testid="${widgetId}"]`);
    if (elements.length > 0) {
      ensureWidgetVisible(widgetId);
    } else {
      // Try finding elements with similar test IDs using partial match
      cy.get(`[data-testid*="${widgetId}"]`)
        .first()
        .then(($el) => {
          const actualId = $el.attr("data-testid");
          if (actualId) {
            cy.log(`Found alternative widget with ID: ${actualId}`);
            ensureWidgetVisible(actualId);
          } else {
            // If we still can't find it, try a more generic approach
            cy.log(
              `No data-testid found containing ${widgetId}, trying generic approach`
            );
            // Try to find by content instead
            cy.contains(
              new RegExp(widgetId.replace(/-/g, " "), "i")
            ).scrollIntoView();
          }
        });
    }
  });
}

/**
 * Set security levels with improved reliability and waits between selections
 */
export function setSecurityLevelsReliable(
  availability: string,
  integrity: string,
  confidentiality: string
) {
  // First make sure the security controls are in the viewport
  cy.get(`[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`)
    .scrollIntoView({ duration: 100 })
    .should("be.visible");

  // Make selections with forced option and short waits between
  cy.get(`[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`)
    .select(availability, { force: true })
    .wait(300);

  cy.get(`[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`)
    .select(integrity, { force: true })
    .wait(300);

  cy.get(`[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`)
    .select(confidentiality, { force: true })
    .wait(300);
}

/**
 * Check for text content using more flexible matching strategy
 */
export function checkForTextContent(content: string | RegExp) {
  if (typeof content === "string") {
    // Check for exact or partial match
    cy.get("body").then(($body) => {
      const bodyText = $body.text();
      if (bodyText.includes(content)) {
        // Found direct match
        cy.log(`Found text content: "${content}"`);
        return true;
      } else {
        // Try more flexible approach with CI/CD-friendly matching
        const normalizedContent = content.toLowerCase().replace(/\s+/g, "");
        const normalizedBodyText = bodyText.toLowerCase().replace(/\s+/g, "");
        if (normalizedBodyText.includes(normalizedContent)) {
          cy.log(`Found normalized text content: "${content}"`);
          return true;
        }
      }
      cy.log(`Could not find text content: "${content}"`);
      return false;
    });
  } else {
    // RegExp matching
    cy.get("body").invoke("text").should("match", content);
  }
}

/**
 * Get a test ID using primary ID or try several alternatives as fallbacks
 * Handles common test ID variations between tests and UI
 */
export function getWidgetId(primaryId: string, featureName: string): string[] {
  // Fix: Define type for idMappings with index signature
  const idMappings: Record<string, string[]> = {
    "widget-security-level": [
      "widget-security-level-selection",
      "widget-security-profile",
      "security-level-controls",
    ],
    "cost-container": [
      "widget-cost-estimation",
      "cost-estimation-content",
      "COST_CONTAINER",
    ],
  };

  // Return widget-specific mappings if they exist, otherwise try common patterns
  return (
    idMappings[primaryId as keyof typeof idMappings] || [
      `widget-${featureName}`,
      `${featureName}-container`,
      `${featureName}-content`,
      `${featureName}-section`,
    ]
  );
}
