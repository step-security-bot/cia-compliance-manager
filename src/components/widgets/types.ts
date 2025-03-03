import { CIADetails } from "../../types/cia";

// Define the props interface for SecurityLevelWidget
export interface SecurityLevelWidgetProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  availabilityOptions: Record<string, CIADetails>;
  integrityOptions: Record<string, CIADetails>;
  confidentialityOptions: Record<string, CIADetails>;
}

// Define mock component props
export type MockComponentProps = {
  [key: string]: any;
};
