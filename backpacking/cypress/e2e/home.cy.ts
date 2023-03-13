import { defineConfig } from "typescript"

describe('Home page tests', () => {
  it('Visits the Home Page', () => {
    cy.visit('http://localhost:5173/')
  })

  it('Navbar loads correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(2) > a').contains("Home")
    cy.get(':nth-child(3) > a').contains("About us")
  })

  it('Home page loads posts', () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(2) > a').click()
    cy.get('.content-container > :nth-child(1)').should("exist")
    cy.get('.content-container > :nth-child(2)').should("exist")
  })
})

