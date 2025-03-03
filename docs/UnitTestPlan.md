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
// Mock availability options for testing
const mockAvailabilityOptions = createMockOptions(["None", "Low"]);

// Test component with mock options
render(
  <SecurityLevelWidget
    availabilityOptions={mockAvailabilityOptions}
    {...otherProps}
  />
);
```

### 2. Creating Complete SecurityLevelInfo

For tests requiring a complete SecurityLevelInfo structure:

```typescript
const mockSecurityInfo = createMockSecurityLevelInfo();

// Access security level properties directly
expect(mockSecurityInfo.Moderate.description).toBe(
  "Moderate level description"
);
```

### 3. Creating Mock Event Handlers

Use standard handlers for interaction tests:

```typescript
const handlers = createMockHandlers();

render(
  <SecurityLevelWidget
    setAvailability={handlers.setAvailability}
    setIntegrity={handlers.setIntegrity}
    setConfidentiality={handlers.setConfidentiality}
    {...otherProps}
  />
);

// Test interactions
await userEvent.selectOptions(screen.getByTestId("availability-select"), "Low");
expect(handlers.setAvailability).toHaveBeenCalledWith("Low");
```

## Constants-Driven Testing Strategy

### 1. Using appConstants for Test Validation

Use constants from `appConstants.ts` to verify UI text and behavior:

```typescript
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  UI_TEXT,
} from "../../constants/appConstants";

// Test using constants
it("displays correct security level text", () => {
  render(<SecurityLevelWidget {...props} />);
  expect(screen.getByText(SECURITY_LEVELS.LOW)).toBeInTheDocument();
});
```

### 2. Using Test Matchers from appConstants

Use test matchers and utilities defined in appConstants:

```typescript
import {
  getPartialTextMatcher,
  TEST_MATCHERS,
} from "../../constants/appConstants";

it("displays compliance framework names", () => {
  render(<ComplianceStatusWidget {...props} />);

  const frameworks = screen.getAllByText(
    TEST_MATCHERS.COMPLIANCE_FRAMEWORKS_REGEX
  );
  expect(frameworks.length).toBeGreaterThan(0);
});
```

### 3. Using Test Data from appConstants

Use test data objects from appConstants for consistent testing:

```typescript
import { TEST_DATA } from "../../constants/appConstants";

it("renders with test options", () => {
  render(<SomeComponent options={TEST_DATA.MOCK_OPTIONS.LOW} />);
  // Assertions...
});
```

## Testing Business Impact Details

When testing components that display business impact information:

```typescript
// Create options with businessImpactDetails
const optionsWithBusinessImpact = {
  ...mockAvailabilityOptions,
  High: {
    ...mockAvailabilityOptions.High,
    businessImpactDetails: {
      financialImpact: {
        description: "Financial impact description",
        riskLevel: "HIGH",
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
    category="Availability"
    level="High"
    options={optionsWithBusinessImpact}
  />
);

// Verify business impact details are displayed
expect(screen.getByText(/Financial impact/i)).toBeInTheDocument();
expect(screen.getByText(/\$500,000/i)).toBeInTheDocument();
```

## Mocking useCIAOptions Hook

For tests that need to mock the entire hook:

```typescript
import { vi } from "vitest";

// Mock the entire hook
vi.mock("../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: createMockOptions(["None", "Low"]),
    integrityOptions: createMockOptions(["None", "Low"]),
    confidentialityOptions: createMockOptions(["None", "Low"]),
  }),
}));
```

## TestID Selection Strategy

### 1. Component TestIDs

All major components should have a testid:

```tsx
<div data-testid="security-level-widget">...</div>
```

### 2. Interactive Element TestIDs

All interactive elements should have a testid:

```tsx
<button data-testid="tab-considerations">Considerations</button>
```

### 3. Dynamic Content TestIDs

Dynamic content should have predictable testids:

```tsx
<div data-testid={`framework-status-${frameworkId}`}>...</div>
```

### 4. TestID Selection Pattern

```typescript
// Preferred approach
const element = screen.getByTestId("component-name");

// For text content with possible HTML formatting
const text = screen.getByTestId("component-name").textContent;

// Avoid: Using complex CSS selectors
// const element = container.querySelector(".some-class > div:first-child");
```

## Test Implementation Guidelines

### 1. AAA Pattern

```typescript
it("updates when selection changes", async () => {
  // Arrange
  render(<SecurityLevelWidget {...props} />);
  const select = screen.getByTestId("availability-select");

  // Act
  await userEvent.selectOptions(select, "Low");

  // Assert
  expect(mockSetAvailability).toHaveBeenCalledWith("Low");
});
```

### 2. Mocking Dependencies

```typescript
import { vi } from "vitest";

// Mock hooks
vi.mock("../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => mockedCIAOptions,
}));

// Mock functions
const mockSetAvailability = vi.fn();
```

### 3. Testing Asynchronous Behavior

```typescript
it("loads data asynchronously", async () => {
  render(<AsyncComponent />);

  // Check loading state
  expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByTestId("data-container")).toBeInTheDocument();
  });

  // Verify loaded content
  expect(screen.getByText("Loaded Content")).toBeInTheDocument();
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

## Example Test File

```typescript
// SecurityLevelWidget.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { CIA_LABELS } from "../../constants/appConstants";
import { createMockOptions, createMockHandlers } from "../../tests/mockFactory";

describe("SecurityLevelWidget", () => {
  const handlers = createMockHandlers();

  const defaultProps = {
    availability: "None",
    integrity: "None",
    confidentiality: "None",
    setAvailability: handlers.setAvailability,
    setIntegrity: handlers.setIntegrity,
    setConfidentiality: handlers.setConfidentiality,
    availabilityOptions: createMockOptions(["None", "Low"]),
    integrityOptions: createMockOptions(["None", "Low"]),
    confidentialityOptions: createMockOptions(["None", "Low"]),
  };

  it("renders security level controls", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    expect(screen.getByTestId("security-level-controls")).toBeInTheDocument();
    expect(screen.getByText(CIA_LABELS.AVAILABILITY)).toBeInTheDocument();
    expect(screen.getByTestId("availability-select")).toHaveValue("None");
  });

  it("handles selection changes", async () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    const user = userEvent.setup();
    await user.selectOptions(screen.getByTestId("availability-select"), "Low");

    expect(handlers.setAvailability).toHaveBeenCalledWith("Low");
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
