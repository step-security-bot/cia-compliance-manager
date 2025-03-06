const { junitMerger } = require("../support/plugins/junit-merger");
const fs = require("fs");
const path = require("path");

/**
 * Cypress plugin configuration
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // Create results directory if it doesn't exist
  const resultsDir = path.join(process.cwd(), "cypress", "results");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log(`Created results directory: ${resultsDir}`);
  }

  // Initialize the JUnit merger plugin
  junitMerger(on, config);

  // Register tasks
  on("task", {
    resetJunitResults() {
      // Function implementation from the JUnit merger
      return junitMerger.resetJunitResults
        ? junitMerger.resetJunitResults()
        : null;
    },
  });

  // Register a task to merge all reports at the end of the run
  on("after:run", (results) => {
    console.log("After run: Merging JUnit reports");
    return on.task("mergeAllJunitReports");
  });

  return config;
};
