import React from "react";

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
    availability !== "None" &&
    integrity !== "None" &&
    confidentiality !== "None";

  // Check if meets standard compliance (all at least Moderate)
  const meetsStandardCompliance =
    ["Moderate", "High", "Very High"].includes(availability) &&
    ["Moderate", "High", "Very High"].includes(integrity) &&
    ["Moderate", "High", "Very High"].includes(confidentiality);

  // Check if meets high compliance (all at least High)
  const meetsHighCompliance =
    ["High", "Very High"].includes(availability) &&
    ["High", "Very High"].includes(integrity) &&
    ["High", "Very High"].includes(confidentiality);

  // List of compliance frameworks and if they're satisfied
  const complianceFrameworks = [
    {
      name: "SOC 2 Type 1",
      met: meetsBasicCompliance,
      description: "Requires basic security controls across CIA triad",
    },
    {
      name: "ISO 27001",
      met: meetsStandardCompliance,
      description: "Requires moderate security controls and management system",
    },
    {
      name: "PCI DSS",
      met:
        meetsStandardCompliance &&
        ["High", "Very High"].includes(confidentiality),
      description: "Emphasis on strong confidentiality controls",
    },
    {
      name: "HIPAA",
      met:
        meetsStandardCompliance &&
        ["High", "Very High"].includes(confidentiality),
      description: "Requires protection of healthcare information",
    },
    {
      name: "NIST 800-53 High",
      met: meetsHighCompliance,
      description: "High security controls for federal information systems",
    },
  ];

  // Overall compliance status
  const overallStatus = meetsHighCompliance
    ? "Compliant with all major frameworks"
    : meetsStandardCompliance
    ? "Compliant with standard frameworks"
    : meetsBasicCompliance
    ? "Meets basic compliance only"
    : "Non-compliant";

  // Styling based on compliance level
  const getStatusColor = () => {
    if (meetsHighCompliance) return "text-green-600 dark:text-green-400";
    if (meetsStandardCompliance) return "text-blue-600 dark:text-blue-400";
    if (meetsBasicCompliance) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusIcon = () => {
    if (meetsHighCompliance) return "✅";
    if (meetsStandardCompliance) return "✓";
    if (meetsBasicCompliance) return "⚠️";
    return "❌";
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
                {framework.met ? "✓" : "✗"}
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
