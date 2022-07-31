describe("sign-in page test", () => {
  beforeEach(() => {
    cy.loginByAuth0Api(
      Cypress.env("auth0_username"),
      Cypress.env("auth0_password")
    );
  });
  it("passes", () => {
    cy.visit("http://localhost:3001/sign-in");
  });
});
