import { vi } from "vitest";
import React from "react";
import { SecurityLevel } from "../constants/appConstants";
import type { CIADetails, SecurityLevelInfo } from "../types/cia";

/**
 * Creates mock CIA options for testing
 * @returns A properly structured SecurityLevelInfo object
 */
export function createMockOptions(
  levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"]
): Record<string, CIADetails> {
  // Changed return type to match actual structure
  const result: Record<string, CIADetails> = {};

  levels.forEach((level, index) => {
    result[level] = {
      description: `${level} description`,
      impact: `${level} impact`,
      technical: `${level} technical details`,
      businessImpact: `${level} business impact`,
      capex: index * 5,
      opex: index * 5 + 5,
      bg: "#cccccc",
      text: "#000000",
      recommendations: [`${level} recommendation`],
    };
  });

  return result; // Removed the type assertion that was causing the error
}

/**
 * Creates a mock component render wrapper with common props
 */
export function createTestWrapper<P extends object>(
  // Use 'extends object' constraint for better type compatibility
  Component: React.ComponentType<P>,
  defaultProps: Partial<P> = {}
) {
  return (props: Partial<P> = {}) => {
    const mergedProps = { ...defaultProps, ...props } as P;
    // Fix createElement type compatibility issue
    return React.createElement(
      Component as React.ComponentType<any>,
      mergedProps
    );
  };
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
    // If SecurityLevelInfo doesn't have options, structure the object differently
    // based on your actual type definition
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
