[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatNumber

# Function: formatNumber()

> **formatNumber**(`value`, `decimalPlaces?`): `string`

Defined in: [utils/formatUtils.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/utils/formatUtils.ts#L236)

Format a number with thousands separators and optional decimal places

Provides locale-aware number formatting with thousands separators
and configurable decimal precision.

## Parameters

### value

`number`

Number to format

### decimalPlaces?

`number`

Optional number of decimal places to display

## Returns

`string`

Formatted number string with separators

## Example

```typescript
formatNumber(1234567)          // "1,234,567"
formatNumber(1234.5678)        // "1,234.568" (locale dependent)
formatNumber(1234.5678, 2)     // "1234.57"
formatNumber(999.999, 1)       // "1000.0"
```
