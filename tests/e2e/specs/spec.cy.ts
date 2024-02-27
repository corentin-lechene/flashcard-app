describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('ion-title', 'Accueil')
  })
})