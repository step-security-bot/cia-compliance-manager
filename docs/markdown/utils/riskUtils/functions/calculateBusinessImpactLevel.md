[**CIA Compliance Manager — Markdown Documentation v1.1.97**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/utils/riskUtils.ts#L382)

Calculates the overall business impact level based on security levels

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

The calculated impact level as a string
