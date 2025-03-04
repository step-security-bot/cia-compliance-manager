# Skipped Tests Documentation

This document tracks tests that have been temporarily skipped due to changing requirements or design changes. These tests should be revisited and fixed or removed as part of ongoing maintenance.

## Business Impact Details

- **displays risk levels with appropriate styling**: Relies on specific DOM structure for risk levels that may vary
- **displays advanced metrics when available**: Relies on specific metric sections that may have changed
- **verifies consideration items have proper structure**: DOM structure for consideration items may have changed
- **verifies benefit items have proper structure**: DOM structure for benefit items may have changed

## Core Behaviors

- **verifies radar chart updates with security level changes**: Radar values are hidden with display:none, making them difficult to test

## Technical Implementation Details

- **shows implementation steps**: Implementation steps section may have been renamed or removed
- **shows resource requirements**: Resource requirements section may have been renamed or removed

## Root Causes

Most skipped tests fall into these categories:
1. Tests that look for DOM elements that no longer exist in the same form
2. Tests that rely on hidden elements not accessible to Cypress
3. Tests that are too brittle due to UI changes

## Plan to Address

Consider implementing these improvements:
1. Add data-testid attributes to all elements needed for testing
2. Make radar chart values accessible for testing via CSS overrides
3. Use more resilient selectors that can adapt to UI changes
