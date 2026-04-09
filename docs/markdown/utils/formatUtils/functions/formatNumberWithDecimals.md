[**CIA Compliance Manager — Markdown Documentation v1.1.48**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatNumberWithDecimals

# Function: formatNumberWithDecimals()

> **formatNumberWithDecimals**(`value`, `decimalPlaces`): `string`

Defined in: [utils/formatUtils.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/utils/formatUtils.ts#L263)

Format a number with specified decimal places

Similar to formatNumber but always returns a string with exact
decimal places, without locale-based thousands separators.

## Parameters

### value

`number`

Number to format

### decimalPlaces

`number`

Exact number of decimal places to display

## Returns

`string`

Formatted number string with fixed decimals

## Example

```typescript
formatNumberWithDecimals(1234.5678, 2)   // "1234.57"
formatNumberWithDecimals(99.5, 3)        // "99.500"
formatNumberWithDecimals(1000, 0)        // "1000"
```
