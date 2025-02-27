import React from "react";
import Selection from "../Selection";

interface SecurityLevelWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (value: string) => void;
  setIntegrity: (value: string) => void;
  setConfidentiality: (value: string) => void;
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
  return (
    <div className="space-y-2 p-2">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Select security levels for each component of the CIA triad to assess
        costs and impacts.
      </p>
      <Selection
        id="availability"
        label="Availability"
        value={availability}
        options={availabilityOptions}
        onChange={setAvailability}
        data-testid="availability-select"
      />
      <Selection
        id="integrity"
        label="Integrity"
        value={integrity}
        options={integrityOptions}
        onChange={setIntegrity}
        data-testid="integrity-select"
      />
      <Selection
        id="confidentiality"
        label="Confidentiality"
        value={confidentiality}
        options={confidentialityOptions}
        onChange={setConfidentiality}
        data-testid="confidentiality-select"
      />
    </div>
  );
};

export default SecurityLevelWidget;
