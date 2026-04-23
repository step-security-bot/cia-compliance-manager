[**CIA Compliance Manager — UML Diagrams v1.1.56**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelValue

# Variable: getSecurityLevelValue

> **getSecurityLevelValue**: (`level`) => `number`

Defined in: [utils/index.ts:139](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/utils/index.ts#L139)

Get numeric value for a security level (0-4)

Converts SecurityLevel enum values to numeric scores for comparison,
calculation, and sorting operations. Returns 0 for invalid levels.

## Parameters

### level

`string`

Security level to convert (SecurityLevel or string)

## Returns

`number`

Numeric value: None=0, Low=1, Moderate=2, High=3, Very High=4

## Example

```typescript
getSecurityLevelValue('None')         // 0
getSecurityLevelValue('Low')          // 1
getSecurityLevelValue('Moderate')     // 2
getSecurityLevelValue('High')         // 3
getSecurityLevelValue('Very High')    // 4
getSecurityLevelValue('invalid')      // 0 (invalid input)

// Use for comparison
const isHighEnough = getSecurityLevelValue(currentLevel) >= getSecurityLevelValue('High');
```
