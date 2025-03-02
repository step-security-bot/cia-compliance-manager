import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import { resolve } from "path";
import { resetJunitResults } from "./cypress/tasks/junit-reset";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(fileURLToPath(new URL(".", import.meta.url)));

export default defineConfig({
  experimentalMemoryManagement: true,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        resetJunitResults: resetJunitResults,
      });
      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: resolve(__dirname, "./vite.config.ts"),
          // options passed to vite
          // this is an example that shows how to configure Vite to pass
          // command line arguments through to the test
          // pass command line argument y through to the test like this:
          // `cypress run --env y=true`
          // and access it like this:
          // `Cypress.env('y')`
          // key: config.env.y,
        })
      );
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  // Add these configurations
  waitForAnimations: false,
  defaultCommandTimeout: 15000,
});
