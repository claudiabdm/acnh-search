describe('The Select Search', () => {


  before(() => {
    cy.visit('/')
  })

  it('should select fish in spanish', () => {
    cy.get('select[id=currentSearch]')
      .select('Peces - ES')
      .should('have.value', 'fishES')
      .then(() => {
        cy.get('.container')
          .contains('Cacho')
      })
  })

  it('should select fish in english', () => {
    cy.get('select[id=currentSearch]')
      .select('Fish - EN')
      .should('have.value', 'fishEN')
      .then(() => {
        cy.get('.container')
          .contains('Pale Chub')
      })
  })

  it('should select bugs in spanish', () => {
    cy.get('select[id=currentSearch]')
      .select('Insectos - ES')
      .should('have.value', 'bugsES')
      .then(() => {
        cy.get('.container')
          .contains('Mariposa cometa de papel')
      })
  })

  it('should select bugs in english', () => {
    cy.get('select[id=currentSearch]')
      .select('Bugs - EN')
      .should('have.value', 'bugsEN')
      .then(() => {
        cy.get('.container')
          .contains('Paper kite butterfly')
      })
  })

})
