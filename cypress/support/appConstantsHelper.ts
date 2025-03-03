// Export app constants for Cypress to use in tests
// Updated with more flexible patterns and multiple options

export const SECURITY_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// Add RISK_LEVELS if it doesn't already exist
export const RISK_LEVELS = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  NEGLIGIBLE: "Negligible",
};

// Add the missing COMPLIANCE_STATUS export
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-Compliant",
  BASIC_COMPLIANCE: "Basic Compliance",
  STANDARD_COMPLIANCE: "Standard Compliance",
  FULL_COMPLIANCE: "Full Compliance",
};

// Description texts exactly as they appear in the application
// These match the values in useCIAOptions.ts
export const DESCRIPTIONS = {
  AVAILABILITY: {
    NONE: "No availability controls implemented",
    LOW: "Basic backup & restore capability",
    MODERATE: "Pilot light recovery capability",
    HIGH: "Warm standby with fast recovery",
    VERY_HIGH: "Multi-site active/active deployment",
  },
  INTEGRITY: {
    NONE: "No integrity controls implemented",
    LOW: "Manual data validation",
    MODERATE: "Automated data validation",
    HIGH: "Blockchain validation with immutable records",
    VERY_HIGH: "Smart contract validation",
  },
  CONFIDENTIALITY: {
    NONE: "No confidentiality controls implemented",
    LOW: "Basic access controls",
    MODERATE: "Standard encryption and access management",
    HIGH: "Enhanced security with MFA and monitoring",
    VERY_HIGH: "Military-grade protection",
  },
};

// Cost percentage values from the application's options
export const COST_VALUES = {
  CAPEX: {
    NONE: 0,
    LOW: 5,
    MODERATE: 15,
    HIGH: 25, // For availability
    HIGH_INTEGRITY: 35, // For integrity
    HIGH_CONFIDENTIALITY: 30, // For confidentiality
    VERY_HIGH: 60,
  },
  OPEX: {
    NONE: 0,
    LOW: 5,
    MODERATE: 15,
    HIGH: 40, // For availability
    HIGH_INTEGRITY: 50, // For integrity
    HIGH_CONFIDENTIALITY: 40, // For confidentiality
    VERY_HIGH: 70,
  },
};

// Common UI text in the application
export const UI_TEXT = {
  HEADERS: {
    COST_ESTIMATION: "Cost Estimation",
    COST_ANALYSIS: "Cost Analysis",
  },
  // Multiple possibilities for app title
  APP_TITLES: [
    "CIA Compliance Manager",
    "CIA Compliance Manager Dashboard",
    "CIA Classification",
    "Compliance Manager",
  ],
  // Multiple possible theme toggle patterns
  THEME_TOGGLE: {
    PATTERNS: [/Dark Mode/i, /Light Mode/i, /🌙/, /☀️/, /Theme/i, /Mode/i],
  },
  // Common text patterns that should be in the app
  COMMON_PATTERNS: {
    SECURITY: /security/i,
    COMPLIANCE: /compliance/i,
    CIA: /CIA/i,
    DASHBOARD: /dashboard/i,
    HIGH: /high/i,
    MODERATE: /moderate/i,
    LOW: /low/i,
  },
};

// More resilient selectors with fallbacks
export const TEST_SELECTORS = {
  // Primary selectors with data-testid
  PRIMARY: {
    DASHBOARD: "[data-testid='dashboard-grid']",
    THEME_TOGGLE: "[data-testid='theme-toggle']",
    SECURITY_LEVEL_CONTROLS: "[data-testid='security-level-controls']",
    SECURITY_SUMMARY: "[data-testid='widget-security-summary']",
  },
  // Fallback selectors using common patterns
  FALLBACKS: {
    SELECTS: "select",
    BUTTONS: "button",
    WIDGETS: ".widget, [class*='widget'], [class*='card'], .card",
  },
  SECURITY_WIDGET: '[data-testid="widget-security-level-selection"]',
  SECURITY_CONTROLS: '[data-testid="security-level-controls"]',
  AVAILABILITY_SELECT: '[data-testid="availability-select"]',
  INTEGRITY_SELECT: '[data-testid="integrity-select"]',
  CONFIDENTIALITY_SELECT: '[data-testid="confidentiality-select"]',
};

// Robust test commands with error handling
export const TEST_COMMANDS = {
  // Set security level with fallback methods
  setSecurityLevel: (category: string, level: string) => {
    let index = 0;
    if (category === "integrity") index = 1;
    if (category === "confidentiality") index = 2;

    return cy
      .get("select")
      .eq(index)
      .then(($el) => {
        if ($el.length) {
          cy.wrap($el).select(level, { force: true, timeout: 5000 });
        } else {
          cy.log(`No select found for ${category}`);
        }
      });
  },

  // Check for any text on the page containing pattern
  checkTextContent: (pattern: string | RegExp) => {
    return cy
      .get("body")
      .invoke("text")
      .should(
        "match",
        pattern instanceof RegExp ? pattern : new RegExp(pattern, "i")
      );
  },
};

/**
 * Constants for Cypress tests to ensure alignment with application constants
 * Avoids importing directly from application code to prevent potential conflicts
 */

// Export as namespaces to avoid redeclaration errors
export namespace CypressConstants {
  // Security Levels
  export const SECURITY_LEVELS = {
    NONE: "None",
    LOW: "Low",
    MODERATE: "Moderate",
    HIGH: "High",
    VERY_HIGH: "Very High",
  };

  // UI Text Constants
  export const UI_TEXT = {
    APP_TITLES: ["CIA Compliance Manager", "CIA Compliance Manager Dashboard"],
    LABELS: {
      SECURITY: "Security",
      AVAILABILITY: "Availability",
      INTEGRITY: "Integrity",
      CONFIDENTIALITY: "Confidentiality",
      COMPLIANCE: "Compliance",
      IMPACT: "Impact",
      COSTS: "Cost",
      BUSINESS_VALUE: "Value",
    },
    THEMES: {
      DARK: "Dark Mode",
      LIGHT: "Light Mode",
    },
    STATUSES: {
      NON_COMPLIANT: "Meets no compliance requirements",
      BASIC_COMPLIANCE: "Meets basic compliance only",
      STANDARD_COMPLIANCE: "Meets standard compliance",
      FULL_COMPLIANCE: "Compliant with all major frameworks",
    },
    SECURITY_SUMMARY: {
      NONE: "None Security",
      LOW: "Low Security",
      MODERATE: "Moderate Security",
      HIGH: "High Security",
      VERY_HIGH: "Very High Security",
    },
  };

  // Test Element IDs
  export const TEST_IDS = {
    WIDGETS: {
      SECURITY_LEVEL: "security-level-controls",
      COMPLIANCE_STATUS: "compliance-status-widget",
      RADAR_CHART: "radar-chart",
      SECURITY_SUMMARY: "security-summary-container",
      TECHNICAL_IMPLEMENTATION: "widget-technical-implementation",
      COST_ESTIMATION: "cost-estimation-content",
      BUSINESS_IMPACT: "business-impact-analysis",
    },
    SELECTORS: {
      AVAILABILITY: "availability-select",
      INTEGRITY: "integrity-select",
      CONFIDENTIALITY: "confidentiality-select",
    },
    STATUS: {
      COMPLIANCE_TEXT: "compliance-status-text",
      COMPLIANCE_PERCENTAGE: "compliance-percentage",
      PROGRESS_BAR: "compliance-progress-bar",
    },
    FRAMEWORKS: {
      LIST: "compliance-frameworks-list",
      SOC2: "framework-status-soc-2-type-1",
      ISO27001: "framework-status-iso-27001",
      PCI_DSS: "framework-status-pci-dss",
      HIPAA: "framework-status-hipaa",
      NIST: "framework-status-nist-800-53-high",
    },
  };

  // Description Text Samples
  export const DESCRIPTIONS = {
    AVAILABILITY: {
      HIGH: "Systems remain available with redundant components",
    },
    INTEGRITY: {
      MODERATE: "Hash verification and automated validation",
    },
    CONFIDENTIALITY: {
      LOW: "Basic access controls and limited encryption",
    },
  };
}

// Export all constants as a default object for easier importing
export default CypressConstants;
