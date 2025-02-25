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
  bg: string;
  text: string;
  recommendations?: string[];
}
