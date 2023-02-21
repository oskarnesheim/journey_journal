import { defineConfig } from "typescript"

describe('Home page tests', () => {
  it('Visits the Home Page', () => {
    cy.visit('http://localhost:5173/')
  })

  it('Navbar loads correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(2) > a').contains("Home")
    cy.get(':nth-child(3) > a').contains("Profile")
    cy.get(':nth-child(4) > a').contains("About us")
    cy.get(':nth-child(5) > a').contains("Login")
  })

  it('Home page loads posts', () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(2) > a').click()
    cy.get('.h-56 > :nth-child(1)').should("exist")
    cy.get('.h-56 > :nth-child(2)').should("exist")
    cy.get('.h-56 > :nth-child(3)').should("exist")
    cy.get('.h-56 > :nth-child(4)').should("exist")

  })
})

