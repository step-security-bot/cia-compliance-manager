[**CIA Compliance Manager — UML Diagrams v1.1.76**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatUptime

# Variable: formatUptime

> **formatUptime**: (`uptime`) => `string`

Defined in: [utils/index.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/51ee42c9c3b472e585f56fbb8f6773f8ab7e935a/src/utils/index.ts#L89)

Format uptime percentage for availability display

Normalizes uptime values which may be provided in different formats
(with or without % symbol, as string or number). Ensures consistent
percentage display format.

## Parameters

### uptime

`string`

Uptime value in various formats

## Returns

`string`

Formatted uptime string with % symbol

## Example

```typescript
formatUptime("99.9%")     // "99.9%" (already formatted)
formatUptime("99.9")      // "99.9%" (adds % symbol)
formatUptime("0.999")     // "99.9%" (converts decimal to percentage)
formatUptime("invalid")   // "invalid" (returns as-is if not parseable)
```
