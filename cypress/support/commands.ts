// Custom command for tab navigation
Cypress.Commands.add("tab", { prevSubject: "element" }, (subject) => {
  cy.wrap(subject).trigger("keydown", {
    keyCode: 9,
    which: 9,
    key: "Tab",
    code: "Tab",
    bubbles: true,
  });

  return cy.focused();
});
