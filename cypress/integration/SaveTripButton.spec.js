let port = "http://localhost:3000";


describe('SaveTrip', () => {
    beforeEach(() => {
        cy.visit(port)
    })

    it('clicks', () => {
        cy.get('.btn')
            .click();
    })
})