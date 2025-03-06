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
  // Increase viewport size for better visibility during testing
  viewportWidth: 3840, // Increased from 1280 to 3840
  viewportHeight: 2160, // Increased from 800 to 2160
  retries: {
    runMode: 2, // Increased retries in run mode
    openMode: 1, // Added retry in open mode
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
  // Fast timeouts to fail quickly
  waitForAnimations: false,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  requestTimeout: 5000,
});
