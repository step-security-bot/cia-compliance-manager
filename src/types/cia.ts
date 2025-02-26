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
  recommendations?: string[];
  capex: number;
  opex: number;
  bg: string; // Add background color property
  text: string; // Add text color property
}

export interface CIAOptions {
  [key: string]: CIADetails;
}
