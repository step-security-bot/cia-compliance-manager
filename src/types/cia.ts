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
  bg: string;
  text: string;
  recommendations: string[];
  // Optional fields that might be present in some implementations
  businessImpactDetails?: {
    [key: string]: any;
  };
  uptime?: string;
  validationMethod?: string;
  protectionMethod?: string;
  implementationSteps?: string[]; // Add this property to the interface
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
  complianceFrameworks?: string[];
  // Direct keyed access to security levels
  None: CIADetails;
  Low: CIADetails;
  Moderate: CIADetails;
  High: CIADetails;
  "Very High": CIADetails;
  // Add any other properties needed by your components
  [key: string]: any; // Allow other properties for flexibility
}

// Interface for CIA widget props
export interface CIAWidgetProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
