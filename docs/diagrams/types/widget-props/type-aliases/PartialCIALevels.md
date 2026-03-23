[**CIA Compliance Manager — UML Diagrams v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / PartialCIALevels

# Type Alias: PartialCIALevels

> **PartialCIALevels** = `Partial`\<[`CIALevelsOnly`](CIALevelsOnly.md)\>

Defined in: [types/widget-props.ts:374](https://github.com/Hack23/cia-compliance-manager/blob/93d28e2dddb40364acafb5aab5b0a96fcc590cc8/src/types/widget-props.ts#L374)

Make all CIA levels optional

Useful for partial updates or default values.

## Example

```typescript
const partialLevels: PartialCIALevels = {
  availabilityLevel: 'High'
  // other levels are optional
};
```
