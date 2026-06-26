[**CIA Compliance Manager — UML Diagrams v1.1.97**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatPercentage

# Variable: formatPercentage

> **formatPercentage**: (`value`, `decimalPlaces`) => `string`

Defined in: [utils/index.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/utils/index.ts#L86)

Formats a decimal as a percentage

Converts decimal values (0-1 range) to percentage strings with
configurable decimal places. Useful for displaying metrics like
uptime, completion rates, or risk reduction percentages.

## Parameters

### value

`number`

Decimal value where 1.0 = 100% (e.g., 0.75 = 75%)

### decimalPlaces?

`number` = `0`

Number of decimal places to display

## Returns

`string`

Formatted percentage string with % symbol

## Example

```typescript
formatPercentage(0.754, 1)    // "75.4%"
formatPercentage(0.99, 0)     // "99%"
formatPercentage(0.9999, 2)   // "99.99%"
formatPercentage(1, 0)        // "100%"
```
