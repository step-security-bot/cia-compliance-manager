import { junitMerger } from "../support/plugins/junit-merger";

/**
 * Cypress plugin configuration
 * @type {Cypress.PluginConfig}
 */
export default (on, config) => {
  // Initialize the JUnit merger plugin
  junitMerger(on, config);

  // Register a task to merge all reports at the end of the run
  on("after:run", async () => {
    // Merge all JUnit reports
    return on.task("mergeAllJunitReports");
  });

  return config;
};
