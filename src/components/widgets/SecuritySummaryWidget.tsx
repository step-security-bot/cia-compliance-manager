import React from "react";

interface SecuritySummaryWidgetProps {
  securityLevel: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
}) => {
  const getSummary = () => {
    switch (securityLevel) {
      case "Very High":
        return {
          title: "Very High Security",
          description:
            "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
          recommendation:
            "Suitable for mission-critical systems handling top secret information.",
          emoji: "🔒",
          colorClass: "text-green-600 dark:text-green-400",
        };
      case "High":
        return {
          title: "High Security",
          description:
            "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
          recommendation:
            "Appropriate for systems handling sensitive customer data or financial information.",
          emoji: "🛡️",
          colorClass: "text-blue-600 dark:text-blue-400",
        };
      case "Moderate":
        return {
          title: "Moderate Security",
          description:
            "Balanced protection with automated recovery, validation checks, and standard encryption.",
          recommendation:
            "Suitable for internal business systems with some regulatory requirements.",
          emoji: "🔐",
          colorClass: "text-yellow-600 dark:text-yellow-400",
        };
      case "Low":
        return {
          title: "Low Security",
          description:
            "Basic protection with minimal controls and manual processes.",
          recommendation:
            "Only appropriate for non-critical systems with public information.",
          emoji: "🔓",
          colorClass: "text-orange-600 dark:text-orange-400",
        };
      case "Basic":
        return {
          title: "Basic Security",
          description:
            "Basic protection with minimal controls and manual processes.",
          recommendation:
            "Only appropriate for non-critical systems with public information.",
          emoji: "⚠️",
          colorClass: "text-orange-600 dark:text-orange-400",
        };
      default:
        return {
          title: "No Security",
          description: "No security controls implemented.",
          recommendation:
            "Not recommended for any production system. Implement basic security controls immediately.",
          emoji: "⚠️",
          colorClass: "text-red-600 dark:text-red-400",
        };
    }
  };

  const summary = getSummary();

  return (
    <div className="space-y-3">
      <div
        className={`text-lg font-medium ${summary.colorClass} flex items-center`}
      >
        <span className="mr-2 text-xl" data-testid="security-icon">
          {summary.emoji}
        </span>
        {summary.title}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {summary.description}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium mb-2">Recommendation:</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {summary.recommendation}
        </p>
      </div>
    </div>
  );
};

export default SecuritySummaryWidget;
