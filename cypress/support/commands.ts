// Fix the tab command type error by placing type declaration in a separate file

// Custom command for tab navigation
Cypress.Commands.add("tab", { prevSubject: true }, (subject) => {
  cy.wrap(subject).trigger("keydown", {
    keyCode: 9,
    which: 9,
    key: "Tab",
    code: "Tab",
    bubbles: true,
  });

  return cy.focused();
});
