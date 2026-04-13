[**CIA Compliance Manager — UML Diagrams v1.1.51**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelPercentage

# Variable: getSecurityLevelPercentage

> **getSecurityLevelPercentage**: (`level`) => `string`

Defined in: [utils/index.ts:138](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/utils/index.ts#L138)

Provides a numerical representation of security levels for UI presentation

Converts security levels to percentage strings for use in progress bars,
gauges, and other visual indicators. Maps 0-4 scale to 0-100% range
in 25% increments.

## Parameters

### level

`string`

The security level (string or SecurityLevel enum)

## Returns

`string`

A percentage string (0%, 25%, 50%, 75%, or 100%)

## Example

```typescript
getSecurityLevelPercentage('None')        // "0%"
getSecurityLevelPercentage('Low')         // "25%"
getSecurityLevelPercentage('Moderate')    // "50%"
getSecurityLevelPercentage('High')        // "75%"
getSecurityLevelPercentage('Very High')   // "100%"

// Use in UI components
<ProgressBar value={getSecurityLevelPercentage(level)} />
```
