import React, { useState } from "react";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "../common/StatusBadge";
import { CIA_TEST_IDS } from "../../constants/testIds";

interface SecurityLevelWidgetProps {
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  availabilityOptions: Record<string, any>;
  integrityOptions: Record<string, any>;
  confidentialityOptions: Record<string, any>;
  setAvailability?: (value: string) => void;
  setIntegrity?: (value: string) => void;
  setConfidentiality?: (value: string) => void;
  testId?: string;
}

const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availability = "None",
  integrity = "None",
  confidentiality = "None",
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  setAvailability,
  setIntegrity,
  setConfidentiality,
  testId = "security-level-controls",
}) => {
  const [hoverTechnicalInfo, setHoverTechnicalInfo] = useState<string | null>(
    null
  );

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (setAvailability) {
      setAvailability(e.target.value);
    }
  };

  const handleIntegrityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setIntegrity) {
      setIntegrity(e.target.value);
    }
  };

  const handleConfidentialityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (setConfidentiality) {
      setConfidentiality(e.target.value);
    }
  };

  const getColorForLevel = (level: string): string => {
    switch (level) {
      case SECURITY_LEVELS.NONE:
        return "bg-gray-200";
      case SECURITY_LEVELS.LOW:
        return "bg-yellow-200";
      case SECURITY_LEVELS.MODERATE:
        return "bg-orange-300";
      case SECURITY_LEVELS.HIGH:
        return "bg-red-400";
      case SECURITY_LEVELS.VERY_HIGH:
        return "bg-purple-500";
      default:
        return "bg-gray-200";
    }
  };

  const getAvailabilityDescription = () => {
    return (
      availabilityOptions[availability]?.description ||
      "No description available"
    );
  };

  const getIntegrityDescription = () => {
    return (
      integrityOptions[integrity]?.description || "No description available"
    );
  };

  const getConfidentialityDescription = () => {
    return (
      confidentialityOptions[confidentiality]?.description ||
      "No description available"
    );
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg"
      data-testid={testId}
    >
      <div
        className="mb-6 border-b pb-4 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}
      >
        <div className="flex items-center mb-2">
          <label
            htmlFor="availabilitySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.AVAILABILITY_LABEL}
          >
            Availability
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorForLevel(
              availability
            )}`}
            data-testid={CIA_TEST_IDS.AVAILABILITY_COLOR_INDICATOR}
          />
          <select
            id="availabilitySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={availability}
            onChange={handleAvailabilityChange}
            data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => setHoverTechnicalInfo("availability")}
            onMouseLeave={() => setHoverTechnicalInfo(null)}
            data-testid={CIA_TEST_IDS.AVAILABILITY_TECHNICAL_INFO}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}
        >
          {getAvailabilityDescription()}
        </div>
        {availabilityOptions[availability]?.uptime && (
          <div className="mt-2">
            <StatusBadge
              status="info"
              size="xs"
              testId="availability-uptime-badge"
            >
              {availabilityOptions[availability].uptime}
            </StatusBadge>
          </div>
        )}
      </div>

      <div
        className="mb-6 border-b pb-4 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
      >
        <div className="flex items-center mb-2">
          <label
            htmlFor="integritySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.INTEGRITY_LABEL}
          >
            Integrity
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorForLevel(
              integrity
            )}`}
            data-testid={CIA_TEST_IDS.INTEGRITY_COLOR_INDICATOR}
          />
          <select
            id="integritySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={integrity}
            onChange={handleIntegrityChange}
            data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => setHoverTechnicalInfo("integrity")}
            onMouseLeave={() => setHoverTechnicalInfo(null)}
            data-testid={CIA_TEST_IDS.INTEGRITY_TECHNICAL_INFO}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}
        >
          {getIntegrityDescription()}
        </div>
        {integrityOptions[integrity]?.validationMethod && (
          <div className="mt-2">
            <StatusBadge
              status="success"
              size="xs"
              testId="integrity-validation-badge"
            >
              {integrityOptions[integrity].validationMethod}
            </StatusBadge>
          </div>
        )}
      </div>

      <div className="mb-2" data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}>
        <div className="flex items-center mb-2">
          <label
            htmlFor="confidentialitySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_LABEL}
          >
            Confidentiality
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorForLevel(
              confidentiality
            )}`}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_COLOR_INDICATOR}
          />
          <select
            id="confidentialitySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={confidentiality}
            onChange={handleConfidentialityChange}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => setHoverTechnicalInfo("confidentiality")}
            onMouseLeave={() => setHoverTechnicalInfo(null)}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}
        >
          {getConfidentialityDescription()}
        </div>
        {confidentialityOptions[confidentiality]?.protectionMethod && (
          <div className="mt-2">
            <StatusBadge
              status="purple"
              size="xs"
              testId="confidentiality-protection-badge"
            >
              {confidentialityOptions[confidentiality].protectionMethod}
            </StatusBadge>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
