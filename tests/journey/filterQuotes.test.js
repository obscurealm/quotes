describe("filter quotes", () => {
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
      expect(title).to.equal("Home");
    });
    cy.get("h1").contains("Quotes");
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(3);
    });
    cy.get("[data-testid=workspacePageFilter]").select("Tingker Bell Quotes");
    cy.get("[data-testid=filterButton]").click();
    cy.get("[data-testid=quote]").should(($div) => {
      expect($div).have.length(1);
    });
  });
});
