// Central export file for all constants – use explicit exports to resolve duplicates

// Export appConstants (avoid duplicate members by not using * re-export)
export { WIDGET_ICONS } from "./appConstants";

// Export core constants
export {
  SECURITY_LEVEL_COLORS,
  COMPLIANCE_STATUS,
  COMPLIANCE_FRAMEWORKS,
  SECURITY_LEVELS,
  CIA_LABELS,
} from "./coreConstants";

// Export test constants
export {
  DISPLAY_FORMAT,
  TEST_DISPLAY_FORMAT,
  getPartialTextMatcher,
  createRegexMatcher,
  createValuePointMatcher,
  getTextElementMatcher,
  TEST_MATCHERS,
  CIA_TEST_IDS,
  TEST_CIA_LEVELS,
  TEST_HELPERS,
  TEST_DATA,
} from "./testConstants";

// Export risk constants
export * from "./riskConstants";

// Export value creation points and business details manually if not already exported above
export const VALUE_CREATION_POINTS = {
  NONE: ["No specific value creation", "Basic security awareness"],
  LOW: [
    "Meets minimum security expectations",
    "Basic protection against common threats",
    "Suitable for non-sensitive public data",
  ],
  MODERATE: [
    "Compliance with standard security frameworks",
    "Protection against most common attack vectors",
    "Suitable for internal business data",
  ],
  HIGH: [
    "Comprehensive security coverage",
    "Strong protection of business operations",
    "Suitable for sensitive customer data",
    "Enables operation in regulated industries",
  ],
  VERY_HIGH: [
    "Maximum security assurance",
    "Enterprise-grade protection",
    "Suitable for highly sensitive data",
    "Meets requirements for critical infrastructure",
    "Future-proofed against emerging threats",
  ],
};

export const BUSINESS_CONSIDERATIONS = {
  AVAILABILITY: {
    NONE: [
      {
        type: "Financial",
        risk: "CRITICAL",
        description: "Complete revenue loss during outages",
      },
      {
        type: "Operational",
        risk: "CRITICAL",
        description: "Business operations cease during downtime",
      },
    ],
    LOW: [
      {
        type: "Financial",
        risk: "HIGH",
        description: "Significant revenue impact during outages",
      },
      {
        type: "Operational",
        risk: "HIGH",
        description: "Major business disruptions during downtime",
      },
    ],
    MODERATE: [
      {
        type: "Financial",
        risk: "MEDIUM",
        description: "Moderate revenue impact during scheduled maintenance",
      },
      {
        type: "Operational",
        risk: "MEDIUM",
        description: "Some business processes affected during maintenance",
      },
    ],
    HIGH: [
      {
        type: "Financial",
        risk: "LOW",
        description: "Minimal revenue impact from brief outages",
      },
      {
        type: "Operational",
        risk: "LOW",
        description: "Business processes continue with minimal disruption",
      },
    ],
    VERY_HIGH: [
      {
        type: "Financial",
        risk: "LOW",
        description: "Negligible revenue impact",
      },
      {
        type: "Operational",
        risk: "LOW",
        description: "Seamless business continuity",
      },
    ],
  },
  INTEGRITY: {
    NONE: [
      {
        type: "Financial",
        risk: "CRITICAL",
        description: "Severe financial losses from corrupt data",
      },
      {
        type: "Regulatory",
        risk: "CRITICAL",
        description: "Non-compliance with data integrity regulations",
      },
    ],
    LOW: [
      {
        type: "Financial",
        risk: "HIGH",
        description:
          "Potential financial inaccuracies due to occasional data errors",
      },
      {
        type: "Regulatory",
        risk: "HIGH",
        description:
          "Risk of non-compliance with integrity requirements on sporadic basis",
      },
    ],
    MODERATE: [
      {
        type: "Financial",
        risk: "MEDIUM",
        description:
          "Moderate financial impact due to detected and correctable data issues",
      },
      {
        type: "Regulatory",
        risk: "MEDIUM",
        description:
          "Meets basic statutory requirements despite minor data issues",
      },
    ],
    HIGH: [
      {
        type: "Financial",
        risk: "LOW",
        description:
          "Minimal financial impact; most data errors are detected and corrected promptly",
      },
      {
        type: "Regulatory",
        risk: "LOW",
        description:
          "Fully compliant with data integrity standards with robust checks",
      },
    ],
    VERY_HIGH: [
      {
        type: "Financial",
        risk: "LOW",
        description: "Protected from financial losses due to data corruption",
      },
      {
        type: "Regulatory",
        risk: "LOW",
        description:
          "Exceeds all regulatory requirements for data integrity controls",
      },
    ],
  },
  CONFIDENTIALITY: {
    NONE: [
      {
        type: "Reputational",
        risk: "CRITICAL",
        description: "Severe brand damage from data leaks",
      },
      {
        type: "Regulatory",
        risk: "CRITICAL",
        description: "Non-compliance with privacy regulations",
      },
    ],
    LOW: [
      {
        type: "Reputational",
        risk: "HIGH",
        description: "Sensitive data may be exposed",
      },
      {
        type: "Regulatory",
        risk: "HIGH",
        description: "May violate basic privacy requirements",
      },
    ],
    MODERATE: [
      {
        type: "Reputational",
        risk: "MEDIUM",
        description: "Most sensitive data protected",
      },
      {
        type: "Regulatory",
        risk: "MEDIUM",
        description:
          "Complies with standard data protection and privacy regulations",
      },
    ],
    HIGH: [
      {
        type: "Reputational",
        risk: "LOW",
        description: "Strong protection for sensitive data",
      },
      {
        type: "Regulatory",
        risk: "LOW",
        description: "Meets stringent privacy requirements",
      },
    ],
    VERY_HIGH: [
      {
        type: "Reputational",
        risk: "LOW",
        description: "Maximum protection for sensitive information",
      },
      {
        type: "Regulatory",
        risk: "LOW",
        description:
          "Exceeds all standards for confidentiality and privacy regulations",
      },
    ],
  },
};

// Keep adding any missing business-related constants that might be needed
export const BUSINESS_KEY_BENEFITS = {
  NONE: [],
  LOW: [
    "Basic protection against common threats",
    "Minimal baseline for business operations",
  ],
  MODERATE: [
    "Clear visibility into security requirements",
    "Quantifiable metrics for security investments",
    "Documentation for compliance requirements",
  ],
  HIGH: [
    "Strong security posture appropriate for most enterprises",
    "Competitive advantage in security-conscious markets",
    "Rapid incident recovery capabilities",
  ],
  VERY_HIGH: [
    "Maximum protection against advanced threats",
    "Business differentiation in high-security industries",
    "Future-proofed against emerging security challenges",
  ],
};
