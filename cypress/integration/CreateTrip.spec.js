let port = 'http://localhost:3000'

describe('CreateTrip', () => {
  beforeEach(() => {
    cy.visit(port);
  });

  it('types in start city', () => {
    cy.get('.start-city')
      .type('los angeles')
      .should('have.value', 'los angeles');
  });

  it('types in end city', () => {
    cy.get('.end-city')
      .type('new york')
      .should('have.value', 'new york');
  });

  it('clicks find beer', () => {
    cy.get('.submit')
      .click();
  });
})