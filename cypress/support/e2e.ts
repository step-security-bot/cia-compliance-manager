import "@testing-library/cypress/add-commands";
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      checkTheme: (isDark: boolean) => void;
    }
  }
}

Cypress.Commands.add("checkTheme", (isDark: boolean) => {
  if (isDark) {
    cy.get("#root").should("have.class", "dark");
    cy.get('[data-testid="theme-toggle"]').should("contain.text", "Light Mode");
  } else {
    cy.get("#root").should("not.have.class", "dark");
    cy.get('[data-testid="theme-toggle"]').should("contain.text", "Dark Mode");
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
