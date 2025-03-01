# Cypress Testing Framework

## Structure

```
cypress/
├── e2e/                    # Test files
│   ├── smoke/              # Smoke tests (fast, reliable)
│   ├── core-behaviors/     # Core behavior tests (key interactions)
│   └── business-outcomes/  # Business outcome tests (value features)
├── fixtures/               # Test data
├── support/                # Support code
│   ├── commands.ts         # Custom Cypress commands
│   └── appConstantsHelper.ts # Constants and helpers
├── TestPlan.md             # Test planning documentation
└── README.md               # This file
```

## Test Categories

### 1. Smoke Tests

Quick tests to verify that the application loads and core functionality is accessible.

Example: `cypress/e2e/smoke/dashboard-loads.cy.ts`

### 2. Core Behaviors

Tests that verify key user interactions and functionality.

Examples:

- `cypress/e2e/core-behaviors/toggle-display-theme.cy.ts`
- `cypress/e2e/core-behaviors/set-security-levels.cy.ts`

### 3. Business Outcomes

Tests that focus on business value and key outcomes for users.

Examples:

- `cypress/e2e/business-outcomes/view-compliance-status.cy.ts`
- `cypress/e2e/business-outcomes/review-security-impact.cy.ts`
- `cypress/e2e/business-outcomes/assess-security-costs.cy.ts`

## Test Development Best Practices

### Use Data Test IDs

```typescript
// Good
cy.get('[data-testid="availability-select"]').select("High");

// Avoid
cy.get("select").first().select("High");
```

### Add Proper Waiting Strategies

```typescript
// Good
cy.get('[data-testid="radar-chart"]').should("exist");

// Avoid
cy.wait(1000);
```

### Write Robust Selectors

```typescript
// Good: Multiple strategies to find theme button
cy.get("body").then(($body) => {
  const toggleButton = $body.find(
    '[data-testid="theme-toggle"], button:contains("Dark"), button:contains("Light")'
  );
  if (toggleButton.length) {
    cy.wrap(toggleButton).first().click();
  }
});

// Avoid
cy.get('[data-testid="theme-toggle"]').click();
```

### Use Constants for Test Data

```typescript
// Good
import { SECURITY_LEVELS } from "../../support/appConstantsHelper";
cy.get(selector).select(SECURITY_LEVELS.HIGH);

// Avoid
cy.get(selector).select("High");
```

### Add Descriptive Test Names

```typescript
// Good
it("displays the application title", () => {
  // test code
});

// Avoid
it("test 1", () => {
  // test code
});
```

## Running Tests

- `npm run test:e2e` - Run all tests headless
- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run -- --spec "cypress/e2e/smoke/*.cy.ts"` - Run just smoke tests

## Handling Test Failures

- Screenshots automatically captured in `cypress/screenshots`
- Videos recorded in `cypress/videos`
- Check Cypress dashboard for detailed results

## Custom Commands

We've added several custom commands to make testing easier:

```typescript
// Ensure the React app has fully loaded
cy.ensureAppLoaded();

// Set security levels for all three categories
cy.setSecurityLevels(availabilityLevel, integrityLevel, confidentialityLevel);

// Helper for debugging page elements
cy.logPageElements();
```
