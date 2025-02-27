import React from "react";

interface ValueCreationWidgetProps {
  securityLevel: string;
}

const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel,
}) => {
  const valuePoints = {
    Basic: [
      "Satisfies minimum viable security for non-critical systems",
      "Minimal upfront costs allow budget allocation to revenue-generating activities",
      "Appropriate for public data and systems with negligible impact if compromised",
    ],
    Moderate: [
      "Demonstrates security diligence to partners, customers, and regulators",
      "Reduces operational disruptions by 80% compared to Basic level",
      "Prevents common security incidents that could impact quarterly performance",
      "Provides competitive advantage over businesses with sub-standard security",
    ],
    High: [
      "Enables expansion into highly regulated markets and industries",
      "Provides assurance to high-value customers with stringent requirements",
      "Reduces insurance premiums through demonstrated security controls",
      "Minimizes breach-related costs that average $4.45 million per incident",
      "Supports premium service offerings where security is a differentiator",
    ],
    "Very High": [
      "Enables participation in classified or highly restricted opportunities",
      "Protects irreplaceable intellectual property and trade secrets",
      "Creates long-term trust with governments and regulated entities",
      "Provides resilience against catastrophic events",
      "Supports premium pricing models based on exceptional security guarantees",
    ],
    None: ["No specific value creation from security investments"],
  };

  const values =
    valuePoints[securityLevel as keyof typeof valuePoints] || valuePoints.None;

  return (
    <div className="p-2">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Security investments create value through:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {values.map((point, index) => (
          <li key={index} className="text-sm">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValueCreationWidget;
