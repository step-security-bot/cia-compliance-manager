// Central export file for all constants to improve TypeScript module resolution

// Fix the export ambiguity by being explicit about what we're re-exporting

// Import everything but WIDGET_ICONS from uiConstants
import {
  BUSINESS_IMPACT_ICONS,
  SECURITY_LEVEL_COLORS,
  CIA_COMPONENT_ICONS,
} from "./uiConstants";

// Import everything from appConstants, which has its own WIDGET_ICONS
import * as appConstants from "./appConstants";

// Re-export explicitly to avoid name conflicts
export { BUSINESS_IMPACT_ICONS, SECURITY_LEVEL_COLORS, CIA_COMPONENT_ICONS };

// Re-export everything from appConstants (including its WIDGET_ICONS)
export * from "./appConstants";

// Re-export everything else
export * from "./riskConstants";
export * from "./businessConstants";
