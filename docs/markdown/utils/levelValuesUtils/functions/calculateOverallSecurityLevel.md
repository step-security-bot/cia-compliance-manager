[**CIA Compliance Manager — Markdown Documentation v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/levelValuesUtils](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/levelValuesUtils.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/utils/levelValuesUtils.ts#L69)

Calculate overall security level from individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

### strategy?

`"min"` \| `"max"` \| `"avg"` \| `"weighted"`

Calculation strategy ('min', 'max', 'avg', 'weighted')

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Calculated overall security level
