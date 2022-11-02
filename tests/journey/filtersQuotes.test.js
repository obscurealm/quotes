describe("filters quotes", () => {
  it("filters a list of quotes", () => {
    cy.visit("/");
    cy.title().should((title) => {
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length.of.at.least(1);
    });
    cy.get("[data-testid=workspacePageFilter]").select("Tingker Bell Quotes");
    cy.get("[data-testid=filterButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(10);
    });
  });
});
