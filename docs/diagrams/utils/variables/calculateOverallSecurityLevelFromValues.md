[**CIA Compliance Manager — UML Diagrams v1.1.33**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevelFromValues

# Variable: calculateOverallSecurityLevelFromValues

> **calculateOverallSecurityLevelFromValues**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/94f5ebbb955e20e7ecd8df8e067b2edac2a859ae/src/utils/index.ts#L104)

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
