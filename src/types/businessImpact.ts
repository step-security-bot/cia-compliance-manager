import {
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
} from "../constants/riskConstants";

// Type for a single business consideration item
export interface BusinessConsiderationItem {
  type: string;
  risk: string;
  description: string;
}

// Type for business considerations structure
export type BusinessConsiderations = {
  [categoryKey: string]: {
    [levelKey: string]: BusinessConsiderationItem[];
  };
};

// Type for business key benefits
export type BusinessKeyBenefits = {
  [levelKey: string]: string[];
};

// Type for business impact icons
export interface BusinessImpactIcons {
  [key: string]: string;
}
