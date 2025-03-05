// Import and re-export application constants for Cypress tests

// Use direct imports from src/constants
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  SECURITY_DESCRIPTIONS,
  WIDGET_ICONS,
  UI_TEXT,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
  TEST_IDS,
} from "../../src/constants";

// Re-export everything for use in Cypress tests
export {
  SECURITY_LEVELS,
  CIA_LABELS,
  SECURITY_DESCRIPTIONS,
  WIDGET_ICONS,
  UI_TEXT,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
  TEST_IDS,
};

// Add test-specific selectors for individual form controls
export const FORM_SELECTORS = {
  AVAILABILITY_SELECT: '[data-testid="availability-select"]',
  INTEGRITY_SELECT: '[data-testid="integrity-select"]',
  CONFIDENTIALITY_SELECT: '[data-testid="confidentiality-select"]',
};

// Add Cypress-specific test commands
export const TEST_COMMANDS = {
  // Set security level using the imported constants
  setSecurityLevel: (category: string, level: keyof typeof SECURITY_LEVELS) => {
    const testIdMap: Record<string, string> = {
      availability: TEST_IDS.AVAILABILITY_SELECT,
      integrity: TEST_IDS.INTEGRITY_SELECT,
      confidentiality: TEST_IDS.CONFIDENTIALITY_SELECT,
    };

    const testId = testIdMap[category.toLowerCase()];
    if (testId) {
      return cy.get(`[data-testid="${testId}"]`).select(SECURITY_LEVELS[level]);
    }

    cy.log(`No selector found for ${category}`);
    return cy;
  },

  // Verify text content against constants
  verifyText: (selector: string, expectedText: string) => {
    return cy.get(selector).should("contain.text", expectedText);
  },

  // Verify security level selection
  verifySecurityLevel: (category: string, expectedLevel: string) => {
    const testIdMap: Record<string, string> = {
      availability: TEST_IDS.AVAILABILITY_SELECT,
      integrity: TEST_IDS.INTEGRITY_SELECT,
      confidentiality: TEST_IDS.CONFIDENTIALITY_SELECT,
    };

    const testId = testIdMap[category.toLowerCase()];
    if (testId) {
      return cy
        .get(`[data-testid="${testId}"]`)
        .should("have.value", expectedLevel);
    }

    cy.log(`No selector found for ${category}`);
    return cy;
  },
};

// Common element selectors
export const SELECTORS = {
  WIDGETS: {
    SECURITY_LEVEL: `[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`,
    COST_ESTIMATION: `[data-testid="widget-cost-estimation"]`,
    VALUE_CREATION: `[data-testid="widget-value-creation"]`,
    SECURITY_SUMMARY: `[data-testid="widget-security-summary"]`,
    BUSINESS_IMPACT: `[data-testid="widget-business-impact"]`,
    RADAR_CHART: `[data-testid="widget-radar-chart"]`,
    COMPLIANCE_STATUS: `[data-testid="widget-compliance-status"]`,
  },
  CONTROLS: {
    THEME_TOGGLE: `[data-testid="${TEST_IDS.THEME_TOGGLE}"]`,
    APP_CONTAINER: `[data-testid="${TEST_IDS.APP_CONTAINER}"]`,
    APP_TITLE: `[data-testid="${TEST_IDS.APP_TITLE}"]`,
  },
  // Add direct references to form controls
  ...FORM_SELECTORS,
};

// Test patterns for content identification
export const TEST_PATTERNS = {
  AVAILABILITY: [/availability/i, /uptime/i, /downtime/i, /recovery/i],
  INTEGRITY: [/integrity/i, /accuracy/i, /valid/i, /corrupt/i, /tamper/i],
  CONFIDENTIALITY: [/confidential/i, /sensitive/i, /privacy/i, /protect/i],
  COST: [/cost/i, /budget/i, /capex/i, /opex/i, /estimate/i, /%/, /\$/],
  COMPLIANCE: [
    /compliance/i,
    /status/i,
    /requirement/i,
    /standard/i,
    /regulation/i,
  ],
};
