// Import from coreConstants instead of businessConstants
import { SECURITY_DESCRIPTIONS, COMPLIANCE_FRAMEWORKS } from "./coreConstants";

// Format constants for consistent display
export const DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

// Test-specific helpers
export const getPartialTextMatcher = (text: string, length = 15) => {
  return text.substring(0, Math.min(text.length, length));
};

export const createRegexMatcher = (text: string) => {
  // Escape special regex characters and return a case-insensitive regex
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
};

export const createValuePointMatcher = (point: string) => {
  const words = point.split(" ").slice(0, 3).join("\\s+");
  return new RegExp(words, "i");
};

export const getTextElementMatcher = (text: string, className: string) => {
  return (content: string, element: Element) =>
    element.className.includes(className) &&
    content.includes(getPartialTextMatcher(text));
};

// Test matchers for UI elements
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
  // Security description matchers
  SECURITY_NONE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.NONE),
  SECURITY_LOW_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.LOW),
  SECURITY_MODERATE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.MODERATE),
  SECURITY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.HIGH),
  SECURITY_VERY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.VERY_HIGH),
};

// Test data
export const TEST_DATA = {
  // ... existing test data ...
};
