describe('Home page tests', () => {
  it('Successfull login', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("")
    cy.get('[type="password"]').type("")
    cy.get('.chakra-form-control > button').click()


    
  })


})
