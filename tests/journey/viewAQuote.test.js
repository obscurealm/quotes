describe("view a quote", () => {
  beforeEach(() => {
    cy.task("clearNock");
    cy.task("stubNotionApi");
  });

  afterEach(() => {
    cy.task("clearNock");
  });

  it("clicks through to a quote", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Quotes");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(5);
    });
    cy.get('a[href*="quotes"]')
      .should("have.attr", "href")
      .and("include", "quotes")
      .then((href) => cy.visit(href));
    cy.title().should((title) => {
      expect(title).to.equal("Quote - Quotes");
    });
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(1);
    });
  });

  it("clicks back to list of quotes", () => {
    cy.visit("/");
    cy.get('a[href*="quotes"]')
      .should("have.attr", "href")
      .and("include", "quotes")
      .then((href) => cy.visit(href));
    cy.get("a")
      .should("have.attr", "href")
      .then((href) => cy.visit(href));
    cy.title().should((title) => {
      expect(title).to.equal("Quotes");
    });
  });
});
