import React, { useState } from "react";
import {
  CIA_LABELS,
  CIA_DESCRIPTIONS,
  CIA_COMPONENT_ICONS,
} from "../../constants/appConstants";
import { CIA_TEST_IDS } from "../../constants/testIds";
import SecurityLevelSelector from "../SecurityLevelSelector";

interface SecurityLevelWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  disabled?: boolean;
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
  disabled = false,
}) => {
  // Use the SecurityLevelSelector component to handle the selections
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg"
      data-testid="security-level-controls"
    >
      <SecurityLevelSelector
        initialAvailability={availability}
        initialIntegrity={integrity}
        initialConfidentiality={confidentiality}
        onAvailabilityChange={setAvailability}
        onIntegrityChange={setIntegrity}
        onConfidentialityChange={setConfidentiality}
        availabilityOptions={availabilityOptions}
        integrityOptions={integrityOptions}
        confidentialityOptions={confidentialityOptions}
        disabled={disabled}
        testId="security-level-selector"
      />
    </div>
  );
};

export default SecurityLevelWidget;
