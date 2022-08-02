import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    auth0_username: "freelancer",
    auth0_password: "password",
    auth1_username: "james",
    auth1_password: "password",
    auth2_username: "admin",
    auth2_password: "password",
    auth0_domain: "localhost:3001",
    server_domain: "localhost:3000",
  },
});
