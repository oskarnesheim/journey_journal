describe('Home page tests', () => {
  it('Successfull create user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.authUser > :nth-child(3)').click()
    cy.get('.chakra-form-control > :nth-child(4)').type("Mcgregor")
    cy.get('.chakra-form-control > :nth-child(6)').type("Conor")
    cy.get('.chakra-form-control > :nth-child(8)').type("Conor@gmail.com")
    cy.get('.css-1jj9yua > :nth-child(1)').click()
    cy.get('[type="password"]').type("lwchampion22")
    cy.get('.chakra-button').click()
  })

  it('Successfull login', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("Conor@gmail.com")
    cy.get('[type="password"]').type("lwchampion22")
    cy.get('.chakra-form-control > button').click()
    cy.get(':nth-child(6) > p').contains("Welcome back ")
  })


})
