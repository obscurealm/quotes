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
      expect(title).to.equal("Quotes");
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

  it("displays sorted quotes by latest date time", () => {
    cy.visit("/");
    cy.contains("20 October 2022");
  });

  it("displays sorted quotes by oldest date time", () => {
    cy.visit("/");
    cy.get("[data-testid=sortByDropdown]").select("Oldest first");
    cy.get("a").contains("1 March 2022");
  });
});
