import React from "react";
import {
  SECURITY_LEVELS,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  WIDGET_ICONS,
} from "../../constants";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "../common/StatusBadge";
import { ComplianceStatusWidgetProps } from "../../types/widgets";

// Add proper type annotation to the component
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
}) => {
  // Determine overall compliance level based on the lowest security level
  const determineComplianceLevel = (): string => {
    const levels = [availability, integrity, confidentiality];

    if (levels.includes(SECURITY_LEVELS.NONE)) {
      return COMPLIANCE_STATUS.NON_COMPLIANT;
    }

    if (levels.includes(SECURITY_LEVELS.LOW)) {
      return COMPLIANCE_STATUS.BASIC_COMPLIANCE;
    }

    if (levels.includes(SECURITY_LEVELS.MODERATE)) {
      return COMPLIANCE_STATUS.STANDARD_COMPLIANCE;
    }

    return COMPLIANCE_STATUS.FULL_COMPLIANCE;
  };

  const complianceLevel = determineComplianceLevel();

  // Generate list of compliant frameworks based on security levels
  const getCompliantFrameworks = (): string[] => {
    const frameworks: string[] = [];
    const securityScore = getSecurityScore();

    // Map security score to frameworks
    if (securityScore >= 1) {
      frameworks.push(COMPLIANCE_FRAMEWORKS.SOC2);
    }

    if (securityScore >= 2) {
      frameworks.push(COMPLIANCE_FRAMEWORKS.ISO27001);
    }

    if (securityScore >= 3) {
      frameworks.push(COMPLIANCE_FRAMEWORKS.HIPAA);
      frameworks.push(COMPLIANCE_FRAMEWORKS.PCI_DSS);
    }

    if (securityScore >= 4) {
      frameworks.push(COMPLIANCE_FRAMEWORKS.NIST);
    }

    return frameworks;
  };

  // Calculate security score (0-4) based on the security level
  const getSecurityScore = (): number => {
    const levelScores: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const scores = [
      levelScores[availability as SecurityLevel] || 0,
      levelScores[integrity as SecurityLevel] || 0,
      levelScores[confidentiality as SecurityLevel] || 0,
    ];

    // Return the lowest score (weakest link)
    return Math.min(...scores);
  };

  // Determine status badge variant based on compliance level
  const getComplianceStatusVariant = ():
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral" => {
    switch (complianceLevel) {
      case COMPLIANCE_STATUS.FULL_COMPLIANCE:
        return "success";
      case COMPLIANCE_STATUS.STANDARD_COMPLIANCE:
        return "info";
      case COMPLIANCE_STATUS.BASIC_COMPLIANCE:
        return "warning";
      default:
        return "error";
    }
  };

  const compliantFrameworks = getCompliantFrameworks();

  return (
    <div className="p-4" data-testid="compliance-status-widget">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <span className="mr-2" aria-hidden="true">
            {WIDGET_ICONS.COMPLIANCE_STATUS}
          </span>
          Compliance Status
        </h3>
        <StatusBadge
          status={getComplianceStatusVariant()}
          testId="compliance-status-badge"
        >
          {complianceLevel}
        </StatusBadge>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Compliant Frameworks:</h4>
        <div className="space-y-2" data-testid="compliant-frameworks-list">
          {compliantFrameworks.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              No compliance frameworks supported at the current security level.
            </p>
          ) : (
            <ul className="space-y-2">
              {compliantFrameworks.map((framework, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500" aria-hidden="true">
                    ✓
                  </span>
                  <span data-testid={`framework-${index}`}>{framework}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">
          Requirements for Full Compliance:
        </h4>
        <ul
          data-testid="compliance-requirements-list"
          className="list-disc pl-5 space-y-1"
        >
          <li className="text-sm">
            Minimum {SECURITY_LEVELS.MODERATE} level for all CIA components
          </li>
          <li className="text-sm">
            {SECURITY_LEVELS.HIGH} {integrity} to meet financial regulations
          </li>
          <li className="text-sm">
            {SECURITY_LEVELS.HIGH} {confidentiality} for data privacy compliance
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComplianceStatusWidget;
