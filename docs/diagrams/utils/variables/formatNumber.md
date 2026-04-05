[**CIA Compliance Manager — UML Diagrams v1.1.45**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatNumber

# Variable: formatNumber

> **formatNumber**: (`value`, `decimalPlaces?`) => `string`

Defined in: [utils/index.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/568723154325dac17085672acf7cf8f6076f6c87/src/utils/index.ts#L96)

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
