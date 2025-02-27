/**
 * More robust form interaction helpers that handle CSS and React quirks
 */

// Find a select element by various means
export const findSelectByLabel = (labelText: string) => {
  cy.log(`Looking for select with label: ${labelText}`);

  // Try all these approaches to find the element
  return cy.contains("label", labelText).then(($label) => {
    // Check if label has 'for' attribute
    const forId = $label.attr("for");

    if (forId) {
      cy.log(`Found label with for=${forId}`);
      return cy.get(`#${forId}`);
    }

    // Check if label wraps the select
    const $select = $label.find("select");
    if ($select.length > 0) {
      cy.log("Found select inside label");
      return cy.wrap($select);
    }

    // Try finding closest select sibling
    const $selectSibling = $label.siblings("select");
    if ($selectSibling.length > 0) {
      cy.log("Found select as sibling to label");
      return cy.wrap($selectSibling);
    }

    // Last resort - find by data-testid
    const labelTextLower = labelText.toLowerCase();
    cy.log(`Looking for [data-testid="${labelTextLower}-select"]`);
    return cy.get(`[data-testid="${labelTextLower}-select"]`);
  });
};

// Helper to select CIA values in a more robust way
export const selectCIAValues = (
  availabilityValue: string,
  integrityValue: string,
  confidentialityValue: string
) => {
  cy.log("Setting CIA values with robust helper");

  // Try multiple approaches to set values
  const trySelectByTestId = () => {
    cy.get('[data-testid="availability-select"]').select(availabilityValue, {
      force: true,
    });
    cy.wait(300);
    cy.get('[data-testid="integrity-select"]').select(integrityValue, {
      force: true,
    });
    cy.wait(300);
    cy.get('[data-testid="confidentiality-select"]').select(
      confidentialityValue,
      { force: true }
    );
    cy.wait(500);
  };

  const trySelectByLabel = () => {
    findSelectByLabel("Availability").select(availabilityValue, {
      force: true,
    });
    cy.wait(300);
    findSelectByLabel("Integrity").select(integrityValue, { force: true });
    cy.wait(300);
    findSelectByLabel("Confidentiality").select(confidentialityValue, {
      force: true,
    });
    cy.wait(500);
  };

  // Try first approach, if it fails, try the second
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="availability-select"]').length > 0) {
      trySelectByTestId();
    } else {
      trySelectByLabel();
    }
  });
};
