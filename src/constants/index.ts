// Centralized export point for all constants - simplified and organized

// Import from individual constant files
import * as coreConstants from "./coreConstants";
import * as businessConstants from "./businessConstants";
import * as riskConstants from "./riskConstants";
import * as uiConstants from "./uiConstants";
import * as appLabels from "./appLabels";

// Re-export all constants with clear namespacing
export const {
  // Core constant exports
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

export const {
  // Business constants
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  BUSINESS_VALUE_METRICS,
  VALUE_CREATION_POINTS,
  DETAILED_VALUE_POINTS,
} = businessConstants;

export const {
  // Risk constants
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
} = riskConstants;

// Add missing UI constants if needed
export const { BUSINESS_IMPACT_ICONS } = uiConstants;

// Export types
export type { SecurityLevelKey, SecurityLevelMap } from "./coreConstants";

// Testing helpers - expose these so they're available for tests
export const TEST_CONSTANTS = {
  // Add test-specific constants here
  DISPLAY_FORMAT: {
    CURRENCY_PREFIX: "$",
    PERCENTAGE_SUFFIX: "%",
    DECIMAL_PLACES: 2,
  },
};
