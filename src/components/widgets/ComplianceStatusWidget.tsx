import React from "react";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import { FRAMEWORK_TEST_IDS } from "../../constants/testIds";

interface ComplianceStatusWidgetProps {
  securityLevel?: string;
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availability?: string; // For backwards compatibility
  integrity?: string; // For backwards compatibility
  confidentiality?: string; // For backwards compatibility
  testId?: string;
}

const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  securityLevel,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  availability, // For backwards compatibility
  integrity, // For backwards compatibility
  confidentiality, // For backwards compatibility
  testId = FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}) => {
  // Use provided levels or fallback to backward compatibility props
  const actualAvailLevel = availabilityLevel || availability;
  const actualIntLevel = integrityLevel || integrity;
  const actualConfLevel = confidentialityLevel || confidentiality;

  // Determine security level if not explicitly provided
  const determinedSecurityLevel =
    securityLevel ||
    (() => {
      if (!actualAvailLevel && !actualIntLevel && !actualConfLevel) {
        return SECURITY_LEVELS.NONE;
      }

      // Calculate a rough average level - this is simplified
      const levels = [actualAvailLevel, actualIntLevel, actualConfLevel].filter(
        Boolean
      );
      const avgLevel = levels.length
        ? levels.reduce(
            (a, b) =>
              a +
              (b === SECURITY_LEVELS.HIGH
                ? 3
                : b === SECURITY_LEVELS.MODERATE
                ? 2
                : b === SECURITY_LEVELS.LOW
                ? 1
                : 0),
            0
          ) / levels.length
        : 0;

      if (avgLevel >= 2.5) return SECURITY_LEVELS.HIGH;
      if (avgLevel >= 1.5) return SECURITY_LEVELS.MODERATE;
      if (avgLevel >= 0.5) return SECURITY_LEVELS.LOW;
      return SECURITY_LEVELS.NONE;
    })();

  const getComplianceFrameworks = () => {
    switch (determinedSecurityLevel) {
      case SECURITY_LEVELS.HIGH:
        return [
          "SOC 2 Type 2",
          "HIPAA",
          "PCI-DSS",
          "ISO 27001",
          "NIST 800-53 High",
        ];
      case SECURITY_LEVELS.MODERATE:
        return ["SOC 2 Type 1", "NIST 800-53 Moderate", "ISO 27001 (partial)"];
      case SECURITY_LEVELS.LOW:
        return ["SOC 2 Type 1"];
      case SECURITY_LEVELS.NONE:
      default:
        return [];
    }
  };

  const getComplianceStatus = () => {
    switch (determinedSecurityLevel) {
      case SECURITY_LEVELS.HIGH:
        return "Compliant with all major frameworks";
      case SECURITY_LEVELS.MODERATE:
        return "Meets standard compliance requirements";
      case SECURITY_LEVELS.LOW:
        return "Meets basic compliance only";
      case SECURITY_LEVELS.NONE:
      default:
        return "Non-compliant with most frameworks";
    }
  };

  const getRequirementsForNextLevel = () => {
    switch (determinedSecurityLevel) {
      case SECURITY_LEVELS.HIGH:
        return [
          "Maintain current security posture",
          "Regular security assessments",
          "Continuous monitoring",
        ];
      case SECURITY_LEVELS.MODERATE:
        return [
          "Minimum High level for all CIA components",
          "Advanced encryption for data at rest and in transit",
          "Regular penetration testing",
        ];
      case SECURITY_LEVELS.LOW:
        return [
          "Minimum Moderate level for all CIA components",
          "High  to meet financial regulations",
          "High  for data privacy compliance",
        ];
      case SECURITY_LEVELS.NONE:
      default:
        return [
          "Implement at least Low level security for all CIA components",
          "Basic access controls",
          "Security awareness training",
        ];
    }
  };

  const frameworks = getComplianceFrameworks();

  return (
    <div className="p-4" data-testid={testId}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Compliance Status
        </h3>
        <span
          className={`inline-flex items-center justify-center rounded-full font-medium text-sm px-2 py-1 ${
            determinedSecurityLevel === SECURITY_LEVELS.NONE
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
          data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}
        >
          {getComplianceStatus()}
        </span>
      </div>

      <div
        className="space-y-2"
        data-testid={FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
      >
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Compliant Frameworks:
        </h4>
        <div className="flex flex-wrap gap-2">
          {frameworks.length > 0 ? (
            frameworks.map((framework, index) => (
              <div
                key={framework}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs py-1 px-2 rounded"
              >
                <span data-testid={`framework-${index}`}>{framework}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No compliant frameworks
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Requirements for Next Level:
        </h4>
        <ul
          className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400"
          data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}
        >
          {getRequirementsForNextLevel().map((req, index) => (
            <li key={index} className="text-sm">
              {req}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplianceStatusWidget;
