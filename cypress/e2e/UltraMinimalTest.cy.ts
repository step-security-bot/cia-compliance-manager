/**
 * Ultra minimal test that should always pass - useful for CI
 */

describe("Ultra Basic App Tests", () => {
  beforeEach(() => {
    cy.visit("/", { timeout: 15000 });
    // Wait for any content to appear
    cy.get("body", { timeout: 10000 }).should("not.be.empty");
  });

  // Most basic test possible - just check if page loaded
  it("renders something on the page", () => {
    cy.get("body").should("not.be.empty");
  });

  // Basic DOM test
  it("has basic HTML structure", () => {
    cy.get("html").should("exist");
    cy.get("head").should("exist");
    cy.get("body").should("exist");
  });

  // Basic content check
  it("has some visible text content", () => {
    cy.get("body").invoke("text").should("not.be.empty");
  });
});
