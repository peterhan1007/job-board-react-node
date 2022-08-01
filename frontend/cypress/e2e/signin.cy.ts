describe("The Sign In Page", () => {
  it("display dom elements.", () => {
    cy.visit("http://localhost:3001/sign-in");
    cy.get("input").then(($el) => {
      Cypress.dom.isAttached($el);
    });
    cy.get("button").then(($el) => {
      Cypress.dom.isAttached($el);
    });
  });

  it("username and password validation", () => {
    const username = "A";
    const password = "short";

    cy.visit("http://localhost:3001/sign-in");
    cy.get("input[id=username]").type(username);
    cy.get("input[id=password]").type(password);

    cy.get("#sign_in_form").submit();
  });

  it("logs in programmatically without using the UI", () => {
    const username = Cypress.env("auth0_username");
    const password = Cypress.env("auth0_password");
    cy.visit("http://localhost:3001/sign-in");
    cy.get("input[id=username]").type(username);
    cy.get("input[id=password]").type(password);

    cy.request("POST", Cypress.env("server_domain") + "/api/login", {
      name: username,
      password,
    }).as("UserSuccess");

    cy.get("#sign_in_form").submit();
    cy.url().should("include", "/jobs");
  });
});
