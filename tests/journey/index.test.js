describe("User visits the home page", () => {
  it("displays the home page", () => {
    cy.visit("/");
    cy.title().should("eq", "Home");
  });

  it("has a list of quotes", () => {
    cy.visit("/");
    cy.contains('h1', 'Quotes');
    cy.get('[data-cy=quote]').should('have.length.at.least', 1).and('be.visible')
  });
});
