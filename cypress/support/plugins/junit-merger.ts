import fs from "fs";
import path from "path";

// Fix type imports
type PluginEvents = Cypress.PluginEvents;
type PluginConfigOptions = Cypress.PluginConfigOptions;

interface TestSuitesData {
  name: string;
  time: number;
  tests: number;
  failures: number;
  testsuites: string[];
}

interface AccumulatedResults {
  testsuites: TestSuitesData;
}

const RESULTS_DIR = path.join(process.cwd(), "cypress", "results");
const FINAL_JUNIT_PATH = path.join(RESULTS_DIR, "junit.xml");
const TEMP_RESULTS_PATH = path.join(RESULTS_DIR, "temp-results.json");

// Ensure the results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Initialize accumulated results if they don't exist
const initialResults: AccumulatedResults = {
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
 * @param specPath The path to the test spec file
 * @returns A filename safe string
 */
function getSpecFileName(specPath: string): string {
  if (!specPath) return "unknown-spec";

  // Extract the filename without extension
  const baseName = path.basename(specPath, path.extname(specPath));

  // Make it safe for filenames by replacing non-alphanumeric chars
  return baseName.replace(/[^a-zA-Z0-9-]/g, "_");
}

export function junitMerger(
  on: PluginEvents,
  config: PluginConfigOptions
): void {
  on("after:run", (results: any) => {
    try {
      if (!fs.existsSync(FINAL_JUNIT_PATH)) {
        // If no JUnit file exists yet, return - the default reporter will create it
        return results;
      }

      // Read the current run's JUnit XML
      const currentXml = fs.readFileSync(FINAL_JUNIT_PATH, "utf8");

      // For each spec file that was run, create an individual JUnit report
      if (results && results.runs) {
        results.runs.forEach((run: any) => {
          try {
            // Get a safe filename from the spec file
            const specFileName = getSpecFileName(run.spec.relative);
            const specXmlPath = path.join(
              RESULTS_DIR,
              `junit-${specFileName}.xml`
            );

            // Extract only the test suites for this spec
            const testsuiteRegex = /<testsuite.*?<\/testsuite>/g;
            let testsuiteMatches: string[] = [];
            let match;
            while ((match = testsuiteRegex.exec(currentXml)) !== null) {
              // Check if this testsuite belongs to the current spec
              if (
                match[0].includes(run.spec.name) ||
                match[0].includes(specFileName) ||
                match[0].includes(path.basename(run.spec.relative))
              ) {
                testsuiteMatches.push(match[0]);
              }
            }

            if (testsuiteMatches.length > 0) {
              // Calculate totals for this spec
              let specTime = 0;
              let specTests = 0;
              let specFailures = 0;

              // Extract basic metrics from the XML string
              testsuiteMatches.forEach((suite) => {
                const timeMatch = /time="([^"]+)"/.exec(suite);
                const testsMatch = /tests="([^"]+)"/.exec(suite);
                const failuresMatch = /failures="([^"]+)"/.exec(suite);

                if (timeMatch) specTime += parseFloat(timeMatch[1]);
                if (testsMatch) specTests += parseInt(testsMatch[1], 10);
                if (failuresMatch)
                  specFailures += parseInt(failuresMatch[1], 10);
              });

              // Generate spec-specific XML
              const specXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="${
                run.spec.name
              }" time="${specTime}" tests="${specTests}" failures="${specFailures}">
  ${testsuiteMatches.join("\n  ")}
</testsuites>`;

              // Write the spec XML file
              fs.writeFileSync(specXmlPath, specXml);
              console.log(`JUnit report saved for spec: ${run.spec.name}`);
            }
          } catch (err) {
            console.error(
              `Error creating JUnit report for ${run.spec.relative}:`,
              err
            );
          }
        });
      }

      // Read accumulated results
      const tempResults: AccumulatedResults = JSON.parse(
        fs.readFileSync(TEMP_RESULTS_PATH, "utf8")
      );

      // Extract testsuites from the current run
      const testsuiteRegex = /<testsuite.*?<\/testsuite>/g;
      let testsuiteMatches: string[] = [];
      let match;
      while ((match = testsuiteRegex.exec(currentXml)) !== null) {
        testsuiteMatches.push(match[0]);
      }

      // Extract info from testsuites element
      const timeMatch = /time="([^"]+)"/.exec(currentXml);
      const testsMatch = /tests="([^"]+)"/.exec(currentXml);
      const failuresMatch = /failures="([^"]+)"/.exec(currentXml);

      // Update accumulated totals
      if (timeMatch) tempResults.testsuites.time += parseFloat(timeMatch[1]);
      if (testsMatch)
        tempResults.testsuites.tests += parseInt(testsMatch[1], 10);
      if (failuresMatch)
        tempResults.testsuites.failures += parseInt(failuresMatch[1], 10);

      // Add new testsuites to accumulated results, avoiding duplicates
      testsuiteMatches.forEach((match) => {
        // Check if this exact testsuite is already in our results
        const isDuplicate = tempResults.testsuites.testsuites.some(
          (existingSuite) => existingSuite === match
        );

        if (!isDuplicate) {
          tempResults.testsuites.testsuites.push(match);
        }
      });

      // Save accumulated results
      fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(tempResults));

      // Generate new combined JUnit XML
      const newXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="${tempResults.testsuites.name}" time="${
        tempResults.testsuites.time
      }" tests="${tempResults.testsuites.tests}" failures="${
        tempResults.testsuites.failures
      }">
  ${tempResults.testsuites.testsuites.join("\n  ")}
</testsuites>`;

      // Write the combined XML back to the JUnit file
      fs.writeFileSync(FINAL_JUNIT_PATH, newXml);

      // Also save with timestamp to preserve history
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.writeFileSync(
        path.join(RESULTS_DIR, `junit-combined-${timestamp}.xml`),
        newXml
      );
    } catch (error) {
      console.error("Error merging JUnit reports:", error);
    }

    return results;
  });

  // Add tasks to manage results
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

    // New task to merge all existing reports into one
    mergeAllJunitReports() {
      try {
        // Get all junit XML files
        const reports = fs
          .readdirSync(RESULTS_DIR)
          .filter(
            (file) =>
              file.startsWith("junit-") &&
              file.endsWith(".xml") &&
              !file.includes("combined")
          );

        let allTestsuites: string[] = [];
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

          return { success: true, reportPath: finalReportPath };
        }

        return { success: false, message: "No test reports found to merge" };
      } catch (error) {
        console.error("Error merging all JUnit reports:", error);
        return { success: false, error: String(error) };
      }
    },
  });
}
