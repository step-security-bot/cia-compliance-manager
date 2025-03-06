import fs from "fs-extra";
import path from "path";

export const resetJunitResults = async () => {
  const junitReportDir = "cypress/results";
  try {
    // Ensure directory exists
    await fs.ensureDir(junitReportDir);

    // Instead of just deleting the main combined report, make a backup first
    const mainReportPath = path.join(junitReportDir, "junit.xml");
    if (await fs.pathExists(mainReportPath)) {
      // Create a timestamped backup copy
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupPath = path.join(
        junitReportDir,
        `junit-backup-${timestamp}.xml`
      );

      // Copy the file before removing it
      await fs.copy(mainReportPath, backupPath);
      console.log(`Backed up main JUnit report to: ${backupPath}`);

      // Now remove the original file
      await fs.unlink(mainReportPath);
    }

    // Also remove the temp results file that tracks accumulated data
    const tempResultsPath = path.join(junitReportDir, "temp-results.json");
    if (await fs.pathExists(tempResultsPath)) {
      await fs.unlink(tempResultsPath);
    }

    // But leave individual test report files in place

    console.log(
      `JUnit results reset: Backed up and reset main report while preserving individual test reports`
    );
    return null; // Return null to indicate task completion
  } catch (err) {
    console.error(`Failed to reset JUnit results: ${err}`);
    throw err;
  }
};
