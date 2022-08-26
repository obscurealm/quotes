describe("view a quote", () => {
  it("clicks through to a quote", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
    cy.get("a")
      .should("have.attr", "href")
      .and("include", "quotes")
      .then((href) => cy.visit(href));
    cy.title().should((title) => {
      expect(title).to.equal("Quote");
    });
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).to.have.lengthOf(1);
    });
  });

  it("clicks back to list of quotes", () => {
    cy.visit("/");
    cy.get("a")
      .should("have.attr", "href")
      .and("include", "quotes")
      .then((href) => cy.visit(href));
    cy.get("a")
      .should("have.attr", "href")
      .then((href) => cy.visit(href));
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
  });
});
