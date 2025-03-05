import React, { useState, useEffect } from "react";
import SecurityLevelWidget from "./widgets/SecurityLevelWidget";
import KeyValuePair from "./common/KeyValuePair";
import { useCIAOptions } from "../hooks/useCIAOptions";
import { CIA_LABELS } from "../constants/appConstants";
import { COMMON_COMPONENT_TEST_IDS } from "../constants/testIds";

export interface SecurityLevelSelectorProps {
  initialAvailability?: string;
  initialIntegrity?: string;
  initialConfidentiality?: string;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  showSelectionSummary?: boolean;
  disabled?: boolean;
  testId?: string;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  initialAvailability = "None",
  initialIntegrity = "None",
  initialConfidentiality = "None",
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  availabilityOptions: propAvailabilityOptions,
  integrityOptions: propIntegrityOptions,
  confidentialityOptions: propConfidentialityOptions,
  showSelectionSummary = true,
  disabled = false,
  testId = "security-level-selector",
}) => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [integrity, setIntegrity] = useState(initialIntegrity);
  const [confidentiality, setConfidentiality] = useState(
    initialConfidentiality
  );
  const {
    availabilityOptions: hookAvailabilityOptions,
    integrityOptions: hookIntegrityOptions,
    confidentialityOptions: hookConfidentialityOptions,
  } = useCIAOptions();

  // Use prop options if provided, otherwise use options from the hook
  const availabilityOptions =
    propAvailabilityOptions || hookAvailabilityOptions;
  const integrityOptions = propIntegrityOptions || hookIntegrityOptions;
  const confidentialityOptions =
    propConfidentialityOptions || hookConfidentialityOptions;

  useEffect(() => {
    setAvailability(initialAvailability);
  }, [initialAvailability]);

  useEffect(() => {
    setIntegrity(initialIntegrity);
  }, [initialIntegrity]);

  useEffect(() => {
    setConfidentiality(initialConfidentiality);
  }, [initialConfidentiality]);

  // Handle availability change
  const handleAvailabilityChange = (level: string) => {
    setAvailability(level);
    if (onAvailabilityChange) {
      onAvailabilityChange(level);
    }
  };

  // Handle integrity change
  const handleIntegrityChange = (level: string) => {
    setIntegrity(level);
    if (onIntegrityChange) {
      onIntegrityChange(level);
    }
  };

  // Handle confidentiality change
  const handleConfidentialityChange = (level: string) => {
    setConfidentiality(level);
    if (onConfidentialityChange) {
      onConfidentialityChange(level);
    }
  };

  return (
    <div data-testid={testId}>
      <SecurityLevelWidget
        availability={availability}
        integrity={integrity}
        confidentiality={confidentiality}
        setAvailability={handleAvailabilityChange}
        setIntegrity={handleIntegrityChange}
        setConfidentiality={handleConfidentialityChange}
        availabilityOptions={availabilityOptions}
        integrityOptions={integrityOptions}
        confidentialityOptions={confidentialityOptions}
      />

      {showSelectionSummary && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}>
            <KeyValuePair
              label={CIA_LABELS.AVAILABILITY}
              value={availability}
              testId={COMMON_COMPONENT_TEST_IDS.AVAILABILITY_KV}
            />
          </div>
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}>
            <KeyValuePair
              label={CIA_LABELS.INTEGRITY}
              value={integrity}
              testId={COMMON_COMPONENT_TEST_IDS.INTEGRITY_KV}
            />
          </div>
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}>
            <KeyValuePair
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentiality}
              testId={COMMON_COMPONENT_TEST_IDS.CONFIDENTIALITY_KV}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
