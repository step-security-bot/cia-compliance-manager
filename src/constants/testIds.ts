/**
 * Centralized Test ID constants for component selection in tests
 * Using these constants instead of hardcoded strings ensures consistency and maintainability
 */

// SecurityLevelWidget - CIA Component TestIDs
// These IDs are used in the SecurityLevelWidget component which manages the
// Confidentiality, Integrity, and Availability (CIA) triad security level selections
export const CIA_TEST_IDS = {
  // Select dropdown elements - found in the SecurityLevelWidget form controls
  AVAILABILITY_SELECT: "availability-select", // Dropdown for selecting availability level
  INTEGRITY_SELECT: "integrity-select", // Dropdown for selecting integrity level
  CONFIDENTIALITY_SELECT: "confidentiality-select", // Dropdown for selecting confidentiality level

  // Label elements - Text labels next to each dropdown in SecurityLevelWidget
  AVAILABILITY_LABEL: "availability-label", // "Availability" text label
  INTEGRITY_LABEL: "integrity-label", // "Integrity" text label
  CONFIDENTIALITY_LABEL: "confidentiality-label", // "Confidentiality" text label

  // Description text elements - Explanatory text below each dropdown
  AVAILABILITY_DESCRIPTION: "availability-description", // Description of selected availability level
  INTEGRITY_DESCRIPTION: "integrity-description", // Description of selected integrity level
  CONFIDENTIALITY_DESCRIPTION: "confidentiality-description", // Description of selected confidentiality level

  // Container sections - Wrapper divs for each CIA component section
  AVAILABILITY_SECTION: "availability-section", // Container for all availability-related elements
  INTEGRITY_SECTION: "integrity-section", // Container for all integrity-related elements
  CONFIDENTIALITY_SECTION: "confidentiality-section", // Container for all confidentiality-related elements

  // Visual indicators - Color-coded indicators showing selected security levels
  AVAILABILITY_LEVEL_INDICATOR: "availability-level-indicator", // Color badge for availability level
  INTEGRITY_LEVEL_INDICATOR: "integrity-level-indicator", // Color badge for integrity level
  CONFIDENTIALITY_LEVEL_INDICATOR: "confidentiality-level-indicator", // Color badge for confidentiality level
};

// Common widget test IDs - Used across multiple widget components
export const WIDGET_TEST_IDS = {
  // SecurityLevelWidget - Main controls container
  SECURITY_LEVEL_CONTROLS: "security-level-controls", // Container for the entire security level selection form

  // ValueCreationWidget - Value proposition elements
  VALUE_CREATION_TITLE: "value-creation-title", // Title at the top of the ValueCreationWidget
  ROI_VALUE: "roi-value", // ROI value display in the ValueCreationWidget

  // SecuritySummaryWidget - Summary elements
  SECURITY_SUMMARY_TITLE: "security-summary-title", // Title at the top of the SecuritySummaryWidget

  // Loading states - Used in multiple components with async data
  LOADING_INDICATOR: "loading-indicator", // Spinner or progress indicator while loading
  DATA_CONTAINER: "data-container", // Container that appears after data is loaded

  // Common element types
  CONTENT_TITLE: "content-title", // Generic title element in widget content areas
};

// BusinessImpactAnalysisWidget - Impact analysis sections by category
export const BUSINESS_IMPACT_TEST_IDS = {
  // Impact category sections - Container divs for each impact category
  FINANCIAL_IMPACT_SECTION: "financial-impact-section", // Financial impact analysis section
  OPERATIONAL_IMPACT_SECTION: "operational-impact-section", // Operational impact analysis section
  REPUTATIONAL_IMPACT_SECTION: "reputational-impact-section", // Reputational impact analysis section
  REGULATORY_IMPACT_SECTION: "regulatory-impact-section", // Regulatory impact analysis section
  STRATEGIC_IMPACT_SECTION: "strategic-impact-section", // Strategic impact analysis section

  // Risk level badges - Colored badges showing risk levels
  FINANCIAL_RISK_BADGE: "financial-risk-badge", // Risk level indicator for financial impact
};

// ComplianceStatusWidget - Compliance framework elements
export const FRAMEWORK_TEST_IDS = {
  // Container for all framework items
  COMPLIANCE_FRAMEWORKS_CONTAINER: "compliance-frameworks-container", // Main container for compliance frameworks

  // Base ID for individual framework items (append framework ID)
  // Example usage: `${FRAMEWORK_ITEM_PREFIX}-soc2`, `${FRAMEWORK_ITEM_PREFIX}-hipaa`
  FRAMEWORK_ITEM_PREFIX: "framework-item", // Prefix for individual framework items
};

// RadarChart test IDs
export const CHART_TEST_IDS = {
  RADAR_CHART: "radar-chart",
  RADAR_CHART_CONTAINER: "radar-chart-container",
  RADAR_CHART_CANVAS: "radar-chart-canvas",
  RADAR_CHART_LEGEND: "radar-chart-legend",
  RADAR_CHART_TOOLTIP: "radar-chart-tooltip",
};

// CostEstimationWidget test IDs
export const COST_TEST_IDS = {
  COST_CONTAINER: "cost-container",
  CAPEX_VALUE: "capex-value",
  OPEX_VALUE: "opex-value",
  TOTAL_COST: "total-cost",
  ROI_ESTIMATE: "roi-estimate",
  COST_ANALYSIS: "cost-analysis",
  SOLUTION_SIZE_INDICATOR: "solution-size-indicator",
};

// SecuritySummaryWidget test IDs
export const SUMMARY_TEST_IDS = {
  SUMMARY_CONTAINER: "summary-container",
  OVERALL_RATING: "overall-rating",
  SECURITY_LEVEL_DESCRIPTION: "security-level-description",
  SECURITY_RECOMMENDATIONS: "security-recommendations",
  CIA_RATINGS: "cia-ratings",
  DETAILED_MEASURES: "detailed-measures",
  AVAILABILITY_MEASURE: "availability-measure",
  INTEGRITY_MEASURE: "integrity-measure",
  CONFIDENTIALITY_MEASURE: "confidentiality-measure",
};

// App-level test IDs
export const APP_TEST_IDS = {
  APP_CONTAINER: "app-container",
  THEME_TOGGLE: "theme-toggle",
  APP_TITLE: "app-title",
  DASHBOARD_CONTAINER: "dashboard-container",
  NOTIFICATION_AREA: "notification-area",
};

// TechnicalDetailsWidget test IDs
export const TECHNICAL_TEST_IDS = {
  TECHNICAL_CONTAINER: "technical-container",
  AVAILABILITY_DETAILS: "availability-technical-details",
  INTEGRITY_DETAILS: "integrity-technical-details",
  CONFIDENTIALITY_DETAILS: "confidentiality-technical-details",
  IMPLEMENTATION_COSTS: "implementation-costs",
  MAINTENANCE_REQUIREMENTS: "maintenance-requirements",
};

/**
 * Helper to generate dynamic test IDs with consistent patterns
 *
 * @param prefix Base identifier for the component type
 * @param id Specific identifier for the individual element
 * @returns Consistently formatted test ID string
 *
 * Example: getTestId("framework", "soc2") => "framework-soc2"
 */
export const getTestId = (prefix: string, id: string): string => {
  return `${prefix}-${id}`;
};

/**
 * Helper to generate tab test IDs
 */
export const getTabTestId = (tabName: string): string => {
  return `tab-${tabName.toLowerCase().replace(/\s+/g, "-")}`;
};

/**
 * Usage examples:
 *
 * 1. Direct usage:
 *    screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)
 *
 * 2. Dynamic ID generation:
 *    screen.getByTestId(getTestId(FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX, "soc2"))
 *
 * 3. Finding multiple elements:
 *    screen.getAllByTestId(new RegExp(`^${FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX}`))
 */

// Main export for all test IDs
export const TEST_IDS = {
  ...CIA_TEST_IDS,
  ...WIDGET_TEST_IDS,
  ...BUSINESS_IMPACT_TEST_IDS,
  ...FRAMEWORK_TEST_IDS,
  ...CHART_TEST_IDS,
  ...COST_TEST_IDS,
  ...SUMMARY_TEST_IDS,
  ...APP_TEST_IDS,
  ...TECHNICAL_TEST_IDS,
};
