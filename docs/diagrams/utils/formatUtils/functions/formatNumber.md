[**CIA Compliance Manager — UML Diagrams v1.1.78**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatNumber

# Function: formatNumber()

> **formatNumber**(`value`, `decimalPlaces?`): `string`

Defined in: [utils/formatUtils.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/326f5e224f54a8645f7aa8019136892910008a47/src/utils/formatUtils.ts#L227)

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
