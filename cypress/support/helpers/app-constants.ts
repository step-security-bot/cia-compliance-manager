/**
 * Application constants specifically for tests
 */
import {
  SECURITY_LEVELS,
  UI_TEXT,
  TEST_SELECTORS,
  TEST_COMMANDS,
} from "../appConstantsHelper";

// Export the usable constants
export { SECURITY_LEVELS, UI_TEXT, TEST_SELECTORS, TEST_COMMANDS };

// Add test-specific patterns to help with content identification
export const TEST_PATTERNS = {
  // Availability patterns
  AVAILABILITY: [
    /availability/i,
    /uptime/i,
    /downtime/i,
    /recovery/i,
    /disruption/i,
  ],

  // Integrity patterns
  INTEGRITY: [/integrity/i, /accuracy/i, /valid/i, /corrupt/i, /tamper/i],

  // Confidentiality patterns
  CONFIDENTIALITY: [
    /confidential/i,
    /sensitive/i,
    /privacy/i,
    /protect/i,
    /access/i,
  ],

  // Cost patterns
  COST: [
    /cost/i,
    /budget/i,
    /capex/i,
    /opex/i,
    /estimate/i,
    /%/, // Percentage symbols
    /\$/, // Dollar signs
  ],

  // Compliance patterns
  COMPLIANCE: [
    /compliance/i,
    /status/i,
    /requirement/i,
    /standard/i,
    /regulation/i,
  ],
};

// Helper function to check if text contains any of the patterns
export const matchesAnyPattern = (
  text: string,
  patterns: RegExp[]
): boolean => {
  return patterns.some((pattern) => pattern.test(text));
};

// Helper function to get a subset of text around a matching pattern
export const getTextAroundPattern = (
  text: string,
  pattern: RegExp,
  context = 50
): string => {
  const match = pattern.exec(text);
  if (!match) return "";

  const start = Math.max(0, match.index - context);
  const end = Math.min(text.length, match.index + match[0].length + context);

  return `...${text.substring(start, end)}...`;
};
