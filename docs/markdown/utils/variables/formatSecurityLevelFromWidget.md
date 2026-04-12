[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / formatSecurityLevelFromWidget

# Variable: formatSecurityLevelFromWidget

> **formatSecurityLevelFromWidget**: (`level`) => `string`

Defined in: [utils/index.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/index.ts#L147)

Format security level string to the standardized format

Normalizes security level strings to match the SecurityLevel enum values,
handling case variations and trimming whitespace. Essential for ensuring
consistent level representation across the application.

## Parameters

### level

`string` \| `null` \| `undefined`

Security level string to format

## Returns

`string`

Formatted security level matching SecurityLevel enum

## Example

```typescript
formatSecurityLevel('high')        // 'High'
formatSecurityLevel('VERY HIGH')   // 'Very High'
formatSecurityLevel('  low  ')     // 'Low'
formatSecurityLevel(null)          // 'None'
formatSecurityLevel(undefined)     // 'None'
formatSecurityLevel('invalid')     // 'None' (defaults to None)
```
