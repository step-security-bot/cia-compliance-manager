/**
 * Centralized Test ID constants for component selection in tests
 */

// CIA Component TestIDs
export const CIA_TEST_IDS = {
  // Select dropdown elements
  AVAILABILITY_SELECT: "availability-select",
  INTEGRITY_SELECT: "integrity-select",
  CONFIDENTIALITY_SELECT: "confidentiality-select",

  // Labels and descriptions
  AVAILABILITY_LABEL: "availability-label",
  INTEGRITY_LABEL: "integrity-label",
  CONFIDENTIALITY_LABEL: "confidentiality-label",
  AVAILABILITY_DESCRIPTION: "availability-description",
  INTEGRITY_DESCRIPTION: "integrity-description",
  CONFIDENTIALITY_DESCRIPTION: "confidentiality-description",

  // Sections and indicators
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",
  AVAILABILITY_LEVEL_INDICATOR: "availability-level-indicator",
  INTEGRITY_LEVEL_INDICATOR: "integrity-level-indicator",
  CONFIDENTIALITY_LEVEL_INDICATOR: "confidentiality-level-indicator",
};

// Common widget test IDs
export const WIDGET_TEST_IDS = {
  SECURITY_LEVEL_CONTROLS: "security-level-controls",
  VALUE_CREATION_TITLE: "value-creation-title",
  ROI_VALUE: "roi-value",
  SECURITY_SUMMARY_TITLE: "security-summary-title",
  LOADING_INDICATOR: "loading-indicator",
  DATA_CONTAINER: "data-container",
  CONTENT_TITLE: "content-title",
};

// BusinessImpactAnalysisWidget IDs
export const BUSINESS_IMPACT_TEST_IDS = {
  FINANCIAL_IMPACT_SECTION: "financial-impact-section",
  OPERATIONAL_IMPACT_SECTION: "operational-impact-section",
  REPUTATIONAL_IMPACT_SECTION: "reputational-impact-section",
  REGULATORY_IMPACT_SECTION: "regulatory-impact-section",
  STRATEGIC_IMPACT_SECTION: "strategic-impact-section",
  FINANCIAL_RISK_BADGE: "financial-risk-badge",
};

// ComplianceStatusWidget IDs
export const FRAMEWORK_TEST_IDS = {
  COMPLIANCE_FRAMEWORKS_CONTAINER: "compliance-frameworks-container",
  FRAMEWORK_ITEM_PREFIX: "framework-item",
};

// RadarChart test IDs
export const CHART_TEST_IDS = {
  RADAR_CHART: "radar-chart",
  RADAR_CHART_CONTAINER: "radar-chart-container",
  RADAR_CHART_CANVAS: "radar-chart-canvas",
};

// CostEstimationWidget test IDs
export const COST_TEST_IDS = {
  COST_CONTAINER: "cost-container",
  CAPEX_VALUE: "capex-value",
  OPEX_VALUE: "opex-value",
  TOTAL_COST: "total-cost",
  ROI_ESTIMATE: "roi-estimate",
};

// SecuritySummaryWidget test IDs
export const SUMMARY_TEST_IDS = {
  SUMMARY_CONTAINER: "summary-container",
  OVERALL_RATING: "overall-rating",
  SECURITY_LEVEL_DESCRIPTION: "security-level-description",
  SECURITY_RECOMMENDATIONS: "security-recommendations",
  CIA_RATINGS: "cia-ratings",
};

// App-level test IDs
export const APP_TEST_IDS = {
  APP_CONTAINER: "app-container",
  THEME_TOGGLE: "theme-toggle",
  APP_TITLE: "app-title",
  DASHBOARD_CONTAINER: "dashboard-container",
};

/**
 * Helper to generate dynamic test IDs with consistent patterns
 */
export const getTestId = (prefix: string, id: string): string => {
  return `${prefix}-${id}`;
};

// Export all test IDs in a single object for convenience
export const TEST_IDS = {
  ...CIA_TEST_IDS,
  ...WIDGET_TEST_IDS,
  ...BUSINESS_IMPACT_TEST_IDS,
  ...FRAMEWORK_TEST_IDS,
  ...CHART_TEST_IDS,
  ...COST_TEST_IDS,
  ...SUMMARY_TEST_IDS,
  ...APP_TEST_IDS,
};
