import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { TEST_CIA_LEVELS, TEST_HELPERS } from "../constants/testConstants";

// Custom render function that includes common providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  return render(ui, {
    ...options,
  });
}

// Generate mock CIA options for tests
export function generateMockCIAOptions() {
  return {
    [TEST_CIA_LEVELS.NONE]: {
      description: "No security controls implemented",
      impact: TEST_CIA_LEVELS.NONE,
      technical: "No technical implementation required",
      businessImpact: "Significant risk to business operations",
      capex: 0,
      opex: 0,
      bg: "#e74c3c",
      text: "#ffffff",
      recommendations: [],
    },
    [TEST_CIA_LEVELS.LOW]: {
      description: "Basic protection with minimal controls",
      impact: TEST_CIA_LEVELS.LOW,
      technical: "Simple configuration changes",
      businessImpact: "Reduced risk with minimal investment",
      capex: 500,
      opex: 100,
      bg: "#f39c12",
      text: "#ffffff",
      recommendations: ["Implement basic access controls"],
    },
    [TEST_CIA_LEVELS.MODERATE]: {
      description: "Balanced protection with standard controls",
      impact: TEST_CIA_LEVELS.MODERATE,
      technical: "Industry-standard security practices",
      businessImpact: "Acceptable risk level for most business cases",
      capex: 2000,
      opex: 500,
      bg: "#f1c40f",
      text: "#000000",
      recommendations: [
        "Implement multi-factor authentication",
        "Regular security audits",
      ],
    },
    [TEST_CIA_LEVELS.HIGH]: {
      description: "Robust protection with advanced controls",
      impact: TEST_CIA_LEVELS.HIGH,
      technical: "Advanced security measures with redundancy",
      businessImpact: "Minimal risk to business operations",
      capex: 5000,
      opex: 1500,
      bg: "#2ecc71",
      text: "#ffffff",
      recommendations: [
        "Implement zero-trust architecture",
        "Continuous monitoring",
        "Regular penetration testing",
      ],
    },
    [TEST_CIA_LEVELS.VERY_HIGH]: {
      description: "Maximum protection with enterprise-grade controls",
      impact: TEST_CIA_LEVELS.VERY_HIGH,
      technical: "State-of-the-art security technologies and practices",
      businessImpact: "Nearly eliminates security-related business risks",
      capex: 15000,
      opex: 5000,
      bg: "#3498db",
      text: "#ffffff",
      recommendations: [
        "Custom security solutions",
        "Dedicated security team",
        "Real-time threat detection and response",
        "External security audits",
      ],
    },
  };
}

// Verify CIA level being rendered correctly
export function verifyCIALevel(
  element: HTMLElement,
  expectedLevel: string
): boolean {
  return TEST_HELPERS.checkSecurityLevelColor(element, expectedLevel);
}

// Generate test IDs consistently
export function getTestId(
  component: string,
  element: string,
  action?: string
): string {
  return TEST_HELPERS.getTestId(component, element, action);
}
