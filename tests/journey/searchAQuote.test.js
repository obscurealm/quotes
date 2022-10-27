describe("search a quote", () => {
  it("filters a list of quotes", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
    cy.get("[data-testid=searchBox]").type("butt");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length(1);
    });
  });

  it("filters initial list of quotes", () => {
    cy.visit("/");
    cy.get("[data-testid=searchBox]").type("butt");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length(1);
    });
    cy.get("[data-testid=searchBox]").clear().type("Emperor");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length(3);
    });
  });

  it("clears filtered list of quotes", () => {
    cy.visit("/");
    cy.get("[data-testid=searchBox]").type("butt");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length(1);
    });
    cy.get("[data-testid=clearButton]").click();
    cy.get("[data-cy=quote]").should(($div) => {
      expect($div).have.length.greaterThan(1);
    });
  });
});
