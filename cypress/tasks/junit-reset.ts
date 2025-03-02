import fs from "fs-extra";

export const resetJunitResults = async () => {
  const junitReportDir = "cypress/results";
  try {
    await fs.emptyDir(junitReportDir);
    console.log(
      `Successfully reset JUnit results directory: ${junitReportDir}`
    );
    return null; // Return null to indicate task completion
  } catch (err) {
    console.error(`Failed to reset JUnit results directory: ${err}`);
    throw err;
  }
};
