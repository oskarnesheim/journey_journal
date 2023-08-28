Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Testing posting functionality', () => {

  it('Test create post', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("stan@gmail.com")
    cy.get('[type="password"]').type("stan123")
    cy.get('.chakra-form-control > button').click()
    cy.wait(3000);
    cy.get(':nth-child(3) > a').click()
    cy.get('.profilePage > :nth-child(2)').click()
    cy.get('[placeholder="Trip name"]').type("Getting my belt back")
    cy.get('[placeholder="Cost"]').type("33245")
    cy.get('[placeholder="Write about all your fun experiences!"]').type("Fun experience")
    cy.get('.chakra-form-control > .bg-theme-green').click()
    cy.get('.profilePage > :nth-child(2)').click()
  })

  it('Test delete post', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("stan@gmail.com")
    cy.get('[type="password"]').type("stan123")
    cy.get('.chakra-form-control > button').click()
    cy.wait(3000);
    cy.get(':nth-child(3) > a').click()
    cy.wait(3000);
    cy.get(':nth-child(2) > .chakra-card__footer > .bg-theme-green').click()
    cy.get('.viewJourney > :nth-child(9)').click()
  })
})