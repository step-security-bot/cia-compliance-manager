import React, { useState, useMemo } from "react";

type CIADetails = {
  capex: number;
  opex: number;
  impact: string;
  technical: string;
  description: string;
};

// Custom color mapping for each level, including "None"
const levelColors: Record<string, { bg: string; text: string }> = {
  None: { bg: "#e5e7eb", text: "#374151" },        // Grey tones for no controls
  Basic: { bg: "#d1fae5", text: "#065f46" },         // Green hues
  Moderate: { bg: "#fef3c7", text: "#92400e" },      // Yellow hues
  High: { bg: "#ffedd5", text: "#c2410c" },          // Orange hues
  "Very High": { bg: "#fee2e2", text: "#991b1b" },     // Red hues
};

// Option data for each CIA category with an added "None" option

const availabilityOptions: Record<string, CIADetails> = {
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

const integrityOptions: Record<string, CIADetails> = {
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

const confidentialityOptions: Record<string, CIADetails> = {
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

// Reusable selection component with enhanced option labels and color styling
interface SelectionProps {
  label: string;
  options: Record<string, CIADetails>;
  value: string;
  onChange: (value: string) => void;
}

const Selection: React.FC<SelectionProps> = ({ label, options, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
    >
      {Object.keys(options).map((level) => (
        <option
          key={level}
          value={level}
          style={{
            backgroundColor: levelColors[level].bg,
            color: levelColors[level].text,
          }}
        >
          {level} - {options[level].description}
        </option>
      ))}
    </select>
    <p className="mt-2 text-sm" style={{ color: levelColors[value].text }}>
      Impact: {options[value].impact}
    </p>
  </div>
);

// Reusable detail card component for displaying analysis with color accents
interface DetailCardProps {
  category: string;
  level: string;
  details: CIADetails;
}

const DetailCard: React.FC<DetailCardProps> = ({ category, level, details }) => (
  <div
    className="p-4 border border-gray-300 dark:border-gray-700 rounded-md"
    style={{ backgroundColor: levelColors[level].bg }}
  >
    <h3 className="font-semibold" style={{ color: levelColors[level].text }}>
      {category} - {level}
    </h3>
    <p className="text-sm text-gray-700 dark:text-gray-200">
      CAPEX: {details.capex}% | OPEX: {details.opex}%
    </p>
    <p className="mt-1" style={{ color: levelColors[level].text }}>
      Impact: {details.impact}
    </p>
    <p className="mt-1 text-gray-600 dark:text-gray-400">
      Technical: {details.technical}
    </p>
  </div>
);

const CIAClassificationApp: React.FC = () => {
  const [availability, setAvailability] = useState<string>("None");
  const [integrity, setIntegrity] = useState<string>("None");
  const [confidentiality, setConfidentiality] = useState<string>("None");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const availabilityDetail = availabilityOptions[availability];
  const integrityDetail = integrityOptions[integrity];
  const confidentialityDetail = confidentialityOptions[confidentiality];

  // Memoize cost calculations to improve performance
  const { totalCapex, totalOpex } = useMemo(() => {
    const totalCapex =
      availabilityDetail.capex +
      integrityDetail.capex +
      confidentialityDetail.capex;
    const totalOpex =
      availabilityDetail.opex +
      integrityDetail.opex +
      confidentialityDetail.opex;
    return { totalCapex, totalOpex };
  }, [availabilityDetail, integrityDetail, confidentialityDetail]);

  // Determine solution size based on total CAPEX percentage
  const isSmallSolution = totalCapex <= 60;
  const capexEstimate = isSmallSolution ? "$10,000" : "$1,000,000";
  const opexEstimate = isSmallSolution ? "$500" : "$50,000";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              CIA Classification App for PartyRock AWS
            </h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Selection
              label="Availability Level"
              options={availabilityOptions}
              value={availability}
              onChange={setAvailability}
            />
            <Selection
              label="Integrity Level"
              options={integrityOptions}
              value={integrity}
              onChange={setIntegrity}
            />
            <Selection
              label="Confidentiality Level"
              options={confidentialityOptions}
              value={confidentiality}
              onChange={setConfidentiality}
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Real-Time Cost Estimates
            </h2>
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-md">
              <p className="text-gray-700 dark:text-gray-200">
                Total CAPEX Percentage: {totalCapex}%
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Total OPEX Percentage: {totalOpex}%
              </p>
              <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">
                Estimated CAPEX: {capexEstimate}
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                Estimated OPEX: {opexEstimate}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isSmallSolution
                  ? "Small solution estimation based on lower risk configuration."
                  : "Large solution estimation for high-criticality deployment."}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Detailed Analysis
            </h2>
            <div className="space-y-6">
              <DetailCard
                category="Availability"
                level={availability}
                details={availabilityDetail}
              />
              <DetailCard
                category="Integrity"
                level={integrity}
                details={integrityDetail}
              />
              <DetailCard
                category="Confidentiality"
                level={confidentiality}
                details={confidentialityDetail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;

