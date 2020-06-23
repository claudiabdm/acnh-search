describe('The Change Month', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should show current month', () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = months[new Date().getMonth()];
    cy.get('.month-navbar__title')
      .contains(currentMonth);
  })

  it('should change to next month', () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < 12; i++) {
      cy.get('.month-navbar__title').then(($month) => {
        const currentMonthIdx = months.findIndex(month => month === $month[0].textContent);
        cy.get('#buttonNext')
          .click()
          .then(() => {
            const nextMonth = currentMonthIdx > 10 ? months[0] : months[currentMonthIdx + 1];
            expect($month[0].textContent).to.eq(nextMonth);
          })
      })
    }
  })

  it('should change to prev month', () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < 12; i++) {
      cy.get('.month-navbar__title').then(($month) => {
        const currentMonthIdx = months.findIndex(month => month === $month[0].textContent);
        cy.get('#buttonPrev')
          .click()
          .then(() => {
            const nextMonth = currentMonthIdx < 1 ? months[11] : months[currentMonthIdx - 1];
            expect($month[0].textContent).to.eq(nextMonth);
          })
      })
    }
  })
})