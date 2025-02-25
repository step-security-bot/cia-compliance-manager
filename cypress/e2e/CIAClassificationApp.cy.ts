describe("CIA Classification App", () => {
  beforeEach(() => {
    // Simpler setup without iframe check
    cy.visit("/");
    // Add custom command to handle any overlays
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should load the application successfully", () => {
    cy.get('[data-testid="app-title"]', { timeout: 10000 })
      .should("be.visible")
      .and("contain", "CIA Classification App for PartyRock AWS");
    cy.get('[data-testid="classification-form"]').should("exist");
  });

  describe("Classification Controls", () => {
    it("should handle all CIA level selections", () => {
      ["confidentiality", "integrity", "availability"].forEach((control) => {
        cy.get(`[data-testid="${control}-select"]`, { timeout: 5000 }).within(
          () => {
            ["None", "Low", "Moderate", "High", "Very High"].forEach(
              (level) => {
                cy.root().select(level);
                cy.root().should("have.value", level);
              }
            );
          }
        );
      });
    });

    it("should update cost estimates when levels change", () => {
      cy.get('[data-testid="confidentiality-select"]').select("High");
      cy.get('[data-testid="capex-estimate"]').should("be.visible");
      cy.get('[data-testid="opex-estimate"]').should("be.visible");
    });
  });

  describe("Theme Toggle", () => {
    it("should toggle between light and dark modes", () => {
      // Wait for initial render
      cy.get('[data-testid="theme-toggle"]').should("be.visible");

      // Check initial state
      cy.get('[data-testid="theme-toggle"]').should(
        "contain.text",
        "Dark Mode"
      );
      cy.get("#root").should("not.have.class", "dark");

      // First toggle
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="theme-toggle"]').should(
        "contain.text",
        "Light Mode"
      );
      cy.get("#root").should("have.class", "dark");

      // Second toggle
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="theme-toggle"]').should(
        "contain.text",
        "Dark Mode"
      );
      cy.get("#root").should("not.have.class", "dark");
    });
  });

  describe("Form Submission", () => {
    it("should update analysis when levels change", () => {
      cy.get('[data-testid="confidentiality-select"]').select("High");
      cy.get('[data-testid="integrity-select"]').select("Moderate");
      cy.get('[data-testid="availability-select"]').select("Low");
      cy.get('[data-testid="analysis-section"]').should("be.visible");
      cy.get('[data-testid="recommendations"]').should("exist");
    });
  });

  describe("Analysis Display", () => {
    it("should show detailed analysis based on selections", () => {
      cy.get('[data-testid="confidentiality-select"]').select("Very High");
      cy.get('[data-testid="analysis-section"]').should("be.visible");
      cy.get('[data-testid="recommendations"]').should("exist");
    });
  });
});
