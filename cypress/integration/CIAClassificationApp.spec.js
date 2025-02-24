describe('CIAClassificationApp', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the app', () => {
    cy.contains('CIA Classification App for PartyRock AWS').should('be.visible');
  });

  it('toggles dark mode', () => {
    cy.contains('Dark Mode').click();
    cy.contains('Light Mode').should('be.visible');
  });

  it('changes availability level', () => {
    cy.get('label').contains('Availability Level').parent().find('select').select('High');
    cy.get('label').contains('Availability Level').parent().find('select').should('have.value', 'High');
  });

  it('changes integrity level', () => {
    cy.get('label').contains('Integrity Level').parent().find('select').select('Moderate');
    cy.get('label').contains('Integrity Level').parent().find('select').should('have.value', 'Moderate');
  });

  it('changes confidentiality level', () => {
    cy.get('label').contains('Confidentiality Level').parent().find('select').select('Very High');
    cy.get('label').contains('Confidentiality Level').parent().find('select').should('have.value', 'Very High');
  });

  it('displays cost estimates', () => {
    cy.contains('Estimated CAPEX').should('be.visible');
    cy.contains('Estimated OPEX').should('be.visible');
  });

  it('displays detailed analysis', () => {
    cy.contains('Detailed Analysis').should('be.visible');
  });
});
