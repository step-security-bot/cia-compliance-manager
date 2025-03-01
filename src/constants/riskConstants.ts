/**
 * Shared constants that are needed by both app constants and CIA options
 * Breaking these out helps prevent circular dependencies
 */

// Risk levels for business impact
export const RISK_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

// Business impact categories
export const BUSINESS_IMPACT_CATEGORIES = {
  FINANCIAL: "Financial",
  OPERATIONAL: "Operational",
  REPUTATIONAL: "Reputational",
  REGULATORY: "Regulatory",
  STRATEGIC: "Strategic",
};
