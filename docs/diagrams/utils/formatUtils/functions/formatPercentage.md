[**CIA Compliance Manager — UML Diagrams v1.1.79**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatPercentage

# Function: formatPercentage()

> **formatPercentage**(`value`, `decimalPlaces?`): `string`

Defined in: [utils/formatUtils.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/a9ec77027ad49f5e9db798a4850ca95226a2431e/src/utils/formatUtils.ts#L65)

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
