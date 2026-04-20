[**CIA Compliance Manager — UML Diagrams v1.1.54**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [coreConstants](../README.md) / CIA\_LABELS

# Variable: CIA\_LABELS

> `const` **CIA\_LABELS**: `object`

Defined in: [constants/coreConstants.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/ec53446d20ff3941e43c6f67d15ff98cb084ddbd/src/constants/coreConstants.ts#L104)

CIA component label constants for consistent terminology.

Standard display labels for CIA triad components. Use these labels
throughout the UI to ensure consistent terminology and improve
user recognition.

## Type Declaration

### AVAILABILITY

> **AVAILABILITY**: `string` = `"Availability"`

### INTEGRITY

> **INTEGRITY**: `string` = `"Integrity"`

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `string` = `"Confidentiality"`

## Example

```typescript
// In select dropdown
const options = [
  { value: 'availability', label: CIA_LABELS.AVAILABILITY },
  { value: 'integrity', label: CIA_LABELS.INTEGRITY },
  { value: 'confidentiality', label: CIA_LABELS.CONFIDENTIALITY }
];
```
