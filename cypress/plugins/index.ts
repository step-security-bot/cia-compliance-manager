import { defineConfig } from "cypress";
import { junitMerger } from "../support/plugins/junit-merger";

// No need for module declaration now as we have proper type definitions

/**
 * Cypress plugin configuration
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Cypress.PluginConfigOptions => {
  // Initialize the JUnit merger plugin
  junitMerger(on, config);

  // Use proper type-safe event registration
  on("task", {
    // Add a task to merge junit reports that can be called from tests
    async mergeAllJunitReports() {
      try {
        // Use dynamic import with the .js extension to ensure proper module loading
        const junitMergerModule = await import(
          "../support/plugins/merge-reports.js"
        );

        // Check if the function exists in the correct module
        if (typeof junitMergerModule.mergeAllJunitReports === "function") {
          return junitMergerModule.mergeAllJunitReports();
        }
        return {
          success: false,
          error: "mergeAllJunitReports function not found in merge-reports.js",
        };
      } catch (err) {
        console.error("Error running mergeAllJunitReports:", err);
        return { success: false, error: String(err) };
      }
    },
  });

  return config;
};
