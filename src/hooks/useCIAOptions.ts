import { CIADetails } from "../types/cia";

export const availabilityOptions: Record<string, CIADetails> = {
  None: {
    description: "No availability controls implemented",
    impact: "Business operations cannot be maintained during disruptions",
    technical: "No redundancy, no backup systems, no recovery plans.",
    capex: 0,
    opex: 0,
    businessImpact:
      "High risk of frequent outages and data loss with no recovery capability.",
    bg: "#ff0000", // Red
    text: "#ffffff", // White
    recommendations: [
      "Implement basic backup solutions",
      "Document recovery procedures",
    ],
  },
  Low: {
    description: "Basic backup & restore capability",
    impact: "Business operations severely impacted during disruptions",
    technical:
      "Manual backup procedures, basic recovery documentation, no redundancy.",
    capex: 5,
    opex: 5,
    businessImpact:
      "Downtime of hours to days. ~95% uptime (18+ days of downtime per year).",
    bg: "#ffa500", // Orange
    text: "#000000", // Black
    recommendations: [
      "Improve backup frequency",
      "Implement disaster recovery planning",
    ],
  },
  Moderate: {
    description: "Pilot light recovery capability",
    impact: "Some business operations can continue during minor disruptions",
    technical:
      "Core systems pre-configured with automated recovery scripts, limited redundancy.",
    capex: 15,
    opex: 15,
    businessImpact:
      "Downtime of minutes to hours. ~99% uptime (3-4 days of downtime per year).",
    bg: "#ffff00", // Yellow
    text: "#000000", // Black
    recommendations: [
      "Implement redundant infrastructure",
      "Automate failover processes",
    ],
  },
  High: {
    description: "Warm standby with fast recovery",
    impact: "Most business operations can continue during disruptions",
    technical:
      "Partially active redundant systems, real-time data replication, automated failover mechanisms.",
    capex: 25,
    opex: 40,
    businessImpact:
      "Minimal downtime. ~99.9% uptime (less than 9 hours of downtime per year).",
    bg: "#0000ff", // Blue
    text: "#ffffff", // White
    recommendations: [
      "Add geo-redundancy",
      "Implement continuous testing of recovery systems",
    ],
  },
  "Very High": {
    description: "Multi-site active/active deployment",
    impact: "Business operations continue seamlessly during disruptions",
    technical:
      "Fully redundant multi-region deployment, global load balancing, automatic failover with zero data loss.",
    capex: 60,
    opex: 70,
    businessImpact:
      "Near-continuous operation. ~99.99% uptime (less than 1 hour of downtime per year).",
    bg: "#00ff00", // Green
    text: "#000000", // Black
    recommendations: [
      "Regular chaos engineering testing",
      "Implement advanced observability",
    ],
  },
};

export const integrityOptions: Record<string, CIADetails> = {
  None: {
    description: "No integrity controls implemented",
    impact: "No assurance of data accuracy or validity",
    technical: "No data validation, no checksums, no audit trails.",
    capex: 0,
    opex: 0,
    businessImpact:
      "High risk of data corruption, tampering, and undetected changes.",
    bg: "#ff0000", // Red
    text: "#ffffff", // White
    recommendations: [
      "Implement basic data validation",
      "Start logging changes",
    ],
  },
  Low: {
    description: "Manual data validation",
    impact: "Basic assurance of data accuracy",
    technical:
      "Manual data entry verification, basic access logs, simple backup strategies.",
    capex: 5,
    opex: 10,
    businessImpact:
      "Some protection against accidental data corruption but limited defense against deliberate tampering.",
    bg: "#ffa500", // Orange
    text: "#000000", // Black
    recommendations: [
      "Add automated data validation",
      "Implement checksum verification",
    ],
  },
  Moderate: {
    description: "Automated data validation",
    impact: "Moderate assurance of data accuracy and validity",
    technical:
      "Automated data validation rules, audit logging systems, error detection mechanisms.",
    capex: 20,
    opex: 20,
    businessImpact:
      "Good protection against most corruption scenarios with audit capabilities for compliance needs.",
    bg: "#ffff00", // Yellow
    text: "#000000", // Black
    recommendations: [
      "Implement cryptographic signing",
      "Add comprehensive audit logging",
    ],
  },
  High: {
    description: "Blockchain validation with immutable records",
    impact: "High assurance of data accuracy and validity",
    technical:
      "Distributed ledger solutions, cryptographic verification, complete audit trails.",
    capex: 35,
    opex: 50,
    businessImpact:
      "High assurance of data integrity with tamper-evident records and full auditability.",
    bg: "#0000ff", // Blue
    text: "#ffffff", // White
    recommendations: [
      "Implement zero-trust architecture",
      "Add advanced threat detection",
    ],
  },
  "Very High": {
    description: "Smart contract validation",
    impact: "Highest assurance of data accuracy and validity",
    technical:
      "Smart contract execution, automated governance rules, advanced cryptography, real-time compliance verification.",
    capex: 60,
    opex: 70,
    businessImpact:
      "Highest level of data integrity with tamper-proof operations and real-time validation.",
    bg: "#00ff00", // Green
    text: "#000000", // Black
    recommendations: [
      "Regular cryptographic algorithm rotation",
      "Implement quantum-resistant algorithms",
    ],
  },
};

export const confidentialityOptions: Record<string, CIADetails> = {
  None: {
    description: "No confidentiality controls implemented",
    impact: "No protection for sensitive information",
    technical: "No encryption, no access controls, data fully accessible.",
    capex: 0,
    opex: 0,
    businessImpact:
      "All data is effectively public and can be accessed by anyone.",
    bg: "#ff0000", // Red
    text: "#ffffff", // White
    recommendations: [
      "Implement basic access controls",
      "Add data classification",
    ],
  },
  Low: {
    description: "Basic access controls",
    impact: "Minimal protection for sensitive information",
    technical: "Basic HTTPS, simple authentication, minimal access controls.",
    capex: 5,
    opex: 5,
    businessImpact:
      "Suitable only for public-facing information with minimal protection needs.",
    bg: "#ffa500", // Orange
    text: "#000000", // Black
    recommendations: [
      "Implement encryption at rest",
      "Add multi-factor authentication",
    ],
  },
  Moderate: {
    description: "Standard encryption and access management",
    impact: "Moderate protection for sensitive information",
    technical:
      "Strong encryption at rest and in transit, role-based access control, security monitoring.",
    capex: 15,
    opex: 20,
    businessImpact:
      "Adequate for protecting most internal business information but not highly sensitive data.",
    bg: "#ffff00", // Yellow
    text: "#000000", // Black
    recommendations: [
      "Implement data loss prevention",
      "Add security information and event monitoring",
    ],
  },
  High: {
    description: "Enhanced security with MFA and monitoring",
    impact: "High protection for sensitive information",
    technical:
      "Multi-factor authentication systems, advanced encryption, SIEM solutions, DLP controls, privileged access management.",
    capex: 30,
    opex: 40,
    businessImpact:
      "Strong protection for sensitive customer and financial data with good regulatory compliance.",
    bg: "#0000ff", // Blue
    text: "#ffffff", // White
    recommendations: [
      "Implement zero trust network access",
      "Add automated threat hunting",
    ],
  },
  "Very High": {
    description: "Military-grade protection",
    impact: "Highest protection for sensitive information",
    technical:
      "Quantum-resistant algorithms, hardware security modules, air-gapped systems, advanced threat detection, physical security controls.",
    capex: 50,
    opex: 60,
    businessImpact:
      "Highest level of protection for classified or extremely valuable data against sophisticated attacks.",
    bg: "#00ff00", // Green
    text: "#000000", // Black
    recommendations: [
      "Regular security posture assessment",
      "Implement next-gen security operations",
    ],
  },
};

export default {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
};

// Export CIADetails for backward compatibility
export type { CIADetails } from "../types/cia";
