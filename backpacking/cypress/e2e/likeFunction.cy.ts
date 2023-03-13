Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Testing like functionality', () => {
    
    it('Test like count', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').type("stan@gmail.com")
        cy.get('[type="password"]').type("stan123")
        cy.get('.chakra-form-control > button').click()
        cy.get(':nth-child(2) > a').click()
        cy.wait(3000)
        cy.get(':nth-child(1) > .chakra-card__footer > .bottom-7 > .max-h-8').click()
        cy.get(':nth-child(3) > a').click()
    })
})
  