// Centralized export point for all constants

// Use named exports instead of wildcard exports to avoid ambiguity

// Import core constants
import * as coreConstants from "./coreConstants";

// Import business constants
import * as businessConstants from "./businessConstants";

// Import risk constants
import * as riskConstants from "./riskConstants";

// Import app constants
import * as appConstants from "./appConstants";

// Import app labels
import * as appLabels from "./appLabels";

// Re-export everything from riskConstants directly since it's small and fundamental
export * from "./riskConstants";

// Export specific constants from each file with explicit resolution
// Core constants - Prefer these versions over duplicates
export const {
  WIDGET_ICONS,
  WIDGET_TITLES,
  SECURITY_LEVELS,
  SECURITY_LEVEL_COLORS,
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  SECURITY_DESCRIPTIONS,
  IMPLEMENTATION_COSTS,
  UI_TEXT,
} = coreConstants;

// Add type exports separately:
export type { SecurityLevelKey, SecurityLevelMap } from "./coreConstants";

// Business constants - No duplication with core constants
export const {
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  BUSINESS_VALUE_METRICS,
} = businessConstants;

// App constants - Specific testing and app utilities
export const {
  getTextElementMatcher,
  getPartialTextMatcher,
  createRegexMatcher,
  createValuePointMatcher,
  mapOptionsToConstants,
  BUSINESS_IMPACT_ICONS,
  TEST_MATCHERS,
  TEST_DATA,
  DISPLAY_FORMAT,
} = appConstants;

// App labels - Only export if needed elsewhere
export const { UI_LABELS } = appLabels;

// Only export these if they are uniquely defined in their respective files
// and not already exported above
export const { VALUE_CREATION_POINTS, DETAILED_VALUE_POINTS } =
  // Prefer business constants version, but fallback to app constants
  businessConstants.VALUE_CREATION_POINTS ? businessConstants : appConstants;
