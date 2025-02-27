import React from "react";

interface SecurityLevelWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  availabilityOptions: Record<string, any>;
  integrityOptions: Record<string, any>;
  confidentialityOptions: Record<string, any>;
}

const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  setAvailability,
  setIntegrity,
  setConfidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
  // Get all the levels from the first option object
  const securityLevels = Object.keys(availabilityOptions);

  return (
    <div className="space-y-4" data-testid="security-level-controls">
      <div className="mb-4">
        <label
          htmlFor="availability-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Availability
        </label>
        <select
          id="availability-select"
          data-testid="availability-select"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          {securityLevels.map((level) => (
            <option key={`avail-${level}`} value={level}>
              {level}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {availabilityOptions[availability]?.description ||
            "No description available."}
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="integrity-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Integrity
        </label>
        <select
          id="integrity-select"
          data-testid="integrity-select"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={integrity}
          onChange={(e) => setIntegrity(e.target.value)}
        >
          {securityLevels.map((level) => (
            <option key={`integ-${level}`} value={level}>
              {level}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {integrityOptions[integrity]?.description ||
            "No description available."}
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="confidentiality-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Confidentiality
        </label>
        <select
          id="confidentiality-select"
          data-testid="confidentiality-select"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={confidentiality}
          onChange={(e) => setConfidentiality(e.target.value)}
        >
          {securityLevels.map((level) => (
            <option key={`conf-${level}`} value={level}>
              {level}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {confidentialityOptions[confidentiality]?.description ||
            "No description available."}
        </p>
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
