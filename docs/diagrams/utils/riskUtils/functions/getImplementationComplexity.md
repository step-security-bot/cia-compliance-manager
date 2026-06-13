[**CIA Compliance Manager — UML Diagrams v1.1.88**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getImplementationComplexity

# Function: getImplementationComplexity()

> **getImplementationComplexity**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:417](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/utils/riskUtils.ts#L417)

Determines the implementation complexity based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The confidentiality security level

## Returns

`string`

The implementation complexity as a string
