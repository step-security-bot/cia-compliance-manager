import React from "react";

interface ValueCreationWidgetProps {
  securityLevel: string;
}

const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel,
}) => {
  const getValuePoints = () => {
    switch (securityLevel) {
      case "Very High":
        return [
          "Enables participation in classified or highly restricted business opportunities",
          "Protects irreplaceable intellectual property worth billions",
          "Creates long-term trust with stakeholders including governments",
          "Provides resilience against catastrophic events",
          "Supports premium pricing models based on security guarantees",
        ];
      case "High":
        return [
          "Enables expansion into regulated markets (healthcare, finance)",
          "Provides assurance to high-value customers with stringent requirements",
          "Reduces insurance premiums through demonstrated security",
          "Minimizes breach-related costs (avg. $4.45M per incident)",
          "Supports premium service offerings where security is a differentiator",
        ];
      case "Moderate":
        return [
          "Demonstrates security diligence to partners and customers",
          "Reduces operational disruptions by 80% compared to Basic level",
          "Prevents common security incidents affecting quarterly performance",
          "Provides competitive advantage over businesses with sub-standard security",
          "Meets requirements for standard business relationships",
        ];
      case "Low":
        return [
          "Satisfies minimum viable security for non-critical systems",
          "Minimal upfront costs allow budget allocation elsewhere",
          "Appropriate for public data and low-impact internal systems",
          "Provides basic protection against common threats",
          "Simple implementation with minimal maintenance overhead",
        ];
      default:
        return [
          "No security investment means all budget can go to other areas",
          "No value creation from security perspective",
          "High risk of security incidents with significant business impact",
          "Limited ability to participate in business relationships requiring security",
          "Potential regulatory issues in many industries",
        ];
    }
  };

  const valuePoints = getValuePoints();

  // Get ROI estimation based on security level
  const getROIEstimate = () => {
    switch (securityLevel) {
      case "Very High":
        return "5-10x for specialized high-security markets";
      case "High":
        return "3-5x when factoring in breach prevention";
      case "Moderate":
        return "2-3x for standard business operations";
      case "Low":
        return "1-2x for basic security implementation";
      default:
        return "Negative (high risk of losses)";
    }
  };

  const roiEstimate = getROIEstimate();

  // Color styling based on level
  const getLevelColorClass = () => {
    switch (securityLevel) {
      case "Very High":
        return "text-green-600 dark:text-green-400";
      case "High":
        return "text-blue-600 dark:text-blue-400";
      case "Moderate":
        return "text-yellow-600 dark:text-yellow-400";
      case "Low":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className={`text-lg font-medium ${getLevelColorClass()}`}>
          {securityLevel === "None"
            ? "No Value Creation"
            : `${securityLevel} Value Creation`}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Business value derived from this security profile:
        </p>
      </div>

      <ul className="space-y-2 text-sm">
        {valuePoints.map((point, index) => (
          <li
            key={index}
            className="flex items-start text-gray-700 dark:text-gray-300"
          >
            <span className={`mr-2 ${getLevelColorClass()}`}>•</span>
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Estimated ROI:</span>
          <span className={`font-medium ${getLevelColorClass()}`}>
            {roiEstimate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValueCreationWidget;
