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

export const FORM_SELECTORS = {
  AVAILABILITY_SELECT: `[data-testid="${TEST_IDS.AVAILABILITY_SELECT}"]`,
  INTEGRITY_SELECT: `[data-testid="${TEST_IDS.INTEGRITY_SELECT}"]`,
  CONFIDENTIALITY_SELECT: `[data-testid="${TEST_IDS.CONFIDENTIALITY_SELECT}"]`,
};

export const TEST_COMMANDS = {
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

  verifyText: (selector: string, expectedText: string) => {
    return cy.get(selector).should("contain.text", expectedText);
  },

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

export const SELECTORS = {
  WIDGETS: {
    SECURITY_LEVEL: `[data-testid="${TEST_IDS.SECURITY_LEVEL_CONTROLS}"]`,
    COST_ESTIMATION: `[data-testid="${TEST_IDS.COST_ESTIMATION}"]`,
    VALUE_CREATION: `[data-testid="${TEST_IDS.VALUE_CREATION}"]`,
    SECURITY_SUMMARY: `[data-testid="${TEST_IDS.SECURITY_SUMMARY}"]`,
    BUSINESS_IMPACT: `[data-testid="${TEST_IDS.BUSINESS_IMPACT}"]`,
    RADAR_CHART: `[data-testid="${TEST_IDS.RADAR_CHART}"]`,
    COMPLIANCE_STATUS: `[data-testid="${TEST_IDS.COMPLIANCE_STATUS}"]`,
  },
  CONTROLS: {
    THEME_TOGGLE: `[data-testid="${TEST_IDS.THEME_TOGGLE}"]`,
    APP_CONTAINER: `[data-testid="${TEST_IDS.APP_CONTAINER}"]`,
    APP_TITLE: `[data-testid="${TEST_IDS.APP_TITLE}"]`,
  },
  ...FORM_SELECTORS,
};

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
