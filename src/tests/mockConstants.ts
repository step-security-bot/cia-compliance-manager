export const TEST_DATA = {
  MOCK_OPTIONS: {
    BASE: { description: "Base description", capex: 0, opex: 0 },
    LOW: { description: "Low description", capex: 10, opex: 5 },
  },
  MOCK_DESCRIPTIONS: {
    AVAILABILITY: "Test availability description",
    INTEGRITY: "Test integrity description",
    CONFIDENTIALITY: "Test confidentiality description",
  },
};

export const TEST_CIA_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// Create mock options for technical details widget tests
export const mockAvailabilityOptions = {
  None: { technical: "none-tech", implementationSteps: ["Step 1", "Step 2"] },
  Low: { technical: "low-tech", implementationSteps: ["Step 1", "Step 2"] },
  Moderate: {
    technical: "moderate-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  High: { technical: "high-tech", implementationSteps: ["Step 1", "Step 2"] },
};

export const mockIntegrityOptions = {
  None: {
    technical: "none-integrity-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  Low: {
    technical: "low-integrity-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  Moderate: {
    technical: "moderate-integrity-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  High: {
    technical: "high-integrity-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
};

export const mockConfidentialityOptions = {
  None: {
    technical: "none-conf-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  Low: {
    technical: "low-conf-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  Moderate: {
    technical: "moderate-conf-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
  High: {
    technical: "high-conf-tech",
    implementationSteps: ["Step 1", "Step 2"],
  },
};
