describe("view quotes", () => {
  beforeEach(() => {
    cy.task("clearNock");
    cy.task("stubNotionApi");
  });

  afterEach(() => {
    cy.task("clearNock");
  });

  it("clicks through pages of quotes", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(5);
    });
    cy.get("[data-testid=pagination]").contains("2").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(1);
    });
    cy.get("[data-testid=pagination]").contains("1").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(5);
    });
    cy.contains("Next").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(1);
    });
    cy.contains("Previous").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).to.have.length(5);
    });
  });
});
