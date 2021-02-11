describe("User visits the home page", () => {
  it("displays the home page", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
  });

  it("has a list of quotes", () => {
    cy.visit("/");
    cy.contains("h1", "Quotes");
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
  });
});
