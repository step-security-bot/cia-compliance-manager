import React from "react";
import SecurityLevelWidget from "./widgets/SecurityLevelWidget";
import { useCIAOptions } from "../hooks/useCIAOptions";
import ValueDisplay from "./common/ValueDisplay";
import KeyValuePair from "./common/KeyValuePair";

interface SecurityLevelSelectorProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  availability,
  integrity,
  confidentiality,
  setAvailability,
  setIntegrity,
  setConfidentiality,
}) => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Security Profile</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Select the appropriate security levels for each component of your
          security profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <KeyValuePair
            label="Availability"
            value={
              <ValueDisplay
                value={availability}
                variant="primary"
                size="sm"
                testId="current-availability"
              />
            }
            testId="availability-kv"
            highlighted
          />
          <KeyValuePair
            label="Integrity"
            value={
              <ValueDisplay
                value={integrity}
                variant="success"
                size="sm"
                testId="current-integrity"
              />
            }
            testId="integrity-kv"
            highlighted
          />
          <KeyValuePair
            label="Confidentiality"
            value={
              <ValueDisplay
                value={confidentiality}
                variant="info"
                size="sm"
                testId="current-confidentiality"
              />
            }
            testId="confidentiality-kv"
            highlighted
          />
        </div>
      </div>

      <SecurityLevelWidget
        availability={availability}
        integrity={integrity}
        confidentiality={confidentiality}
        setAvailability={setAvailability}
        setIntegrity={setIntegrity}
        setConfidentiality={setConfidentiality}
        availabilityOptions={availabilityOptions}
        integrityOptions={integrityOptions}
        confidentialityOptions={confidentialityOptions}
      />
    </div>
  );
};

export default SecurityLevelSelector;
