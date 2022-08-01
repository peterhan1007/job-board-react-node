describe("empty spec", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/login", {
      name: "james",
      password: "password",
    }).then(({ body }) => {
      window.localStorage.setItem("api-token", body.user.token);
    });
  });

  it("display Jobs page", () => {
    cy.visit("http://localhost:3001/jobs");
    cy.get("input").then(($el) => {
      Cypress.dom.isAttached($el);
    });
    cy.get("div").then(($el) => {
      Cypress.dom.isAttached($el);
    });
  });

  it("check url when you click the nav links.", () => {
    cy.get("nav a").click({ multiple: true });
  });

  it("check create job modal", async () => {
    cy.url().then(console.log);
    cy.get("input").invoke("val").should("be.empty");
    const invalidTitle = "Fullstack develop engineer";
    const validTitle = "Fullstack engineer";
    const description =
      "We want a fullstack develop engineer, experience in React over 3 years.";
    const rate: number = 20;
    const status = "not working";

    const countOfTr: number = await new Promise((resolve) =>
      cy.get("tr").then(($elements) => {
        resolve($elements.length);
      })
    );

    cy.wait(2000);
    cy.get("#create-job-button").click();
    cy.get("#create-job-button").should("be.visible");

    cy.get("input[id=title]").type(invalidTitle);
    cy.get("input[id=description]").type(description);
    cy.get("input[id=rate]").type(rate);
    cy.get("input[id=status]").type(status);

    cy.get("#ok").should("be.disabled");
    cy.get("input[id=title]").clear();
    cy.get("input[id=title]").type(validTitle);
    cy.get("#ok").should("be.enabled");

    cy.get("#ok").click();

    const newCountOfTr: number = await new Promise((resolve) =>
      cy.get("tr").then(($elements) => {
        resolve($elements.length);
      })
    );
    cy.wait(2000);

    expect(countOfTr).to.equal(newCountOfTr - 1);
  });
});
