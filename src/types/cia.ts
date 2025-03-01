/* c8 ignore start */
// This file contains TypeScript types that don't need test coverage

export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";
export type SecurityFunctionGroup =
  | "Identify"
  | "Protect"
  | "Detect"
  | "Respond"
  | "Recover";
export type SecurityFunction = "ID" | "PR" | "DE" | "RS" | "RC";
/* c8 ignore end */

export enum CIALevel {
  None = "None",
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  VeryHigh = "Very High",
}

// CIA Types

// New interface for detailed business impact information
export interface BusinessImpactDetail {
  description: string;
  riskLevel?: string;
  [key: string]: any; // Allow for flexible additional properties
}

export interface BusinessImpactDetails {
  financialImpact?: BusinessImpactDetail;
  operationalImpact?: BusinessImpactDetail;
  reputationalImpact?: BusinessImpactDetail;
  regulatoryImpact?: BusinessImpactDetail;
  strategicImpact?: BusinessImpactDetail;
  competitiveAdvantage?: BusinessImpactDetail;
  [key: string]: BusinessImpactDetail | undefined; // Allow for additional impact types
}

// Base interface for CIA details
export interface CIADetails {
  description: string;
  impact: string;
  technical: string;
  businessImpact: string;
  capex: number;
  opex: number;
  // Add new properties for enhanced display
  uptime?: string; // For availability options
  validationMethod?: string; // For integrity options
  protectionMethod?: string; // For confidentiality options

  // Add properties required by tests
  recommendations?: string[]; // Security recommendations
  bg?: string; // Background color for styling
  text?: string; // Text color for styling

  // Add detailed business impact information
  businessImpactDetails?: BusinessImpactDetails;
}

// Types for CIA ratings
export type AvailabilityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";
export type IntegrityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";
export type ConfidentialityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

// Combined CIA profile
export interface CIAProfile {
  availability: AvailabilityRating;
  integrity: IntegrityRating;
  confidentiality: ConfidentialityRating;
}

// Security level info
export interface SecurityLevelInfo {
  level: string;
  description: string;
  recommendations: string[];
  complianceFrameworks: string[];
}

// Interface for CIA widget props
export interface CIAWidgetProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
