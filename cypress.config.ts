import { defineConfig } from "cypress";
import { junitMerger } from "./cypress/support/plugins/junit-merger";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Updated to match Vite's default port
    setupNodeEvents(on, config) {
      // Register the JUnit merger plugin
      junitMerger(on, config);

      // Don't explicitly return config to avoid TypeScript error
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    experimentalMemoryManagement: true,
    waitForAnimations: true,
    animationDistanceThreshold: 50,
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/junit.xml",
    toConsole: true,
  },
  video: false,
  screenshotOnRunFailure: true,
});
