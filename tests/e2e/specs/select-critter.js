describe('The Select Search', () => {


  before(() => {
    cy.visit('/')
  })

  it('should select spanish from EU', () => {
    cy.get('select[id=language]')
      .select('EU-es')
      .should('have.value', 'name-EUes')
      .then(() => {
        cy.get('.container')
          .contains('cacho')
      })
  })

  it('should select chinese from China', () => {
    cy.get('select[id=language]')
      .select('CN-zh')
      .should('have.value', 'name-CNzh')
      .then(() => {
        cy.get('.container')
          .contains('溪哥')
      })
  })

  it('should select english from US', () => {
    cy.get('select[id=language]')
      .select('US-en')
      .should('have.value', 'name-USen')
      .then(() => {
        cy.get('.container')
          .contains('pale chub')
      })
  })

  it('should select southern hemisphere', () => {
    cy.get('select[id=hemisphere]')
      .select('southern')
      .should('have.value', 'southern')
      .then(() => {
        cy.get('.container')
          .contains('pale chub')
      })
  })


})
