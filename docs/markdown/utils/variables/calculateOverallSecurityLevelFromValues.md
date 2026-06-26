[**CIA Compliance Manager — Markdown Documentation v1.1.97**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevelFromValues

# Variable: calculateOverallSecurityLevelFromValues

> **calculateOverallSecurityLevelFromValues**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/utils/index.ts#L94)

Calculate overall security level from individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

### strategy?

`"min"` \| `"max"` \| `"avg"` \| `"weighted"`

Calculation strategy ('min', 'max', 'avg', 'weighted')

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Calculated overall security level
