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
  // Calculate compliance status based on selected security levels
  const getComplianceStatus = () => {
    const { availability, integrity, confidentiality } = securityLevels;

    // Convert security levels to numeric values
    const levelToValue = (level: string): number => {
      switch (level) {
        case "Very High":
          return 4;
        case "High":
          return 3;
        case "Moderate":
          return 2;
        case "Basic":
          return 1;
        default:
          return 0;
      }
    };

    const avgLevel =
      (levelToValue(availability) +
        levelToValue(integrity) +
        levelToValue(confidentiality)) /
      3;

    // Determine compliance based on average security level
    const frameworks = [
      {
        name: "NIST 800-53",
        status: avgLevel >= 2.5 ? "Compliant" : "Non-compliant",
        level: avgLevel >= 3.5 ? "High" : avgLevel >= 2.5 ? "Moderate" : "Low",
        icon: avgLevel >= 2.5 ? "✅" : "❌",
      },
      {
        name: "ISO 27001",
        status: avgLevel >= 2 ? "Compliant" : "Non-compliant",
        level:
          avgLevel >= 3 ? "Full" : avgLevel >= 2 ? "Basic" : "Insufficient",
        icon: avgLevel >= 2 ? "✅" : "❌",
      },
      {
        name: "GDPR",
        status:
          confidentiality === "High" || confidentiality === "Very High"
            ? "Compliant"
            : "Non-compliant",
        level:
          confidentiality === "Very High"
            ? "Strong"
            : confidentiality === "High"
            ? "Adequate"
            : "Insufficient",
        icon:
          confidentiality === "High" || confidentiality === "Very High"
            ? "✅"
            : "❌",
      },
      {
        name: "HIPAA",
        status:
          (integrity === "High" || integrity === "Very High") &&
          (confidentiality === "High" || confidentiality === "Very High")
            ? "Compliant"
            : "Non-compliant",
        level:
          avgLevel >= 3.5
            ? "Strong"
            : avgLevel >= 3
            ? "Adequate"
            : "Insufficient",
        icon:
          (integrity === "High" || integrity === "Very High") &&
          (confidentiality === "High" || confidentiality === "Very High")
            ? "✅"
            : "❌",
      },
    ];

    return frameworks;
  };

  const complianceFrameworks = getComplianceStatus();

  return (
    <div className="p-2">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Compliance status based on selected security levels:
      </p>
      <div className="space-y-2">
        {complianceFrameworks.map((framework) => (
          <div
            key={framework.name}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
          >
            <div>
              <span className="text-sm font-medium">{framework.name}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {framework.level} level
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">{framework.status}</span>
              <span>{framework.icon}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        For detailed mapping, see{" "}
        <a href="#" className="text-blue-500">
          Control Mapping Documentation
        </a>
      </p>
    </div>
  );
};

export default ComplianceStatusWidget;
