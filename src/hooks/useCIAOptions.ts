export interface CIADetails {
  description: string;
  impact: string;
  technical: string; // Added missing field
  capex: number;
  opex: number;
  bg: string;
  text: string;
}

export const availabilityOptions: Record<string, CIADetails> = {
  None: {
    description: "No specific requirement",
    impact: "No impact",
    technical: "No technical controls required",
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
  },
  Low: {
    description: "Minimal downtime acceptable",
    impact: "Minor disruption",
    technical: "Basic redundancy",
    capex: 10,
    opex: 5,
    bg: "#e5f5e0",
    text: "#1a535c",
  },
  Moderate: {
    description: "Limited downtime acceptable",
    impact: "Moderate disruption",
    technical: "Enhanced redundancy",
    capex: 20,
    opex: 15,
    bg: "#a1d99b",
    text: "#1a535c",
  },
  High: {
    description: "Minimal downtime required",
    impact: "Major disruption",
    technical: "High availability",
    capex: 40,
    opex: 30,
    bg: "#31a354",
    text: "#ffffff",
  },
  "Very High": {
    description: "No downtime acceptable",
    impact: "Critical disruption",
    technical: "Fault tolerance",
    capex: 60,
    opex: 45,
    bg: "#006d2c",
    text: "#ffffff",
  },
};

export const integrityOptions = { ...availabilityOptions };
export const confidentialityOptions = { ...availabilityOptions };
