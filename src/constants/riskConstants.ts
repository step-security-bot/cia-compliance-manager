/**
 * Shared constants that are needed by both app constants and CIA options
 * Breaking these out helps prevent circular dependencies
 */

// Risk constants for the application
export const RISK_LEVELS = {
  LOW: "Low Risk",
  MEDIUM: "Medium Risk",
  HIGH: "High Risk",
  CRITICAL: "Critical Risk",
  MINIMAL: "Minimal Risk",
  UNKNOWN: "Unknown Risk",
};

// Business impact categories
export const BUSINESS_IMPACT_CATEGORIES = {
  FINANCIAL: "financial",
  OPERATIONAL: "operational",
  REPUTATIONAL: "reputational",
  REGULATORY: "regulatory",
  STRATEGIC: "strategic",
};
