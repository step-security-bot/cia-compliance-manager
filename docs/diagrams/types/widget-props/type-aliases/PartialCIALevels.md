[**CIA Compliance Manager — UML Diagrams v1.1.96**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / PartialCIALevels

# Type Alias: PartialCIALevels

> **PartialCIALevels** = `Partial`\<[`CIALevelsOnly`](CIALevelsOnly.md)\>

Defined in: [types/widget-props.ts:373](https://github.com/Hack23/cia-compliance-manager/blob/1de07b21c58ee7b60c2d9f35da724493bd69cdb4/src/types/widget-props.ts#L373)

Make all CIA levels optional

Useful for partial updates or default values.

## Example

```typescript
const partialLevels: PartialCIALevels = {
  availabilityLevel: 'High'
  // other levels are optional
};
```
