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

export function junitMerger(
  on: PluginEvents,
  config: PluginConfigOptions
): void {
  on("after:run", (results: any) => {
    try {
      if (!fs.existsSync(FINAL_JUNIT_PATH)) {
        // If no JUnit file exists yet, just return - the default reporter will create it
        return results;
      }

      // Read the current run's JUnit XML
      const currentXml = fs.readFileSync(FINAL_JUNIT_PATH, "utf8");

      // Read accumulated results
      const tempResults: AccumulatedResults = JSON.parse(
        fs.readFileSync(TEMP_RESULTS_PATH, "utf8")
      );

      // Fix regular expression flag issue
      const testsuiteRegex = /<testsuite.*?<\/testsuite>/g;
      // Use a different approach to match all occurrences
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

      // Add testsuites to accumulated results
      testsuiteMatches.forEach((match) => {
        tempResults.testsuites.testsuites.push(match);
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
    } catch (error) {
      console.error("Error merging JUnit reports:", error);
    }

    return results;
  });

  // Add a task to reset the accumulated results before a new test run
  on("task", {
    resetJunitResults() {
      if (fs.existsSync(TEMP_RESULTS_PATH)) {
        fs.unlinkSync(TEMP_RESULTS_PATH);
      }
      fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(initialResults));
      return null;
    },
  });
}
