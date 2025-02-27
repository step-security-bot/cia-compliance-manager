import React from "react";

interface ImpactAnalysisWidgetProps {
  category: "Availability" | "Integrity" | "Confidentiality";
  level: string;
}

const ImpactAnalysisWidget: React.FC<ImpactAnalysisWidgetProps> = ({
  category,
  level,
}) => {
  const impacts = {
    Availability: {
      Basic:
        "Frequent outages (up to 5% downtime annually) could result in lost revenue during business hours, customer frustration, and inefficient operations.",
      Moderate:
        "Improved uptime (99% availability) limits disruptions to around 3.65 days per year, reducing lost revenue and maintaining operational continuity for most business functions.",
      High: "Near-continuous service (99.9% uptime) limits disruptions to less than 9 hours annually, preserving revenue streams, maintaining brand reputation, and ensuring customer satisfaction.",
      "Very High":
        "Continuous operation (99.99% uptime) with less than 1 hour of downtime annually preserves mission-critical functions, maintains cash flow during crisis events, and protects market position.",
      None: "No availability controls may lead to frequent and extended outages with significant business disruption.",
    },
    Integrity: {
      Basic:
        "Risk of data corruption or loss without proper backup could necessitate costly manual reconstruction, lead to erroneous business decisions, and potentially violate compliance requirements.",
      Moderate:
        "Automated validation helps prevent most data corruption issues, preserving decision quality and reducing error correction costs.",
      High: "Immutable records and blockchain validation virtually eliminate data tampering and corruption risks, enabling high-confidence business decisions.",
      "Very High":
        "Advanced cryptographic validation through smart contracts creates tamper-proof operational environments, essential where data corruption could have catastrophic consequences.",
      None: "No data integrity controls may result in corrupted data going undetected, leading to flawed analytics and decisions.",
    },
    Confidentiality: {
      Basic:
        "Limited protection means sensitive information could be exposed, leading to competitive disadvantage, customer trust erosion, and potential regulatory penalties.",
      Moderate:
        "Standard encryption and access controls protect sensitive internal data from common threats, helping meet basic compliance requirements.",
      High: "Robust protection for sensitive data prevents most breaches, avoiding regulatory penalties that could reach millions of dollars.",
      "Very High":
        "Military-grade protection with quantum-safe encryption safeguards against even state-sponsored attackers, protecting intellectual property worth billions.",
      None: "No confidentiality controls mean all data is effectively public and accessible to anyone.",
    },
  };

  const icons = {
    Availability: "🕒",
    Integrity: "🛡️",
    Confidentiality: "🔐",
  };

  const colorClasses = {
    Availability: "bg-blue-50 dark:bg-blue-900/20",
    Integrity: "bg-green-50 dark:bg-green-900/20",
    Confidentiality: "bg-purple-50 dark:bg-purple-900/20",
  };

  const impact =
    impacts[category][level as keyof typeof impacts.Availability] ||
    impacts[category].None;

  return (
    <div className="p-2">
      <div className="flex items-center mb-3">
        <span className="text-xl mr-2">{icons[category]}</span>
        <h4 className="text-md font-medium">{category} Impact</h4>
      </div>
      <div className={`${colorClasses[category]} p-3 rounded-md`}>
        <p className="text-sm">{impact}</p>
      </div>
    </div>
  );
};

export default ImpactAnalysisWidget;
