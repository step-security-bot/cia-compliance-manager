[**CIA Compliance Manager — Markdown Documentation v1.1.38**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / CIALevelsOnly

# Type Alias: CIALevelsOnly

> **CIALevelsOnly** = `Pick`\<[`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md), `"availabilityLevel"` \| `"integrityLevel"` \| `"confidentialityLevel"`\>

Defined in: [types/widget-props.ts:356](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/types/widget-props.ts#L356)

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
