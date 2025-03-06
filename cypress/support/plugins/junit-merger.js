import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get proper __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESULTS_DIR = path.join(process.cwd(), "cypress", "results");
const FINAL_JUNIT_PATH = path.join(RESULTS_DIR, "junit.xml");
const TEMP_RESULTS_PATH = path.join(RESULTS_DIR, "temp-results.json");

// Ensure the results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Initialize accumulated results if they don't exist
const initialResults = {
  testsuites: {
    name: "Mocha Tests",
    time: 0,
    tests: 0,
    failures: 0,
    testsuites: [],
  },
};

if (!fs.existsSync(TEMP_RESULTS_PATH)) {
  fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(initialResults));
}

/**
 * Generate a safe filename from a test spec path
 * @param {string} specPath The path to the test spec file
 * @returns {string} A filename safe string
 */
function getSpecFileName(specPath) {
  if (!specPath) return "unknown-spec";

  // Extract the filename without extension
  const baseName = path.basename(specPath, path.extname(specPath));

  // Make it safe for filenames by replacing non-alphanumeric chars
  return baseName.replace(/[^a-zA-Z0-9-]/g, "_");
}

/**
 * JUnit merger function
 * @param {Cypress.PluginEvents} on
 * @param {Cypress.PluginConfigOptions} config
 */
export function junitMerger(on, config) {
  on("task", {
    resetJunitResults() {
      // Don't delete individual reports, just reset the accumulator
      if (fs.existsSync(TEMP_RESULTS_PATH)) {
        fs.unlinkSync(TEMP_RESULTS_PATH);
      }
      fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(initialResults));

      // Also reset the main junit.xml file but preserve any individual reports
      if (fs.existsSync(FINAL_JUNIT_PATH)) {
        fs.unlinkSync(FINAL_JUNIT_PATH);
      }
      return null;
    },

    // Task to merge all existing reports into one
    mergeAllJunitReports() {
      try {
        // Get all junit XML files - update the pattern to match new filenames
        const reports = fs
          .readdirSync(RESULTS_DIR)
          .filter(
            (file) =>
              (file.startsWith("junit-") || file.includes("junit")) &&
              file.endsWith(".xml") &&
              !file.includes("combined") &&
              !file.includes("backup")
          );

        if (reports.length === 0) {
          console.log(
            "No JUnit reports found to merge. Looking in:",
            RESULTS_DIR
          );
          // List all files for debugging
          const allFiles = fs.readdirSync(RESULTS_DIR);
          console.log("Available files:", allFiles);
          return { success: false, message: "No test reports found to merge" };
        }

        let allTestsuites = [];
        let totalTime = 0;
        let totalTests = 0;
        let totalFailures = 0;

        // Extract and combine data from all reports
        reports.forEach((reportFile) => {
          const reportPath = path.join(RESULTS_DIR, reportFile);
          const reportXml = fs.readFileSync(reportPath, "utf8");

          // Extract testsuites
          const testsuiteRegex = /<testsuite.*?<\/testsuite>/g;
          let match;
          while ((match = testsuiteRegex.exec(reportXml)) !== null) {
            if (!allTestsuites.includes(match[0])) {
              allTestsuites.push(match[0]);
            }
          }

          // Extract metrics
          const timeMatch = /time="([^"]+)"/.exec(reportXml);
          const testsMatch = /tests="([^"]+)"/.exec(reportXml);
          const failuresMatch = /failures="([^"]+)"/.exec(reportXml);

          if (timeMatch) totalTime += parseFloat(timeMatch[1]);
          if (testsMatch) totalTests += parseInt(testsMatch[1], 10);
          if (failuresMatch) totalFailures += parseInt(failuresMatch[1], 10);
        });

        if (allTestsuites.length > 0) {
          // Generate combined XML
          const combinedXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="All Cypress Tests" time="${totalTime}" tests="${totalTests}" failures="${totalFailures}">
  ${allTestsuites.join("\n  ")}
</testsuites>`;

          // Write the final combined report
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const finalReportPath = path.join(
            RESULTS_DIR,
            `junit-all-${timestamp}.xml`
          );
          fs.writeFileSync(finalReportPath, combinedXml);

          console.log(
            `Successfully generated merged JUnit report: ${finalReportPath}`
          );
          console.log(`  - Combined ${reports.length} test files`);
          console.log(`  - Total tests: ${totalTests}`);
          console.log(`  - Total failures: ${totalFailures}`);

          return {
            success: true,
            reportPath: finalReportPath,
            stats: {
              files: reports.length,
              tests: totalTests,
              failures: totalFailures,
              time: totalTime,
            },
          };
        }

        return { success: false, message: "No test suites found to merge" };
      } catch (error) {
        console.error("Error merging all JUnit reports:", error);
        return { success: false, error: String(error) };
      }
    },
  });

  // The after:run hook will not be needed for direct script execution
  // but we keep it for Cypress integration
  on("after:run", (results) => {
    try {
      // Similar to the task but triggered after Cypress runs
      on.task("mergeAllJunitReports");
    } catch (error) {
      console.error("Error in after:run hook:", error);
    }

    return results;
  });
}

// Export the resetJunitResults function directly for easier access
export const resetJunitResults = () => {
  // Don't delete individual reports, just reset the accumulator
  if (fs.existsSync(TEMP_RESULTS_PATH)) {
    fs.unlinkSync(TEMP_RESULTS_PATH);
  }
  fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(initialResults));

  // Also reset the main junit.xml file but preserve any individual reports
  if (fs.existsSync(FINAL_JUNIT_PATH)) {
    fs.unlinkSync(FINAL_JUNIT_PATH);
  }
  return null;
};

// Export the merge function directly
export const mergeAllJunitReports = () => {
  try {
    // Get all junit XML files - update the pattern to match new filenames
    const reports = fs
      .readdirSync(RESULTS_DIR)
      .filter(
        (file) =>
          (file.startsWith("junit-") || file.includes("junit")) &&
          file.endsWith(".xml") &&
          !file.includes("combined") &&
          !file.includes("backup")
      );

    if (reports.length === 0) {
      console.log("No JUnit reports found to merge. Looking in:", RESULTS_DIR);
      // List all files for debugging
      const allFiles = fs.readdirSync(RESULTS_DIR);
      console.log("Available files:", allFiles);
      return { success: false, message: "No test reports found to merge" };
    }

    let allTestsuites = [];
    let totalTime = 0;
    let totalTests = 0;
    let totalFailures = 0;

    // Extract and combine data from all reports
    reports.forEach((reportFile) => {
      const reportPath = path.join(RESULTS_DIR, reportFile);
      const reportXml = fs.readFileSync(reportPath, "utf8");

      // Extract testsuites
      const testsuiteRegex = /<testsuite.*?<\/testsuite>/g;
      let match;
      while ((match = testsuiteRegex.exec(reportXml)) !== null) {
        if (!allTestsuites.includes(match[0])) {
          allTestsuites.push(match[0]);
        }
      }

      // Extract metrics
      const timeMatch = /time="([^"]+)"/.exec(reportXml);
      const testsMatch = /tests="([^"]+)"/.exec(reportXml);
      const failuresMatch = /failures="([^"]+)"/.exec(reportXml);

      if (timeMatch) totalTime += parseFloat(timeMatch[1]);
      if (testsMatch) totalTests += parseInt(testsMatch[1], 10);
      if (failuresMatch) totalFailures += parseInt(failuresMatch[1], 10);
    });

    if (allTestsuites.length > 0) {
      // Generate combined XML
      const combinedXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="All Cypress Tests" time="${totalTime}" tests="${totalTests}" failures="${totalFailures}">
  ${allTestsuites.join("\n  ")}
</testsuites>`;

      // Write the final combined report
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const finalReportPath = path.join(
        RESULTS_DIR,
        `junit-all-${timestamp}.xml`
      );
      fs.writeFileSync(finalReportPath, combinedXml);

      console.log(
        `Successfully generated merged JUnit report: ${finalReportPath}`
      );
      console.log(`  - Combined ${reports.length} test files`);
      console.log(`  - Total tests: ${totalTests}`);
      console.log(`  - Total failures: ${totalFailures}`);

      return {
        success: true,
        reportPath: finalReportPath,
        stats: {
          files: reports.length,
          tests: totalTests,
          failures: totalFailures,
          time: totalTime,
        },
      };
    }

    return { success: false, message: "No test suites found to merge" };
  } catch (error) {
    console.error("Error merging all JUnit reports:", error);
    return { success: false, error: String(error) };
  }
};
