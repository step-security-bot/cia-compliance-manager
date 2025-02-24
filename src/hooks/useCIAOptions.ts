export const availabilityOptions: Record<string, CIADetails> = {
  None: {
    capex: 0,
    opex: 0,
    impact: "No backup or recovery measures in place. Extremely high risk of downtime.",
    technical: "No controls or redundancies implemented.",
    description: "No Availability Controls: No backups or recovery options.",
  },
  Basic: {
    capex: 5,
    opex: 5,
    impact: "Suitable for non-critical systems.",
    technical:
      "Manual backup and recovery with multiple SPOFs (Single Points of Failure).",
    description: "Backup & Restore: Manual recovery, long RTO (~95% uptime).",
  },
  Moderate: {
    capex: 15,
    opex: 15,
    impact:
      "Works for mid-level critical systems, with faster recovery but some SPOFs remain.",
    technical:
      "Core systems are pre-configured but run only when needed; limited autoscaling.",
    description:
      "Pilot Light: Standby systems, automated recovery (~99% uptime).",
  },
  High: {
    capex: 25,
    opex: 40,
    impact:
      "Ideal for businesses with high uptime needs, such as online retailers.",
    technical:
      "Partial autoscaling and real-time data replication for faster failover.",
    description: "Warm Standby: Fast recovery, limited SPOFs (~99.9% uptime).",
  },
  "Very High": {
    capex: 60,
    opex: 70,
    impact:
      "Necessary for mission-critical industries (e.g., finance, healthcare).",
    technical:
      "Full redundancy, autoscaling across regions, with instant recovery and zero downtime.",
    description:
      "Multi-Site Active/Active: Real-time failover (~99.99% uptime).",
  },
};

export const integrityOptions: Record<string, CIADetails> = {
  None: {
    capex: 0,
    opex: 0,
    impact: "No data validation or integrity measures in place. High risk for data corruption.",
    technical: "No integrity or validation controls implemented.",
    description: "No Integrity Controls: No validation or audit mechanisms.",
  },
  Basic: {
    capex: 5,
    opex: 10,
    impact:
      "Risk of data inaccuracies and compliance failures. Suitable for low-compliance businesses.",
    technical: "No automated data checks; error-prone manual processes.",
    description: "Manual Validation: Minimal checks, low auditability.",
  },
  Moderate: {
    capex: 20,
    opex: 20,
    impact: "Meets basic compliance for industries like retail or general business.",
    technical:
      "Automated data checks and simple audit trails; moderate version control.",
    description:
      "Automated Validation: Enhanced accuracy and auditability.",
  },
  High: {
    capex: 35,
    opex: 50,
    impact: "Ideal for highly regulated industries (finance, healthcare).",
    technical:
      "Blockchain used to ensure data integrity, ensuring data cannot be tampered with.",
    description:
      "Blockchain Validation: Immutable data records, high traceability.",
  },
  "Very High": {
    capex: 60,
    opex: 70,
    impact:
      "Perfect for industries needing full real-time data validation, like stock exchanges and defense contractors.",
    technical:
      "Smart contracts ensure real-time, automated execution of data-driven business rules.",
    description:
      "Smart Contracts: Real-time validation, full audit traceability.",
  },
};

export const confidentialityOptions: Record<string, CIADetails> = {
  None: {
    capex: 0,
    opex: 0,
    impact: "No encryption or access control. Data is fully exposed.",
    technical: "No confidentiality measures implemented.",
    description: "No Confidentiality Controls: No encryption or access restrictions.",
  },
  Basic: {
    capex: 5,
    opex: 5,
    impact: "Suitable for public-facing data, no protection needed.",
    technical: "Minimal security; HTTPS may be used for basic protection.",
    description: "Public Data: No encryption or access control.",
  },
  Moderate: {
    capex: 15,
    opex: 20,
    impact:
      "Works for sensitive internal data (e.g., HR files, internal documents).",
    technical:
      "Strong encryption (AES-256), but with basic access control like password protection.",
    description:
      "Restricted Data: AES-256 encryption and basic monitoring.",
  },
  High: {
    capex: 30,
    opex: 40,
    impact: "Essential for industries handling confidential data.",
    technical: "MFA, robust encryption, continuous monitoring.",
    description:
      "Confidential Data: MFA, robust encryption, continuous monitoring.",
  },
  "Very High": {
    capex: 60,
    opex: 70,
    impact: "Critical for top-secret or highly confidential data.",
    technical:
      "Advanced encryption protocols, strict access controls, and continuous security monitoring.",
    description:
      "Top Secret Data: Maximum protection with advanced protocols.",
  },
};
