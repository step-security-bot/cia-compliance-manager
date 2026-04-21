[**CIA Compliance Manager — UML Diagrams v1.1.55**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / CIALevelsOnly

# Type Alias: CIALevelsOnly

> **CIALevelsOnly** = `Pick`\<[`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md), `"availabilityLevel"` \| `"integrityLevel"` \| `"confidentialityLevel"`\>

Defined in: [types/widget-props.ts:356](https://github.com/Hack23/cia-compliance-manager/blob/180ab7279d949938b21fc9271873d60dde559b30/src/types/widget-props.ts#L356)

Extract only the CIA level props from AllCIAComponentsProps

Useful when you need just the security levels without other widget props.

## Example

```typescript
const levels: CIALevelsOnly = {
  availabilityLevel: 'High',
  integrityLevel: 'Very High',
  confidentialityLevel: 'Moderate'
};
```
