import React from "react";
import {
  SECURITY_LEVELS,
  COMPLIANCE_STATUS,
  UI_ICONS,
  COMPLIANCE_FRAMEWORKS,
  FRAMEWORK_DESCRIPTIONS,
} from "../../constants/appConstants";
import StatusBadge from "../common/StatusBadge";
import ValueDisplay from "../common/ValueDisplay";
import MetricsCard from "../common/MetricsCard";
import KeyValuePair from "../common/KeyValuePair";

interface ComplianceStatusWidgetProps {
  securityLevels: {
    availability: string;
    integrity: string;
    confidentiality: string;
  };
}

const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  securityLevels,
}) => {
  const { availability, integrity, confidentiality } = securityLevels;

  // Check if meets basic compliance (all at least Low)
  const meetsBasicCompliance =
    availability !== SECURITY_LEVELS.NONE &&
    integrity !== SECURITY_LEVELS.NONE &&
    confidentiality !== SECURITY_LEVELS.NONE;

  // Check if meets standard compliance (all at least Moderate)
  const meetsStandardCompliance =
    [
      SECURITY_LEVELS.MODERATE.toUpperCase(),
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(availability.toUpperCase()) &&
    [
      SECURITY_LEVELS.MODERATE.toUpperCase(),
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(integrity.toUpperCase()) &&
    [
      SECURITY_LEVELS.MODERATE.toUpperCase(),
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(confidentiality.toUpperCase());

  // Check if meets high compliance (all at least High)
  const meetsHighCompliance =
    [
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(availability.toUpperCase()) &&
    [
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(integrity.toUpperCase()) &&
    [
      SECURITY_LEVELS.HIGH.toUpperCase(),
      SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
    ].includes(confidentiality.toUpperCase());

  // List of compliance frameworks and if they're satisfied
  const complianceFrameworks = [
    {
      name: COMPLIANCE_FRAMEWORKS.SOC2,
      met: meetsBasicCompliance,
      description: FRAMEWORK_DESCRIPTIONS.SOC2,
    },
    {
      name: COMPLIANCE_FRAMEWORKS.ISO27001,
      met: meetsStandardCompliance,
      description: FRAMEWORK_DESCRIPTIONS.ISO27001,
    },
    {
      name: COMPLIANCE_FRAMEWORKS.PCI_DSS,
      met:
        meetsStandardCompliance &&
        [
          SECURITY_LEVELS.HIGH.toUpperCase(),
          SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
        ].includes(confidentiality.toUpperCase()),
      description: FRAMEWORK_DESCRIPTIONS.PCI_DSS,
    },
    {
      name: COMPLIANCE_FRAMEWORKS.HIPAA,
      met:
        meetsStandardCompliance &&
        [
          SECURITY_LEVELS.HIGH.toUpperCase(),
          SECURITY_LEVELS.VERY_HIGH.toUpperCase(),
        ].includes(confidentiality.toUpperCase()),
      description: FRAMEWORK_DESCRIPTIONS.HIPAA,
    },
    {
      name: COMPLIANCE_FRAMEWORKS.NIST,
      met: meetsHighCompliance,
      description: FRAMEWORK_DESCRIPTIONS.NIST,
    },
  ];

  // Overall compliance status
  const overallStatus = meetsHighCompliance
    ? COMPLIANCE_STATUS.FULL_COMPLIANCE
    : meetsStandardCompliance
    ? COMPLIANCE_STATUS.STANDARD_COMPLIANCE
    : meetsBasicCompliance
    ? COMPLIANCE_STATUS.BASIC_COMPLIANCE
    : COMPLIANCE_STATUS.NON_COMPLIANT;

  // Styling based on compliance level
  const getStatusColor = () => {
    if (meetsHighCompliance) return "text-green-600 dark:text-green-400";
    if (meetsStandardCompliance) return "text-blue-600 dark:text-blue-400";
    if (meetsBasicCompliance) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusIcon = () => {
    if (meetsHighCompliance) return UI_ICONS.FULL_COMPLIANCE;
    if (meetsStandardCompliance) return UI_ICONS.STANDARD_COMPLIANCE;
    if (meetsBasicCompliance) return UI_ICONS.BASIC_COMPLIANCE;
    return UI_ICONS.NON_COMPLIANT;
  };

  // Get percentage of compliance for progress bar
  const getCompliancePercentage = () => {
    if (meetsHighCompliance) return 100;
    if (meetsStandardCompliance) return 70;
    if (meetsBasicCompliance) return 40;
    return 0;
  };

  // Get a summary of what's needed for next compliance level
  const getNextLevelRequirements = () => {
    if (meetsHighCompliance) {
      return "You have achieved the highest compliance level. Continue maintaining your security posture.";
    } else if (meetsStandardCompliance) {
      return "To reach Full Compliance: Upgrade to High or Very High for all CIA components.";
    } else if (meetsBasicCompliance) {
      return "To reach Standard Compliance: Upgrade to Moderate or higher for all CIA components.";
    } else {
      return "To reach Basic Compliance: Upgrade from None to at least Low for all CIA components.";
    }
  };

  // Add enhanced compliance icons
  const complianceIcons = {
    FRAMEWORK: {
      SOC2: "🔄", // Cycle for SOC processes
      ISO27001: "🌐", // Globe for international standard
      PCI_DSS: "💳", // Credit card for payment
      HIPAA: "🏥", // Hospital for healthcare
      NIST: "🏛️", // Building for government
    },
    STATUS: {
      COMPLIANT: "✅", // Green check
      NON_COMPLIANT: "❌", // Red X
      PARTIAL: "⚠️", // Warning
    },
    CIA_COMPONENTS: {
      AVAILABILITY: "⏱️",
      INTEGRITY: "🔐",
      CONFIDENTIALITY: "🔏",
    },
  };

  // Add this helper function:
  const getFrameworkKey = (
    frameworkName: string
  ): keyof typeof complianceIcons.FRAMEWORK => {
    if (frameworkName.includes("SOC")) return "SOC2";
    if (frameworkName.includes("ISO")) return "ISO27001";
    if (frameworkName.includes("PCI")) return "PCI_DSS";
    if (frameworkName.includes("HIPAA")) return "HIPAA";
    if (frameworkName.includes("NIST")) return "NIST";
    return "SOC2"; // Default
  };

  // Convert status to our StatusBadge status type
  const getStatusBadgeType = ():
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral" => {
    if (meetsHighCompliance) return "success";
    if (meetsStandardCompliance) return "info";
    if (meetsBasicCompliance) return "warning";
    return "error";
  };

  return (
    <div
      className="space-y-4"
      data-testid="compliance-status-widget"
      aria-label="Compliance Status Information"
    >
      {/* Overall Status Header with Icon */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span
            className={`text-xl mr-2 ${getStatusColor()}`}
            data-testid="compliance-status-icon"
            aria-hidden="true"
          >
            {getStatusIcon()}
          </span>
          <StatusBadge
            status={getStatusBadgeType()}
            testId="compliance-status-badge"
            size="md"
          >
            {/* Add this span with the required testId */}
            <span data-testid="compliance-status-text">{overallStatus}</span>
          </StatusBadge>
        </div>

        {/* Add compliance level percentage using metrics card */}
        <MetricsCard
          title="Compliance Level"
          value={`${getCompliancePercentage()}%`}
          testId="compliance-percentage"
        />
      </div>

      {/* Add visual progress bar with improved styling */}
      <div
        className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
        role="progressbar"
        aria-label="Compliance level progress"
      >
        <div
          className={`h-2.5 rounded-full ${
            meetsHighCompliance
              ? "bg-green-500"
              : meetsStandardCompliance
              ? "bg-blue-500"
              : meetsBasicCompliance
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${getCompliancePercentage()}%` }}
          data-testid="compliance-progress-bar"
          aria-valuenow={getCompliancePercentage()}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Compliance level: ${overallStatus} (${getCompliancePercentage()}%)`}
        ></div>
      </div>

      {/* Next Level Requirements */}
      <div
        className="text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 font-medium"
        data-testid="next-level-requirements"
      >
        <p>{getNextLevelRequirements()}</p>
      </div>

      {/* Framework Compliance Table with enhanced styling */}
      <div
        className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
        data-testid="compliance-frameworks-list"
        aria-label="Compliance Framework Status"
        role="table"
      >
        <div
          className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2"
          role="row"
        >
          <span role="columnheader" className="font-semibold">
            Framework
          </span>
          <span role="columnheader" className="font-semibold">
            Status
          </span>
        </div>

        {complianceFrameworks.map((framework) => (
          <div
            key={framework.name}
            className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 py-2"
            data-testid={`framework-${framework.name
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            role="row"
          >
            <div className="flex items-center" role="cell">
              <span
                className="mr-2 flex items-center"
                data-testid={`framework-status-${framework.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                aria-label={framework.met ? "Compliant" : "Non-compliant"}
              >
                {framework.met ? (
                  <StatusBadge status="success" size="xs">
                    {complianceIcons.FRAMEWORK[getFrameworkKey(framework.name)]}
                  </StatusBadge>
                ) : (
                  <StatusBadge status="error" size="xs">
                    ✗
                  </StatusBadge>
                )}
              </span>
              <span
                className="font-medium"
                data-testid={`framework-name-${framework.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {framework.name}
              </span>
            </div>
            <KeyValuePair
              label=""
              value={framework.description}
              valueClassName="text-xs bg-gray-50 dark:bg-gray-700 p-1.5 rounded text-gray-600 dark:text-gray-300 max-w-[60%] text-right"
              testId={`framework-description-${framework.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            />
          </div>
        ))}
      </div>

      {/* Component Requirements Summary with enhanced styling */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <h4
          className="text-sm font-medium mb-2"
          data-testid="component-requirements-heading"
        >
          Component Requirements
        </h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div
            className={`p-2 rounded ${
              availability === SECURITY_LEVELS.NONE
                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
            } border ${
              availability === SECURITY_LEVELS.NONE
                ? "border-red-200 dark:border-red-800"
                : "border-green-200 dark:border-green-800"
            }`}
            data-testid="availability-status"
          >
            <div className="font-medium">Availability</div>
            <ValueDisplay
              value={availability}
              variant={
                availability === SECURITY_LEVELS.NONE ? "danger" : "success"
              }
              size="sm"
              testId="availability-level-display"
            />
          </div>
          <div
            className={`p-2 rounded ${
              integrity === SECURITY_LEVELS.NONE
                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
            } border ${
              integrity === SECURITY_LEVELS.NONE
                ? "border-red-200 dark:border-red-800"
                : "border-green-200 dark:border-green-800"
            }`}
            data-testid="integrity-status"
          >
            <div className="font-medium">Integrity</div>
            <ValueDisplay
              value={integrity}
              variant={
                integrity === SECURITY_LEVELS.NONE ? "danger" : "success"
              }
              size="sm"
              testId="integrity-level-display"
            />
          </div>
          <div
            className={`p-2 rounded ${
              confidentiality === SECURITY_LEVELS.NONE
                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
            } border ${
              confidentiality === SECURITY_LEVELS.NONE
                ? "border-red-200 dark:border-red-800"
                : "border-green-200 dark:border-green-800"
            }`}
            data-testid="confidentiality-status"
          >
            <div className="font-medium">Confidentiality</div>
            <ValueDisplay
              value={confidentiality}
              variant={
                confidentiality === SECURITY_LEVELS.NONE ? "danger" : "success"
              }
              size="sm"
              testId="confidentiality-level-display"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatusWidget;
