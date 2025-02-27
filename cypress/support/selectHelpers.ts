/**
 * Helper functions for working with select elements in tests
 */

/**
 * Sets all CIA security levels in one operation
 */
export const setAllSecurityLevels = (
  availability: string,
  integrity: string,
  confidentiality: string
) => {
  // First find all select elements to verify what's available
  cy.get("select").then(($selects) => {
    cy.log(`Found ${$selects.length} selects before attempting to set values`);
  });

  // Try to set values with multiple selector strategies
  const setByTestId = () => {
    cy.get('[data-testid="availability-select"]').select(availability, {
      force: true,
    });
    cy.wait(200);
    cy.get('[data-testid="integrity-select"]').select(integrity, {
      force: true,
    });
    cy.wait(200);
    cy.get('[data-testid="confidentiality-select"]').select(confidentiality, {
      force: true,
    });
  };

  // Execute strategy
  setByTestId();

  // Verify the selections were applied
  cy.get('[data-testid="availability-select"]').should(
    "have.value",
    availability
  );
  cy.get('[data-testid="integrity-select"]').should("have.value", integrity);
  cy.get('[data-testid="confidentiality-select"]').should(
    "have.value",
    confidentiality
  );
};

/**
 * Makes Cypress more verbose about its select operations
 * Fixed with proper TypeScript type annotations
 */
export const setupSelectDebugging = () => {
  // Use a type-safe approach with any to avoid TypeScript errors
  Cypress.Commands.overwrite("select", (originalFn: any, ...args: any[]) => {
    // Get the subject and value from arguments
    const subject = args[0];
    const value = args[1];

    // Create a safe description of the element for logging
    const elementDesc =
      typeof subject === "object" && subject !== null
        ? subject.selector || "element"
        : "unknown element";

    // Log the selection operation
    cy.log(`Selecting "${value}" on ${elementDesc}`);

    // Apply force option to all select operations
    if (args.length >= 3) {
      // If options were provided, add force: true
      const options = args[2] || {};
      args[2] = { ...options, force: true, timeout: 5000 };
    } else {
      // If no options were provided, add them
      args.push({ force: true, timeout: 5000 });
    }

    // Call the original function with all arguments
    return originalFn(...args);
  });
};
