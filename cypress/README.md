# Cypress Testing Framework

## Structure

```
cypress/
├── e2e/                    # Test files
│   ├── smoke/              # Smoke tests (fast, reliable)
│   ├── functional/         # Functional tests (comprehensive)
│   └── integration/        # Integration tests (complex flows)
├── fixtures/               # Test data
├── support/                # Support code
│   ├── pageObjects/        # Page object models
│   └── appConstantsHelper.ts # Constants and helpers
├── TestPlan.md             # Test planning documentation
└── README.md               # This file
```

## Test Development Best Practices

### 1. Use Page Objects

Always use page objects to encapsulate UI interactions:

```typescript
// Bad:
cy.get("select").first().select("High");

// Good:
dashboardPage.setSecurityLevel("availability", "High");
```

### 2. Use Test Data Fixtures

Store test data in fixtures instead of hardcoding:

```typescript
// Bad:
dashboardPage.setAllSecurityLevels({
  availability: "High",
  integrity: "High",
  confidentiality: "High",
});

// Good:
cy.fixture("securityProfiles").then((profiles) => {
  dashboardPage.setAllSecurityLevels(profiles.high);
});
```

### 3. Add Proper Waiting Strategies

Use appropriate waiting strategies:

```typescript
// Bad:
cy.wait(1000); // Arbitrary wait

// Good:
cy.contains("Security Summary").should("be.visible");
```

### 4. Add Proper Test Categories

Categorize tests by directory structure and naming conventions:

```typescript
// Smoke test (quick, reliable)
// Place in cypress/e2e/smoke/ directory
describe("Core App Features", () => {...});

// Functional test (detailed feature testing)
// Place in cypress/e2e/functional/ directory
describe("Security Configuration", () => {...});
```

You can use custom Cypress commands for filtering tests if needed:

```typescript
// In cypress/support/e2e.ts
Cypress.Commands.add("filterTests", (testType) => {
  if (Cypress.env("testFilter") && Cypress.env("testFilter") !== testType) {
    // Skip this test if it doesn't match the filter
    it.skip("Test skipped due to filter", () => {});
  }
});

// In your test file
describe("My Test Suite", () => {
  before(() => {
    cy.filterTests("smoke");
  });

  it("runs if filter matches", () => {
    // Test code here
  });
});
```

### 5. Handle Test Failures Gracefully

Add defensive coding to prevent flaky tests:

```typescript
// Bad:
cy.get('[data-testid="non-existent-element"]').click();

// Good:
cy.get("body").then(($body) => {
  if ($body.find('[data-testid="element"]').length) {
    cy.get('[data-testid="element"]').click();
  } else {
    cy.log("Element not found, skipping click");
  }
});
```

## Running Tests

- `npm run test:e2e` - Run all tests
- `npm run test:e2e:ci` - Run only CI-stable tests
- `npm run cypress:open` - Open Cypress Test Runner
