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

  it("views a quote", () => {
    cy.visit("/");
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
    cy.get("a")
      .should("have.attr", "href")
      .and("include", "quotes")
      .then((href) => cy.visit(href));
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).to.have.lengthOf(1);
    });
  });
});
