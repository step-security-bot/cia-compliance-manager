import React from "react";

interface ImpactAnalysisWidgetProps {
  category: "Availability" | "Integrity" | "Confidentiality";
  level: string;
}

const ImpactAnalysisWidget: React.FC<ImpactAnalysisWidgetProps> = ({
  category,
  level,
}) => {
  // Impact descriptions based on category and level
  const getImpactDescription = () => {
    switch (category) {
      case "Availability":
        switch (level) {
          case "Very High":
            return "99.99% uptime, ensuring continuous operations with less than 1 hour of annual downtime.";
          case "High":
            return "99.9% uptime, maintaining most operations with minimal disruptions.";
          case "Moderate":
            return "99% uptime, occasional disruptions affecting some business functions.";
          case "Low":
            return "95% uptime, frequent disruptions affecting operations.";
          default:
            return "No availability guarantees, significant downtime expected.";
        }
      case "Integrity":
        switch (level) {
          case "Very High":
            return "Complete data accuracy with real-time validation through smart contracts.";
          case "High":
            return "Immutable data records with blockchain validation for high assurance.";
          case "Moderate":
            return "Automated validation providing reasonable data accuracy.";
          case "Low":
            return "Basic data checks with potential for errors.";
          default:
            return "No data integrity controls, high risk of corruption.";
        }
      case "Confidentiality":
        switch (level) {
          case "Very High":
            return "Military-grade protection using quantum-safe encryption.";
          case "High":
            return "Strong protection with MFA, robust encryption, and continuous monitoring.";
          case "Moderate":
            return "Standard protection with AES-256 encryption and basic monitoring.";
          case "Low":
            return "Minimal protection suitable only for non-sensitive information.";
          default:
            return "No confidentiality controls, data is essentially public.";
        }
    }
  };

  const getBusinessImpact = () => {
    switch (category) {
      case "Availability":
        switch (level) {
          case "Very High":
            return "Ensures business continuity even during major disruptions, supporting critical operations.";
          case "High":
            return "Maintains customer satisfaction and revenue streams with minimal interruptions.";
          case "Moderate":
            return "Acceptable for standard business operations with some tolerance for downtime.";
          case "Low":
            return "May result in customer frustration and revenue loss during outages.";
          default:
            return "High risk of significant business disruption and financial losses.";
        }
      case "Integrity":
        switch (level) {
          case "Very High":
            return "Supports regulatory compliance and enables high-confidence business decisions.";
          case "High":
            return "Ensures accurate financial reporting and maintains data trustworthiness.";
          case "Moderate":
            return "Provides reasonable assurance for business processes with some validation.";
          case "Low":
            return "May lead to occasional errors in business decisions and reporting.";
          default:
            return "High risk of incorrect business decisions based on corrupt data.";
        }
      case "Confidentiality":
        switch (level) {
          case "Very High":
            return "Protects highly sensitive information from sophisticated threats.";
          case "High":
            return "Safeguards customer data and intellectual property from most threats.";
          case "Moderate":
            return "Adequate for protecting internal business information.";
          case "Low":
            return "Minimal protection that may not meet regulatory requirements.";
          default:
            return "No protection for sensitive information, high risk of exposure.";
        }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center mb-2">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            level === "Very High"
              ? "bg-green-500"
              : level === "High"
              ? "bg-blue-500"
              : level === "Moderate"
              ? "bg-yellow-500"
              : level === "Low"
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
        ></span>
        <span className="text-sm font-medium">
          {level} {category}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p className="mb-2">{getImpactDescription()}</p>
        <p className="font-medium text-sm mt-2">Business Impact:</p>
        <p>{getBusinessImpact()}</p>
      </div>
    </div>
  );
};

export default ImpactAnalysisWidget;
