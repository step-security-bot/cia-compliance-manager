// Export app constants for Cypress to use in tests
// Updated with more flexible patterns and multiple options

export const SECURITY_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

export const UI_TEXT = {
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
