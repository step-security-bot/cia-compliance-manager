/**
 * Helper file to provide access to application constants for Cypress tests
 * This helps avoid direct imports from src/ which can cause issues in Cypress
 */
export const SECURITY_LEVELS = {
  NONE: "None",
  LOW: "Low",
  BASIC: "Basic",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// Additional helper functions for Cypress tests
export function getSecurityLevelByValue(value: string): string {
  // Convert value to key in SECURITY_LEVELS object
  const key = Object.keys(SECURITY_LEVELS).find(
    (key) => SECURITY_LEVELS[key as keyof typeof SECURITY_LEVELS] === value
  );
  return key ? SECURITY_LEVELS[key as keyof typeof SECURITY_LEVELS] : value;
}

// Add test helpers for interacting with security level selectors
export const CIA_SELECTORS = {
  AVAILABILITY_SELECT: "#availability-select",
  INTEGRITY_SELECT: "#integrity-select",
  CONFIDENTIALITY_SELECT: "#confidentiality-select",
};
