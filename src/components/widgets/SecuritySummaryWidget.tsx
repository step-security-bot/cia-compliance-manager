import React from "react";

interface SecuritySummaryWidgetProps {
  securityLevel: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
}) => {
  const summaries = {
    Basic: {
      title: "Basic Security",
      description:
        "Minimal investment, low protection, high risk of downtime or data breaches.",
      suitable: "Non-critical or public-facing systems",
      impact: "Up to 5% downtime annually (18 days/year)",
    },
    Moderate: {
      title: "Moderate Security",
      description:
        "Balanced approach to cost and protection for mid-sized companies.",
      suitable:
        "Standard business operations with some regulatory requirements",
      impact: "Around 99% uptime (3.65 days downtime/year)",
    },
    High: {
      title: "High Security",
      description: "Enhanced protection for systems where CIA are critical.",
      suitable: "Regulated industries like finance, healthcare, e-commerce",
      impact: "99.9% uptime (less than 9 hours downtime/year)",
    },
    "Very High": {
      title: "Very High Security",
      description: "Maximum protection for mission-critical systems.",
      suitable: "Defense, financial markets, critical infrastructure",
      impact: "99.99% uptime (less than 1 hour downtime/year)",
    },
    None: {
      title: "No Security Controls",
      description: "No specific security controls implemented.",
      suitable: "Not recommended for production systems",
      impact: "Unprotected from threats and disruptions",
    },
  };

  const summary =
    summaries[securityLevel as keyof typeof summaries] || summaries.None;

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case "Basic":
        return "ℹ️";
      case "Moderate":
        return "⚠️";
      case "High":
        return "🔐";
      case "Very High":
        return "🔒";
      default:
        return "📋";
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-3">
        <span className="text-xl mr-2">{getSecurityIcon(securityLevel)}</span>
        <h4 className="text-lg font-medium">{summary.title}</h4>
      </div>
      <p className="mb-3 text-sm">{summary.description}</p>
      <div className="space-y-2">
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
          <p className="text-xs text-gray-500 dark:text-gray-400">Best for</p>
          <p className="text-sm font-medium">{summary.suitable}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Business Impact
          </p>
          <p className="text-sm font-medium">{summary.impact}</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySummaryWidget;
