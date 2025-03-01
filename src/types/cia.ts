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

export interface CIADetails {
  description: string;
  impact: string;
  technical: string;
  capex: number;
  opex: number;
  businessImpact: string;
  bg: string;
  text: string;
  recommendations: string[];
}

export interface CIAOptions {
  [key: string]: CIADetails;
}
