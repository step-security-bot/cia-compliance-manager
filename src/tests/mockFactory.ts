import { vi } from "vitest";
import React from "react";
import type { SecurityLevel } from "../constants/appConstants";
import type { CIADetails } from "../types/cia";

/**
 * Factory functions for creating consistent test mocks
 */
export const createMockOptions = (
  levels: string[] = ["None", "Low", "Moderate", "High", "Very High"]
): Record<string, CIADetails> => {
  const options: Record<string, CIADetails> = {};

  levels.forEach((level) => {
    options[level] = {
      description: `${level} level description`,
      technical: `Technical details for ${level}`,
      businessImpact: `Business impact for ${level}`,
      impact: level,
      capex:
        level === "None"
          ? 0
          : level === "Low"
          ? 10
          : level === "Moderate"
          ? 25
          : level === "High"
          ? 50
          : 75,
      opex:
        level === "None"
          ? 0
          : level === "Low"
          ? 5
          : level === "Moderate"
          ? 15
          : level === "High"
          ? 30
          : 45,
      bg: "#cccccc",
      text: "#000000",
      // Add the missing recommendations property required by CIADetails type
      recommendations: [`Recommendation for ${level} security level`],
    };
  });

  return options;
};

/**
 * Creates mock event handlers for component props
 */
export const createMockHandlers = () => ({
  setAvailability: vi.fn(),
  setIntegrity: vi.fn(),
  setConfidentiality: vi.fn(),
  onClick: vi.fn(),
  onChange: vi.fn(),
  onSelect: vi.fn(),
  onToggle: vi.fn(),
});

/**
 * Creates a complete mock security level info object
 */
export const createMockSecurityLevelInfo = () => {
  return {
    None: {
      description: "No security measures in place",
      technical: "No technical implementation required",
      businessImpact: "High risk of data loss and breaches",
    },
    Low: {
      description: "Basic security measures",
      technical: "Simple password protection",
      businessImpact: "Moderate risk of data exposure",
    },
    Moderate: {
      description: "Standard security controls",
      technical: "Encryption and authorization",
      businessImpact: "Reduced risk with acceptable protection",
    },
    High: {
      description: "Advanced security measures",
      technical: "Multi-factor authentication and encryption",
      businessImpact: "Low risk with strong protection",
    },
    "Very High": {
      description: "Maximum security implementation",
      technical: "End-to-end encryption, MFA, and continuous monitoring",
      businessImpact: "Minimal risk with comprehensive protection",
    },
  };
};

/**
 * Creates a mock business impact data object
 */
export const createMockBusinessImpactDetails = () => {
  return {
    financialImpact: {
      description: "Financial impact description",
      riskLevel: "HIGH",
      annualRevenueLoss: "$500,000",
    },
    operationalImpact: {
      description: "Operational impact description",
      meanTimeToRecover: "24 hours",
    },
    reputationalImpact: {
      description: "Reputational impact description",
      severity: "MEDIUM",
    },
  };
};

/**
 * Create a test wrapper component for testing context providers
 * Fixed JSX syntax issues by using createElement instead of JSX
 */
export const createTestWrapper = (
  WrappedComponent: React.ComponentType,
  props?: Record<string, any>
) => {
  return function TestWrapper({ children }: { children?: React.ReactNode }) {
    // Use React.createElement instead of JSX to avoid TS errors
    return React.createElement(WrappedComponent, props, children);
  };
};

/**
 * Creates a mock component render wrapper with common props
 */
export function createComponentWrapper<P extends object>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P> = {}
) {
  return (props: Partial<P> = {}) => {
    const mergedProps = { ...defaultProps, ...props } as P;
    return React.createElement(Component, mergedProps);
  };
}

export default {
  createMockOptions,
  createMockHandlers,
  createMockSecurityLevelInfo,
  createTestWrapper,
  createComponentWrapper,
  createMockBusinessImpactDetails,
};
