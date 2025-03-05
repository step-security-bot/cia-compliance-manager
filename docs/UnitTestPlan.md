# CIA Compliance Manager Unit Test Plan

## Testing Strategy Overview

The unit testing strategy follows a component-based approach focusing on:

1. **Component Isolation**: Testing components in isolation with mocked dependencies
2. **Constant-Driven Validation**: Using centralized constants for test validation
3. **Data-testid Selection**: Using testid attributes for reliable element selection
4. **Behavior Verification**: Validating component behavior rather than implementation

## Test Configuration

The unit tests use:

- **Vitest**: Testing framework integrated with Vite
- **React Testing Library**: Component testing utilities
- **jsdom**: Browser-like environment for tests
- **setupTests.ts**: Global test setup and mocks

## Understanding CIA Options Structure

The application uses three key option sets that should be properly mocked in tests:

1. **Availability Options**
2. **Integrity Options**
3. **Confidentiality Options**

Each option set follows this structure:

```typescript
Record<string, CIADetails>;
```

where keys are security levels ("None", "Low", etc.) and values contain details about that security level.

## Test Categories

### 1. Component Rendering Tests

Tests that verify components render correctly with different props and states.

| Test Type           | Description                             | Example Pattern                                             |
| ------------------- | --------------------------------------- | ----------------------------------------------------------- |
| Basic Rendering     | Verify component renders without errors | `it("renders without errors", () => {...})`                 |
| Prop Variations     | Test different prop combinations        | `it("renders with different security levels", () => {...})` |
| Conditional Content | Test content that appears conditionally | `it("shows error state when appropriate", () => {...})`     |

### 2. Component Interaction Tests

Tests that verify user interactions work correctly.

| Test Type           | Description                          | Example Pattern                                           |
| ------------------- | ------------------------------------ | --------------------------------------------------------- |
| Click Events        | Test button clicks and actions       | `it("handles click events", async () => {...})`           |
| Form Interactions   | Test form inputs and submissions     | `it("updates when selections change", async () => {...})` |
| Custom Interactions | Test component-specific interactions | `it("toggles between tabs", async () => {...})`           |

### 3. State Management Tests

Tests that verify component state changes correctly.

| Test Type     | Description                           | Example Pattern                                                 |
| ------------- | ------------------------------------- | --------------------------------------------------------------- |
| Initial State | Verify initial component state        | `it("has correct default values", () => {...})`                 |
| State Updates | Test state changes after interactions | `it("updates state after selection", async () => {...})`        |
| Derived State | Test calculations from props/state    | `it("calculates compliance percentage correctly", () => {...})` |

### 4. Edge Cases and Error Handling

Tests that verify component behavior with invalid inputs or edge cases.

| Test Type      | Description                      | Example Pattern                                         |
| -------------- | -------------------------------- | ------------------------------------------------------- |
| Invalid Inputs | Test handling of invalid props   | `it("handles invalid security levels", () => {...})`    |
| Missing Data   | Test component with missing data | `it("shows fallback for missing options", () => {...})` |
| Overflow Cases | Test boundary conditions         | `it("caps progress bar values at 100%", () => {...})`   |

## Component Test Matrix

| Component                    | Rendering Tests | Interaction Tests | State Tests | Edge Cases |
| ---------------------------- | :-------------: | :---------------: | :---------: | :--------: |
| SecurityLevelWidget          |        ✓        |         ✓         |      ✓      |     ✓      |
| RadarChart                   |        ✓        |         ✓         |      ✓      |     ✓      |
| CostEstimationWidget         |        ✓        |         ✓         |      ✓      |     ✓      |
| BusinessImpactAnalysisWidget |        ✓        |         ✓         |      ✓      |     ✓      |
| ComplianceStatusWidget       |        ✓        |         ✓         |      ✓      |     ✓      |
| SecuritySummaryWidget        |        ✓        |         ✓         |      ✓      |     ✓      |
| ValueCreationWidget          |        ✓        |         ✓         |      ✓      |     ✓      |

## Using Mock Factory for Tests

The `mockFactory.ts` utility provides functions for creating consistent test data:

```typescript
import {
  createMockOptions,
  createMockSecurityLevelInfo,
  createTestWrapper,
  createMockHandlers,
} from "../tests/mockFactory";
```

### 1. Creating Mock Options

Use `createMockOptions()` to generate security level options for component testing:

```typescript
import { CIA_TEST_IDS, WIDGET_TEST_IDS } from "../../constants/testIds";
import { CIA_LABELS } from "../../constants/appConstants";

// Mock availability options for testing
const mockAvailabilityOptions = createMockOptions(["None", "Low"]);

// Test component with mock options
render(
  <SecurityLevelWidget
    availabilityOptions={mockAvailabilityOptions}
    {...otherProps}
  />
);

// Verify rendering using testIds and constants
const availabilityLabel = screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_LABEL);
expect(availabilityLabel).toHaveTextContent(CIA_LABELS.AVAILABILITY);
```

### 2. Creating Complete SecurityLevelInfo

For tests requiring a complete SecurityLevelInfo structure:

```typescript
import { WIDGET_TEST_IDS } from "../../constants/testIds";

const mockSecurityInfo = createMockSecurityLevelInfo();

render(
  <SecuritySummaryWidget
    securityInfo={mockSecurityInfo}
    securityLevel={SECURITY_LEVELS.MODERATE}
  />
);

// Verify using testIds and constants
const summaryTitle = screen.getByTestId(WIDGET_TEST_IDS.SECURITY_SUMMARY_TITLE);
expect(summaryTitle).toHaveTextContent(SECURITY_SUMMARY_TITLES.MODERATE);
```

### 3. Creating Mock Event Handlers

Use standard handlers for interaction tests:

```typescript
import { CIA_TEST_IDS } from "../../constants/testIds";

const handlers = createMockHandlers();

render(
  <SecurityLevelWidget
    setAvailability={handlers.setAvailability}
    setIntegrity={handlers.setIntegrity}
    setConfidentiality={handlers.setConfidentiality}
    {...otherProps}
  />
);

// Test interactions using testIds
await userEvent.selectOptions(
  screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT),
  SECURITY_LEVELS.LOW
);
expect(handlers.setAvailability).toHaveBeenCalledWith(SECURITY_LEVELS.LOW);
```

## Constants-Driven Testing Strategy

### 1. Using appConstants for Test Validation

Use constants from `appConstants.ts` to verify UI text and behavior:

```typescript
import { CIA_TEST_IDS } from "../../constants/testIds";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  UI_TEXT,
} from "../../constants/appConstants";

// Test using constants
it("displays correct security level text", () => {
  render(<SecurityLevelWidget {...props} />);

  const availabilitySelect = screen.getByTestId(
    CIA_TEST_IDS.AVAILABILITY_SELECT
  );
  expect(availabilitySelect).toHaveValue(SECURITY_LEVELS.LOW);

  const availabilityLabel = screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_LABEL);
  expect(availabilityLabel).toHaveTextContent(CIA_LABELS.AVAILABILITY);
});
```

### 2. Using Test Matchers from appConstants

Use test matchers and utilities defined in appConstants:

```typescript
import { FRAMEWORK_TEST_IDS } from "../../constants/testIds";
import {
  getPartialTextMatcher,
  TEST_MATCHERS,
} from "../../constants/appConstants";

it("displays compliance framework names", () => {
  render(<ComplianceStatusWidget {...props} />);

  // Find elements by testId first, then check their content
  const frameworkContainer = screen.getByTestId(
    FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER
  );
  const frameworkElements =
    within(frameworkContainer).getAllByTestId(/^framework-item-/);

  // Verify at least one framework is shown
  expect(frameworkElements.length).toBeGreaterThan(0);

  // Verify framework names match the expected pattern
  const frameworkTexts = frameworkElements.map((el) => el.textContent || "");
  expect(
    frameworkTexts.some((text) =>
      TEST_MATCHERS.COMPLIANCE_FRAMEWORKS_REGEX.test(text)
    )
  ).toBe(true);
});
```

### 3. Using Test Data from appConstants

Use test data objects from appConstants for consistent testing:

```typescript
import { CIA_TEST_IDS } from "../../constants/testIds";
import { TEST_DATA } from "../../constants/appConstants";

it("renders with test options", () => {
  render(
    <SecurityLevelWidget
      confidentialityOptions={TEST_DATA.MOCK_OPTIONS.LOW}
      data-testid="security-widget"
    />
  );

  // Find widget using testId
  const widget = screen.getByTestId("security-widget");
  expect(widget).toBeInTheDocument();

  // Verify content using test data
  const description = screen.getByTestId(
    CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION
  );
  expect(description).toHaveTextContent(TEST_DATA.MOCK_OPTIONS.LOW.description);
});
```

## Testing Business Impact Details

When testing components that display business impact information:

```typescript
import { BUSINESS_IMPACT_TEST_IDS, getTestId } from "../../constants/testIds";

// Create options with businessImpactDetails
const optionsWithBusinessImpact = {
  ...mockAvailabilityOptions,
  High: {
    ...mockAvailabilityOptions.High,
    businessImpactDetails: {
      financialImpact: {
        description: "Financial impact description",
        riskLevel: RISK_LEVELS.HIGH,
        annualRevenueLoss: "$500,000",
      },
      operationalImpact: {
        description: "Operational impact description",
        meanTimeToRecover: "24 hours",
      },
    },
  },
};

render(
  <BusinessImpactAnalysisWidget
    category={BUSINESS_IMPACT_CATEGORIES.FINANCIAL}
    level={SECURITY_LEVELS.HIGH}
    options={optionsWithBusinessImpact}
    data-testid="business-impact-widget"
  />
);

// Verify business impact details are displayed using testIds and constants
const widget = screen.getByTestId("business-impact-widget");
expect(widget).toBeInTheDocument();

const financialSection = screen.getByTestId(
  BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_SECTION
);
expect(financialSection).toHaveTextContent(/Financial impact description/i);

const riskBadge = screen.getByTestId(
  BUSINESS_IMPACT_TEST_IDS.FINANCIAL_RISK_BADGE
);
expect(riskBadge).toHaveTextContent(RISK_LEVELS.HIGH);
```

## Mocking useCIAOptions Hook

For tests that need to mock the entire hook:

```typescript
import { vi } from "vitest";
import { SECURITY_LEVELS } from "../../constants/appConstants";

// Mock the entire hook
vi.mock("../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
    integrityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
    confidentialityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
  }),
}));
```

## TestID Selection Strategy

### 1. Using Centralized Test ID Constants

All test IDs should be defined in the centralized `testIds.ts` file and imported where needed:

### 2. Component TestIDs

All major components should have a testid using the TEST_IDS constants:

```tsx
<div data-testid={WIDGET_TEST_IDS.SECURITY_LEVEL_CONTROLS}>...</div>
```

### 3. Interactive Element TestIDs

All interactive elements should have a testid that includes the element type and its purpose:

```tsx
<button data-testid="tab-considerations-button">Considerations</button>
<input data-testid="availability-select" />
<div data-testid="compliance-toggle-switch" />
```

### 4. Dynamic Content TestIDs

Dynamic content should have predictable testids using a consistent pattern:

```tsx
<div data-testid={`framework-status-${frameworkId}`}>...</div>
<div data-testid={`security-level-${level.toLowerCase()}`}>...</div>
<div data-testid={`risk-badge-${riskLevel.toLowerCase()}`}>...</div>
```

### 5. Container and Content TestIDs

Use specific testIds for containers and their content:

```tsx
<div data-testid="security-measures-container">
  <div data-testid="security-measure-availability">...</div>
  <div data-testid="security-measure-integrity">...</div>
  <div data-testid="security-measure-confidentiality">...</div>
</div>
```

### 6. TestID Selection Pattern

```typescript
import {
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  FRAMEWORK_TEST_IDS,
} from "../../constants/testIds";

// Preferred approach: Use getByTestId with constants
const element = screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_CONTROLS);

// For text content with possible HTML formatting
const text = screen.getByTestId(
  WIDGET_TEST_IDS.VALUE_CREATION_TITLE
).textContent;

// For finding multiple elements with similar testIds using regex
const frameworkPrefix = FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX;
const elements = screen.getAllByTestId(new RegExp(`^${frameworkPrefix}`));

// For finding elements within a container
const container = screen.getByTestId(SUMMARY_TEST_IDS.CIA_RATINGS);
const availabilityMeasure = within(container).getByTestId(
  SUMMARY_TEST_IDS.AVAILABILITY_MEASURE
);

// Avoid: Using string literals for test IDs
// const element = screen.getByTestId("security-level-controls"); // ❌

// Avoid: Using complex CSS selectors
// const element = container.querySelector(".some-class > div:first-child"); // ❌
```

## Test Implementation Guidelines

### 1. AAA Pattern (Using Constants and TestIDs)

```typescript
it("updates when selection changes", async () => {
  // Arrange
  render(<SecurityLevelWidget {...props} />);
  const select = screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT);

  // Act
  await userEvent.selectOptions(select, SECURITY_LEVELS.LOW);

  // Assert
  expect(mockSetAvailability).toHaveBeenCalledWith(SECURITY_LEVELS.LOW);
  const indicator = screen.getByTestId(
    CIA_TEST_IDS.AVAILABILITY_LEVEL_INDICATOR
  );
  expect(indicator).toHaveTextContent(SECURITY_LEVELS.LOW);
});
```

### 2. Mocking Dependencies

```typescript
import { vi } from "vitest";
import { SECURITY_LEVELS } from "../../constants/appConstants";

// Mock hooks
vi.mock("../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      [SECURITY_LEVELS.NONE]: {
        /* mock details */
      },
      [SECURITY_LEVELS.LOW]: {
        /* mock details */
      },
    },
    integrityOptions: {
      /* mock options */
    },
    confidentialityOptions: {
      /* mock options */
    },
  }),
}));

// Mock functions
const mockSetAvailability = vi.fn();
```

### 3. Testing Asynchronous Behavior (With TestIDs)

```typescript
import { WIDGET_TEST_IDS } from "../../constants/testIds";

it("loads data asynchronously", async () => {
  render(<AsyncComponent />);

  // Check loading state using testId
  expect(
    screen.getByTestId(WIDGET_TEST_IDS.LOADING_INDICATOR)
  ).toBeInTheDocument();

  // Wait for data to load, looking for a specific testId
  await waitFor(() => {
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.DATA_CONTAINER)
    ).toBeInTheDocument();
  });

  // Verify loaded content with testId and constants
  const contentTitle = screen.getByTestId(WIDGET_TEST_IDS.CONTENT_TITLE);
  expect(contentTitle).toHaveTextContent(
    UI_TEXT.WIDGET_TITLES.SECURITY_SUMMARY
  );
});
```

## Coverage Requirements

| Component Type  | Statement | Branch | Function | Line |
| --------------- | :-------: | :----: | :------: | :--: |
| Core Components |    95%    |  90%   |   95%    | 95%  |
| UI Widgets      |    90%    |  85%   |   85%    | 90%  |
| Utilities       |    95%    |  90%   |   95%    | 95%  |
| Hooks           |    95%    |  90%   |   95%    | 95%  |

### High Priority Testing Areas

Based on coverage reports, these areas need focused testing:

1. **SecurityLevelWidget.tsx** - Currently at 84% statement, 52% branch, 30% function coverage
2. **RadarChart.tsx** - Currently at 89% statement, 66% branch coverage
3. **useCIAOptions.ts** - Currently at 97% statement but 0% function coverage

## Example Test File (Using Constants and TestIDs)

```typescript
// SecurityLevelWidget.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import {
  CIA_LABELS,
  SECURITY_LEVELS,
  UI_TEXT,
  SECURITY_DESCRIPTIONS,
} from "../../constants/appConstants";
import { CIA_TEST_IDS, WIDGET_TEST_IDS } from "../../constants/testIds";
import { createMockOptions, createMockHandlers } from "../../tests/mockFactory";

describe("SecurityLevelWidget", () => {
  const handlers = createMockHandlers();

  const defaultProps = {
    availability: SECURITY_LEVELS.NONE,
    integrity: SECURITY_LEVELS.NONE,
    confidentiality: SECURITY_LEVELS.NONE,
    setAvailability: handlers.setAvailability,
    setIntegrity: handlers.setIntegrity,
    setConfidentiality: handlers.setConfidentiality,
    availabilityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
    integrityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
    confidentialityOptions: createMockOptions([
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
    ]),
  };

  it("renders security level controls", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Use testIds from constants
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_CONTROLS)
    ).toBeInTheDocument();

    // Verify contents with constants
    const availabilitySection = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SECTION
    );
    expect(availabilitySection).toBeInTheDocument();

    const availabilityLabel = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_LABEL
    );
    expect(availabilityLabel).toHaveTextContent(CIA_LABELS.AVAILABILITY);

    const availabilitySelect = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SELECT
    );
    expect(availabilitySelect).toHaveValue(SECURITY_LEVELS.NONE);

    // Verify description matches constants
    const availabilityDescription = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_DESCRIPTION
    );
    expect(availabilityDescription).toHaveTextContent(
      SECURITY_DESCRIPTIONS.NONE
    );
  });

  it("handles selection changes", async () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Use testId constants to find the select element
    const select = screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT);

    const user = userEvent.setup();
    await user.selectOptions(select, SECURITY_LEVELS.LOW);

    // Verify the handler was called with the constant value
    expect(handlers.setAvailability).toHaveBeenCalledWith(SECURITY_LEVELS.LOW);

    // Verify UI changes after selection
    expect(select).toHaveValue(SECURITY_LEVELS.LOW);
  });

  it("displays correct descriptions for each security level", async () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const user = userEvent.setup();
    const select = screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT);

    // Change selection and verify description updates
    await user.selectOptions(select, SECURITY_LEVELS.LOW);

    const description = screen.getByTestId(CIA_TEST_IDS.INTEGRITY_DESCRIPTION);
    expect(description).toHaveTextContent(SECURITY_DESCRIPTIONS.LOW);
  });
});
```

## Test File Structure

```
src/
├── components/
│   ├── Component.tsx
│   └── Component.test.tsx  // Test next to implementation
├── hooks/
│   ├── useHook.ts
│   └── useHook.test.ts     // Test next to implementation
└── tests/                  // Shared test utilities
    ├── mockFactory.ts      // Test mock factories
    ├── setupVitest.ts      // Vitest setup configuration
    ├── testConstants.ts    // Test-specific constants
    └── examples/           // Example test patterns
        └── IntegrationTestExample.test.tsx
```

## Test Isolation Best Practices

1. **Reset mocks between tests**: Use `vi.resetAllMocks()` in `afterEach`
2. **Cleanup render after each test**: RTL's cleanup happens automatically
3. **Avoid test interdependencies**: Each test should set up its own state
4. **Mock external dependencies**: Use vi.mock() for external services
5. **Use predictable test data**: Define test fixtures or constants

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run coverage

# Run tests in CI mode
npm run test:ci
```

## Continuous Improvement

1. **Weekly coverage reviews**: Identify areas needing more tests
2. **Refactoring test fixtures**: Improve reusability of test data
3. **Test performance optimization**: Identify slow tests
4. **Documentation updates**: Keep test plan updated as app evolves
