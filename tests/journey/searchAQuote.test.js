describe("search a quote", () => {
  beforeEach(() => {
    cy.task("clearNock");
    cy.task("stubNotionApi");
  });

  afterEach(() => {
    cy.task("clearNock");
  });

  it("filters a list of quotes", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Quotes");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(5);
    });
    cy.get("[data-testid=searchBox]").type("morning");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(1);
    });
  });

  it("filters initial list of quotes", () => {
    cy.visit("/");
    cy.get("[data-testid=searchBox]").type("morning");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(1);
    });
    cy.get("[data-testid=searchBox]").clear().type("Good{enter}");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(3);
    });
  });

  it("resets filtered list of quotes", () => {
    cy.visit("/");
    cy.get("[data-testid=searchBox]").type("morning");
    cy.get("[data-testid=searchButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(1);
    });
    cy.get("[data-testid=resetButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(5);
    });
  });
});
