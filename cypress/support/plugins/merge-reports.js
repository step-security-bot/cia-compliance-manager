import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESULTS_DIR = path.join(process.cwd(), "cypress", "results");

/**
 * Merge all JUnit reports in the results directory
 */
export function mergeAllJunitReports() {
  try {
    // Ensure directory exists
    if (!fs.existsSync(RESULTS_DIR)) {
      console.log(`Creating results directory: ${RESULTS_DIR}`);
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
    }

    // Get all junit XML files
    const reports = fs
      .readdirSync(RESULTS_DIR)
      .filter(
        (file) =>
          file.startsWith("junit-") &&
          file.endsWith(".xml") &&
          !file.includes("combined")
      );

    if (reports.length === 0) {
      console.log("No JUnit reports found to merge.");
      return { success: false, message: "No test reports found to merge" };
    }

    console.log(`Found ${reports.length} JUnit report(s) to merge.`);

    let allTestsuites = [];
    let totalTime = 0;
    let totalTests = 0;
    let totalFailures = 0;

    // Extract and combine data from all reports
    reports.forEach((reportFile) => {
      const reportPath = path.join(RESULTS_DIR, reportFile);
      console.log(`Processing: ${reportFile}`);

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
      console.log(`  - Total test suites: ${allTestsuites.length}`);
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

    console.log("No test suites found in the reports.");
    return { success: false, message: "No test suites found to merge" };
  } catch (error) {
    console.error("Error merging all JUnit reports:", error);
    return { success: false, error: String(error) };
  }
}

// Execute the merge function when this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = mergeAllJunitReports();
  if (!result.success) {
    process.exit(1);
  }
}
