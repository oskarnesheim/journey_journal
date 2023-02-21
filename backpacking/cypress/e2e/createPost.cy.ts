describe('Testing posting functionality', () => {

  it('Test create post', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("Conor@gmail.com")
    cy.get('[type="password"]').type("lwchampion22")
    cy.get('.chakra-form-control > button').click()
    cy.wait(3000);
    cy.get(':nth-child(3) > a').click()
    cy.get(':nth-child(6) > button').click()
    cy.get('[placeholder="Trip name"]').type("Getting my belt back")
    cy.get('[placeholder="Cost"]').clear()
    cy.get('[placeholder="Cost"]').type(1000000)
    cy.get('[placeholder="how far?"]').type(1000000)
    cy.get('[placeholder="Write all your fun experiences!"]').type("Fun experience")
    cy.get('.chakra-form-control > .chakra-button').click()
    cy.get(':nth-child(6) > button').click()
  })

})
