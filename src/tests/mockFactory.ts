import { vi } from "vitest";
import React from "react"; // Add explicit React import
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import type { SecurityLevel } from "../constants/appConstants";
import type { CIADetails } from "../types/cia";

/**
 * Creates mock CIA options for testing
 * @returns A properly structured Record<string, CIADetails> object
 */
export function createMockOptions(
  levels: string[] = ["None", "Low", "Moderate", "High", "Very High"]
): Record<string, CIADetails> {
  const options: Record<string, CIADetails> = {};

  levels.forEach((level, index) => {
    options[level] = {
      description: `${level} level description`,
      technical: `${level} level technical details`,
      businessImpact: `${level} level business impact`,
      impact: level === "None" ? "None" : `${level} impact`,
      capex: level === "None" ? 0 : 10 * index,
      opex: level === "None" ? 0 : 5 * index,
      uptime: level === "None" ? "N/A" : `${95 + index * 1}%`,
      validationMethod:
        level === "None" ? "None" : `${level} validation method`,
      protectionMethod:
        level === "None" ? "None" : `${level} protection method`,
      bg: "#cccccc",
      text: "#000000",
      recommendations: [`${level} recommendation`],
    } as CIADetails;
  });

  return options;
}

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

/**
 * Creates a test wrapper with common providers
 */
export function createTestWrapper(component: ReactElement) {
  return render(component);
}

/**
 * Creates mock event handlers
 */
export function createMockHandlers() {
  return {
    setAvailability: vi.fn(),
    setIntegrity: vi.fn(),
    setConfidentiality: vi.fn(),
    onClick: vi.fn(),
    onChange: vi.fn(),
    onSelect: vi.fn(),
    onToggle: vi.fn(),
  };
}

/**
 * Creates a mock SecurityLevelInfo object
 */
export function createMockSecurityLevelInfo() {
  // Create an object that matches whatever structure is needed by the components
  return {
    level: "Moderate",
    description: "Mock security level description",
    recommendations: ["Recommendation 1", "Recommendation 2"],
    complianceFrameworks: ["SOC 2", "ISO 27001"],
    None: {
      description: "None level description",
      impact: "None impact",
      technical: "None technical",
      businessImpact: "None business impact",
      capex: 0,
      opex: 5,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["None recommendation"],
    },
    Low: {
      description: "Low level description",
      impact: "Low impact",
      technical: "Low technical",
      businessImpact: "Low business impact",
      capex: 5,
      opex: 10,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["Low recommendation"],
    },
    Moderate: {
      description: "Moderate level description",
      impact: "Moderate impact",
      technical: "Moderate technical",
      businessImpact: "Moderate business impact",
      capex: 10,
      opex: 15,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["Moderate recommendation"],
    },
    High: {
      description: "High level description",
      impact: "High impact",
      technical: "High technical",
      businessImpact: "High business impact",
      capex: 15,
      opex: 20,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["High recommendation"],
    },
    "Very High": {
      description: "Very High level description",
      impact: "Very High impact",
      technical: "Very High technical",
      businessImpact: "Very High business impact",
      capex: 20,
      opex: 25,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["Very High recommendation"],
    },
  };
}

/**
 * Creates a mock business impact data object
 */
export function createMockBusinessImpactDetails() {
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
}
