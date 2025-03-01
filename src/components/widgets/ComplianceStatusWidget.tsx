import React from "react";
import {
  SECURITY_LEVELS,
  COMPLIANCE_STATUS,
  UI_ICONS,
  COMPLIANCE_FRAMEWORKS,
  FRAMEWORK_DESCRIPTIONS,
} from "../../constants/appConstants";

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
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ].includes(availability) &&
    [
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ].includes(integrity) &&
    [
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ].includes(confidentiality);

  // Check if meets high compliance (all at least High)
  const meetsHighCompliance =
    [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.VERY_HIGH].includes(availability) &&
    [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.VERY_HIGH].includes(integrity) &&
    [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.VERY_HIGH].includes(confidentiality);

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
        [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.VERY_HIGH].includes(
          confidentiality
        ),
      description: FRAMEWORK_DESCRIPTIONS.PCI_DSS,
    },
    {
      name: COMPLIANCE_FRAMEWORKS.HIPAA,
      met:
        meetsStandardCompliance &&
        [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.VERY_HIGH].includes(
          confidentiality
        ),
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

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className={`text-xl mr-2 ${getStatusColor()}`}>
          {getStatusIcon()}
        </span>
        <span className={`font-medium ${getStatusColor()}`}>
          {overallStatus}
        </span>
      </div>

      <div className="space-y-2">
        {complianceFrameworks.map((framework) => (
          <div
            key={framework.name}
            className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1"
          >
            <div className="flex items-center">
              <span
                className={
                  framework.met
                    ? "text-green-500 dark:text-green-400 mr-2"
                    : "text-red-500 dark:text-red-400 mr-2"
                }
              >
                {framework.met ? UI_ICONS.STANDARD_COMPLIANCE : "✗"}
              </span>
              <span>{framework.name}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 max-w-[60%] text-right">
              {framework.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceStatusWidget;
