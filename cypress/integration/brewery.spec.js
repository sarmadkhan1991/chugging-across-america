let port = 'http://localhost:3000/brewery'

describe('Brewery', () => {
    beforeEach(() => {
        cy.visit(port);
    });
})