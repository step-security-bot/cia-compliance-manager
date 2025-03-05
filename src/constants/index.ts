// Central export file for all constants

// Export core constants - these are our base constants
export * from "./coreConstants";

// Export risk constants directly (no conflicts with other files)
export * from "./riskConstants";

// Export test IDs (no conflicts)
export * from "./testIds";

// Named exports to avoid ambiguity
import * as AppConstants from "./appConstants";
import * as BusinessConstants from "./businessConstants";
import * as UIConstants from "./uiConstants";

// Re-export specific constants with namespaces to prevent conflicts
export { AppConstants, BusinessConstants, UIConstants };

// Export business impact types (removing BusinessKeyBenefits from here to avoid duplication)
export type {
  BusinessConsideration,
  BusinessConsiderations,
} from "../types/businessImpact";

// Re-export specific constants from businessImpact.ts
// BusinessKeyBenefits is exported as both a value and its type will be inferred
export {
  BUSINESS_CONSIDERATIONS,
  BusinessKeyBenefits,
} from "../types/businessImpact";

// Export the BUSINESS_IMPACT_CATEGORIES and RISK_LEVELS directly from riskConstants
// to make them available at the top level since they're frequently used
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

// Export BUSINESS_IMPACT_ICONS directly from uiConstants
export { BUSINESS_IMPACT_ICONS } from "./uiConstants";
