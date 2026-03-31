[**CIA Compliance Manager — UML Diagrams v1.1.42**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevelFromValues

# Variable: calculateOverallSecurityLevelFromValues

> **calculateOverallSecurityLevelFromValues**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/ce3ecc4a3b34e88099c2e6d497b15097021e223f/src/utils/index.ts#L107)

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
