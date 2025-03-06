// Add testId to all widget interfaces
export interface WidgetBaseProps {
  testId?: string;
}

export interface CostEstimationWidgetProps extends WidgetBaseProps {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
  roi?: string;
  implementationTime?: string;
}

export interface ValueCreationWidgetProps extends WidgetBaseProps {
  securityLevel: string;
}

export interface SecuritySummaryWidgetProps extends WidgetBaseProps {
  securityLevel: string;
  availabilityLevel?: string; // Make this optional
  integrityLevel?: string; // Make this optional
  confidentialityLevel?: string; // Make this optional
}

export interface ComplianceStatusWidgetProps {
  securityLevel?: string;
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availability?: string; // Add compatibility with older usages
  integrity?: string; // Add compatibility with older usages
  confidentiality?: string; // Add compatibility with older usages
  testId?: string;
}

export interface CombinedBusinessImpactWidgetProps extends WidgetBaseProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  availabilityOptions: Record<string, any>;
  integrityOptions: Record<string, any>;
  confidentialityOptions: Record<string, any>;
}

// Import these interfaces in each component file
