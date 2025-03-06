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
  return () => {
    // Check widget exists
    cy.get(widgetSelector).should("exist");

    // Get initial content
    let initialText = "";
    cy.get(contentSelector)
      .invoke("text")
      .then((text) => {
        initialText = text;

        // Change security levels
        cy.setSecurityLevels("High", "High", "High");

        // Verify content changed
        cy.get(contentSelector).invoke("text").should("not.eq", initialText);
      });
  };
}

/**
 * Standard tabbed interface test pattern
 */
export function testTabbedInterface(tabListSelector: string, tabIds: string[]) {
  return () => {
    cy.get(tabListSelector).within(() => {
      // Click each tab and verify content changes
      tabIds.forEach((tabId) => {
        cy.get(`[data-testid="${tabId}"]`).click();
        cy.get(`[aria-labelledby="${tabId}"]`).should("be.visible");
      });
    });
  };
}
