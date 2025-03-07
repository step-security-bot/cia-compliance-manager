/**
 * Type declarations for merge-reports.js
 */

/**
 * Result object returned by the merge function
 */
interface MergeResult {
  success: boolean;
  reportPath?: string;
  message?: string;
  error?: string;
  stats?: {
    files: number;
    tests: number;
    failures: number;
    time: number;
  };
}

/**
 * Function to merge all JUnit reports into a single consolidated report
 */
export function mergeAllJunitReports(): Promise<MergeResult>;
