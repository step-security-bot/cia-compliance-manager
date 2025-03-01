// App constants used by both components and tests
// Centralized to avoid duplication and make tests more stable

import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "../hooks/useCIAOptions";
import { CIADetails } from "../types/cia";

// SecurityLevelMap type for cleaner lookups
export type SecurityLevelKey =
  | "NONE"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "VERY_HIGH";
export type SecurityLevelMap<T> = Record<SecurityLevelKey, T>;

/**
 * Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
 * Supports optional transform function to modify values during mapping
 *
 * @param options The source options object (e.g., availabilityOptions)
 * @param key The property key to extract from each option
 * @param transform Optional function to transform the extracted value
 * @returns An object with standardized security level keys
 */
export const mapOptionsToConstants = <
  T extends keyof CIADetails,
  R = CIADetails[T]
>(
  options: Record<string, CIADetails>,
  key: T,
  transform?: (value: CIADetails[T], level: string) => R
) => ({
  NONE: transform ? transform(options.None[key], "None") : options.None[key],
  LOW: transform ? transform(options.Low[key], "Low") : options.Low[key],
  MODERATE: transform
    ? transform(options.Moderate[key], "Moderate")
    : options.Moderate[key],
  HIGH: transform ? transform(options.High[key], "High") : options.High[key],
  VERY_HIGH: transform
    ? transform(options["Very High"][key], "Very High")
    : options["Very High"][key],
});

/**
 * Creates a matcher function for testing that checks if text appears in an element with a specific class
 *
 * @param text Text to look for
 * @param className CSS class the element should have
 * @returns A function that returns true if the element matches both conditions
 */
export const getTextElementMatcher = (text: string, className: string) => {
  return (content: string, element: Element) =>
    element.className.includes(className) &&
    content.includes(getPartialTextMatcher(text));
};

// Exported test helpers - making it easy to do partial matches in tests
export const getPartialTextMatcher = (text: string, length = 15) => {
  return text.substring(0, Math.min(text.length, length));
};

// Helper to create a RegExp from a constant for more robust test matching
export const createRegexMatcher = (text: string) => {
  // Escape special regex characters and return a case-insensitive regex
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
};

// Helper for matching partial content in value descriptions
export const createValuePointMatcher = (point: string) => {
  // Split the point into words and take first 2-3 to make a more robust matcher
  const words = point.split(" ").slice(0, 3).join("\\s+");
  return new RegExp(words, "i");
};

// Export type to help with TypeScript
export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";

// Security Levels
export const SECURITY_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// CIA Component Labels
export const CIA_LABELS = {
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

// Compliance Status Text
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-compliant",
  BASIC_COMPLIANCE: "Meets basic compliance only",
  STANDARD_COMPLIANCE: "Compliant with standard frameworks",
  FULL_COMPLIANCE: "Compliant with all major frameworks",
};

// Status Icons
export const UI_ICONS = {
  // Compliance icons
  NON_COMPLIANT: "❌",
  BASIC_COMPLIANCE: "⚠️",
  STANDARD_COMPLIANCE: "✓",
  FULL_COMPLIANCE: "✅",

  // Security level icons
  SECURITY_NONE: "⚠️",
  SECURITY_LOW: "🔓",
  SECURITY_MODERATE: "🔐",
  SECURITY_HIGH: "🛡️",
  SECURITY_VERY_HIGH: "🔒",
};

// Security Summary Titles - derived from security levels
export const SECURITY_SUMMARY_TITLES = {
  NONE: `${SECURITY_LEVELS.NONE} Security`,
  LOW: `${SECURITY_LEVELS.LOW} Security`,
  MODERATE: `${SECURITY_LEVELS.MODERATE} Security`,
  HIGH: `${SECURITY_LEVELS.HIGH} Security`,
  VERY_HIGH: `${SECURITY_LEVELS.VERY_HIGH} Security`,
};

// Security recommendations for each level
export const SECURITY_RECOMMENDATIONS = {
  NONE: "Not recommended for any production system. Implement basic security controls immediately.",
  LOW: "Only appropriate for non-critical systems with public information.",
  MODERATE:
    "Suitable for internal business systems with some regulatory requirements.",
  HIGH: "Appropriate for systems handling sensitive customer data or financial information.",
  VERY_HIGH:
    "Suitable for mission-critical systems handling top secret information.",
  BASIC: "Only appropriate for non-critical systems with public information.",
};

// Framework descriptions
export const FRAMEWORK_DESCRIPTIONS = {
  SOC2: "Requires basic security controls across CIA triad",
  ISO27001: "Requires moderate security controls and management system",
  PCI_DSS: "Emphasis on strong confidentiality controls",
  HIPAA: "Requires protection of healthcare information",
  NIST: "High security controls for federal information systems",
};

// Security Descriptions - direct hardcoded values to maintain test compatibility
export const SECURITY_DESCRIPTIONS = {
  NONE: "No security controls implemented.",
  LOW: "Basic protection with minimal controls and manual processes.",
  MODERATE:
    "Balanced protection with automated recovery, validation checks, and standard encryption.",
  HIGH: "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
  VERY_HIGH:
    "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
};

// Technical descriptions - for more detailed tooltips - using the helper function
export const TECHNICAL_DESCRIPTIONS = {
  AVAILABILITY: mapOptionsToConstants(availabilityOptions, "technical"),
  INTEGRITY: mapOptionsToConstants(integrityOptions, "technical"),
  CONFIDENTIALITY: mapOptionsToConstants(confidentialityOptions, "technical"),
};

// Impact Analysis Descriptions using enhanced helper
export const IMPACT_DESCRIPTIONS = {
  AVAILABILITY: mapOptionsToConstants(
    availabilityOptions,
    "description",
    (desc, level) => `${desc} - ${availabilityOptions[level].impact}`
  ),
  INTEGRITY: mapOptionsToConstants(
    integrityOptions,
    "description",
    (desc, level) => `${desc} - ${integrityOptions[level].impact}`
  ),
  CONFIDENTIALITY: mapOptionsToConstants(
    confidentialityOptions,
    "description",
    (desc, level) => `${desc} - ${confidentialityOptions[level].impact}`
  ),
};

// Business Impact - using the helper
export const BUSINESS_IMPACTS = {
  AVAILABILITY: mapOptionsToConstants(availabilityOptions, "businessImpact"),
  INTEGRITY: mapOptionsToConstants(integrityOptions, "businessImpact"),
  CONFIDENTIALITY: mapOptionsToConstants(
    confidentialityOptions,
    "businessImpact"
  ),
};

// Value Creation Points
export const VALUE_CREATION_POINTS = {
  NONE: "No security investment means all budget can go to other areas",
  LOW: "Satisfies minimum viable security for non-critical systems",
  MODERATE: "Demonstrates security diligence",
  HIGH: "Enables expansion into regulated markets",
  VERY_HIGH: "Enables participation in classified",
};

// Detailed value creation points by security level
export const DETAILED_VALUE_POINTS = {
  NONE: [
    "No value creation from security perspective",
    "High risk of security incidents with significant business impact",
    "Limited ability to participate in business relationships requiring security",
    "Potential regulatory issues in many industries",
  ],
  LOW: [
    "Minimal upfront costs allow budget allocation elsewhere",
    "Appropriate for public data and low-impact internal systems",
    "Provides basic protection against common threats",
    "Simple implementation with minimal maintenance overhead",
  ],
  MODERATE: [
    "Reduces operational disruptions by 80% compared to Basic level",
    "Prevents common security incidents affecting quarterly performance",
    "Provides competitive advantage over businesses with sub-standard security",
    "Meets requirements for standard business relationships",
  ],
  HIGH: [
    "Provides assurance to high-value customers with stringent requirements",
    "Reduces insurance premiums through demonstrated security",
    "Minimizes breach-related costs (avg. $4.45M per incident)",
    "Supports premium service offerings where security is a differentiator",
  ],
  VERY_HIGH: [
    "Protects irreplaceable intellectual property worth billions",
    "Creates long-term trust with stakeholders including governments",
    "Provides resilience against catastrophic events",
    "Supports premium pricing models based on security guarantees",
  ],
};

// ROI Estimates - consistent format across all values
export const ROI_ESTIMATES = {
  NONE: "Negative (high risk of losses)",
  LOW: "1-2x for basic security implementation",
  MODERATE: "2-3x for standard business operations",
  HIGH: "3-5x when factoring in breach prevention",
  VERY_HIGH: "5-10x for specialized high-security markets",
};

// Cost Analysis Messages
export const COST_ANALYSIS = {
  SMALL_SOLUTION:
    "Basic security implementation with minimal investment. Suitable for small businesses or non-critical systems.",
  LARGE_SOLUTION:
    "Comprehensive security solution requiring significant investment. Recommended for critical systems or regulated industries.",
};

// Framework names
export const COMPLIANCE_FRAMEWORKS = {
  SOC2: "SOC 2 Type 1",
  ISO27001: "ISO 27001",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  NIST: "NIST 800-53 High",
};

// Additional constants for specific UI components (previously in testConstants)
export const DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

// UI Text constants - centralized text for all UI elements
export const UI_TEXT = {
  // Common UI labels
  LABELS: {
    BUSINESS_IMPACT: "Business Impact:",
    RECOMMENDATION: "Recommendation:",
    ESTIMATED_COST: "Estimated Implementation Cost",
    CAPEX: "CAPEX:",
    OPEX: "OPEX:",
    COST_ANALYSIS: "Cost Analysis",
    BUSINESS_VALUE: "Business value derived from this security profile:",
    ESTIMATED_ROI: "Estimated ROI:",
    SECURITY_PROFILE: "Security Profile",
    CURRENT_PROFILE: "Current Profile",
  },

  // Widget titles
  WIDGET_TITLES: {
    SECURITY_LEVEL: "Security Level Selection",
    SECURITY_SUMMARY: "Security Summary",
    RADAR_CHART: "Security Radar",
    COST_ESTIMATION: "Cost Estimation",
    COMPLIANCE_STATUS: "Compliance Status",
    VALUE_CREATION: "Value Creation",
    IMPACT_ANALYSIS: "Impact Analysis",
  },

  // Budget related text
  BUDGET: {
    IT_BUDGET_CAPEX: "of IT budget as one-time capital expenditure",
    IT_BUDGET_OPEX: "of IT budget as annual operational expenses",
  },

  // Security measures
  SECURITY_MEASURES: {
    AVAILABILITY: "Availability",
    INTEGRITY: "Integrity",
    CONFIDENTIALITY: "Confidentiality",
  },

  // Chart labels
  CHART: {
    LABEL_SECURITY_LEVELS: "Security Levels",
    TITLE_SECURITY_PROFILE: "Security Profile",
  },

  // Value creation titles
  VALUE_CREATION: {
    NONE_TITLE: "No Value Creation",
    WITH_LEVEL: (level: string) => `${level} Value Creation`,
  },
};

// Test specific matchers for use in testing UI elements
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
  // Add matchers for security descriptions
  SECURITY_NONE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.NONE),
  SECURITY_LOW_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.LOW),
  SECURITY_MODERATE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.MODERATE),
  SECURITY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.HIGH),
  SECURITY_VERY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.VERY_HIGH),
};

// Add for test data:
export const TEST_DATA = {
  WIDGET: {
    TITLE: "Test Widget",
    CONTENT: "Widget content",
    CUSTOM_CLASS: "test-class",
  },
  MOCK_DESCRIPTIONS: {
    AVAILABILITY: "Custom availability description",
    INTEGRITY: "Custom integrity description",
    CONFIDENTIALITY: "Custom confidentiality description",
  },
  MOCK_OPTIONS: {
    BASE: {
      description: "None",
      impact: "None",
      technical: "None",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    LOW: {
      description: "Low",
      impact: "Low",
      technical: "Low",
      capex: 5,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
    },
  },
};

// Widget Icons - For consistent icon use across the application
export const WIDGET_ICONS = {
  SECURITY_LEVEL: "🛡️",
  BUSINESS_IMPACT: "📊",
  AVAILABILITY_IMPACT: "⚡",
  INTEGRITY_IMPACT: "🔗",
  CONFIDENTIALITY_IMPACT: "🔒",
  VALUE_CREATION: "📈",
  COST_ESTIMATION: "💰",
  SECURITY_VISUALIZATION: "📡",
  COMPLIANCE_STATUS: "✅",
  SECURITY_SUMMARY: "🔍",
  TECHNICAL_IMPLEMENTATION: "⚙️",
};

// Add specific CIA component icons
export const CIA_COMPONENT_ICONS = {
  AVAILABILITY: "⏱️", // Stopwatch for time/availability
  INTEGRITY: "🔐", // Padlock with key for data integrity
  CONFIDENTIALITY: "🔏", // Locked with pen for confidentiality
};

// Security level color scheme
export const SECURITY_LEVEL_COLORS = {
  NONE: "#e74c3c", // Red
  LOW: "#f39c12", // Orange
  MODERATE: "#f1c40f", // Yellow
  HIGH: "#2ecc71", // Green
  VERY_HIGH: "#3498db", // Blue
};
