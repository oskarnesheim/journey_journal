describe('Testing user functionality', () => {
  it('Test create user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.authUser > :nth-child(3)').click()
    cy.get('.chakra-form-control > :nth-child(2)').type("Stan")
    cy.get('.chakra-form-control > :nth-child(4)').type("Marsh")
    cy.get('.chakra-form-control > :nth-child(6)').type("stan")
    cy.get('.chakra-form-control > :nth-child(8)').type("stan@gmail.com")
    cy.get('.css-1jj9yua > :nth-child(1)').click()
    cy.get('[type="password"]').type("stan123")
    cy.get('.chakra-button').click()
  })

  it('Test login', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("stan@gmail.com")
    cy.get('[type="password"]').type("stan123")
    cy.get('.chakra-form-control > button').click()
    cy.wait(3000);
    cy.get(':nth-child(5) > p').contains("Welcome back Stan")
  })

  it('Test logout', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[type="email"]').type("stan@gmail.com")
    cy.get('[type="password"]').type("stan123")
    cy.get('.chakra-form-control > button').click()
    cy.get('.right-3 > button').click()
  })


})
