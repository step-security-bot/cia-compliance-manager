/**
 * Common test patterns to reduce duplication
 */

/**
 * Standard widget test pattern that verifies a widget exists and updates with security levels
 */
export function testWidgetUpdatesWithSecurityLevels(
  widgetSelector: string,
  contentSelector: string
) {
  // Check widget exists
  cy.get(widgetSelector).should("exist");

  // Get initial content
  cy.get(contentSelector)
    .invoke("text")
    .then((initialText) => {
      // Change security levels
      cy.setSecurityLevels("High", "High", "High");
      cy.wait(500); // Give UI time to update

      // Verify content has changed
      cy.get(contentSelector).invoke("text").should("not.equal", initialText);

      // Change back to verify it's responsive
      cy.setSecurityLevels("Low", "Low", "Low");
      cy.wait(500);

      // Verify content has changed again
      cy.get(contentSelector).invoke("text").should("not.equal", initialText);
    });
}

/**
 * Standard tabbed interface test pattern
 */
export function testTabbedInterface(tabListSelector: string, tabIds: string[]) {
  // Check tab list exists
  cy.get(tabListSelector).should("exist");

  // Test clicking each tab
  tabIds.forEach((tabId, index) => {
    cy.get(`[data-testid="${tabId}"]`).click();
    cy.wait(200);

    // Verify tab panel is visible
    const panelId = tabId.replace("tab-", "panel-");
    cy.get(`[aria-labelledby="${tabId}"]`).should("be.visible");

    // If not the last tab, verify we can navigate to the next one
    if (index < tabIds.length - 1) {
      cy.get(`[data-testid="${tabIds[index + 1]}"]`).should("exist");
    }
  });
}

/**
 * Standard test for checking cost updates when security levels change
 */
export function testCostUpdatesWithSecurityLevels(
  costElementSelector: string,
  securityLevels: {
    low: [string, string, string];
    high: [string, string, string];
  }
) {
  // Start with low security
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Get initial costs
  cy.get(costElementSelector)
    .invoke("text")
    .then((lowLevelCost) => {
      // Set to high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(300);

      // Costs should change (usually increase)
      cy.get(costElementSelector)
        .invoke("text")
        .should("not.equal", lowLevelCost);
    });
}

/**
 * Helper to verify compliance status updates based on security levels
 */
export function testComplianceStatus(
  complianceElementSelector: string,
  securityLevels: {
    low: [string, string, string];
    high: [string, string, string];
  }
) {
  // Test with low security first
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Capture initial compliance status
  cy.get(complianceElementSelector)
    .invoke("text")
    .then((lowLevelStatus) => {
      // Now test with high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(300);

      // Verify compliance status has changed
      cy.get(complianceElementSelector)
        .invoke("text")
        .should("not.equal", lowLevelStatus);
    });
}

/**
 * Test a widget's responsiveness to security level changes
 */
export function testSecurityLevelFeedback(
  securityControlSelector: string,
  feedbackSelector: string
) {
  // Set initial level
  cy.get(securityControlSelector).select("None");
  cy.wait(200);

  // Get feedback text
  cy.get(feedbackSelector)
    .invoke("text")
    .then((initialText) => {
      // Change security level
      cy.get(securityControlSelector).select("High");
      cy.wait(200);

      // Verify feedback changed
      cy.get(feedbackSelector).invoke("text").should("not.equal", initialText);
    });
}
