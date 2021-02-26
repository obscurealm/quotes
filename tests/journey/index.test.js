describe("User visits the home page", () => {
  it("can display a list of quotes", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
  });
});
